import { useEffect, useState } from "react";
import ArrowSvg from "../../../assets/FormSvgs/ArrowSvg";
import useOrdemStore from "../../../stores/useOrdemStore";
import useClienteStore from "../../../stores/useClienteStore";
import useProdutoStore from "../../../stores/useProdutoStore";
import useServicoStore from "../../../stores/useServicoStore";
import useToastStore from "../../../stores/useToastStore";
import Toast from "../../ToastComponent";
import {
  STATUS_ORDEM_OPCOES,
  formatarMoeda,
} from "../../../utils/ordemHelpers";
import { StatusOrdem } from "../../../types/ordensTypes";
import { novaOrdemType } from "..";

function OrdemForm({ novaOrdem, setNovaOrdem }: novaOrdemType) {
  const {
    draft,
    isLoading,
    createOrdem,
    setDraftDescricao,
    setDraftStatus,
    setDraftClienteId,
    adicionarProdutoDraft,
    removerProdutoDraft,
    adicionarServicoDraft,
    removerServicoDraft,
    resetDraft,
  } = useOrdemStore();
  const { clientes, getClientes } = useClienteStore();
  const { produtos, getProdutos } = useProdutoStore();
  const { servicos, getServicos } = useServicoStore();
  const { isOpen } = useToastStore();

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [qtdProduto, setQtdProduto] = useState(1);
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [qtdServico, setQtdServico] = useState(1);
  const [erroForm, setErroForm] = useState("");

  useEffect(() => {
    getClientes();
    getProdutos();
    getServicos();
  }, [getClientes, getProdutos, getServicos]);

  const totalDraft =
    draft.produtos.reduce(
      (acc, p) => acc + p.quantidade * p.precoUnitario,
      0
    ) +
    draft.servicos.reduce((acc, s) => acc + s.quantidade * s.precoUnitario, 0);

  const handleAdicionarProduto = () => {
    if (!produtoSelecionado) return;
    const produto = produtos.find((p) => p.id === produtoSelecionado);
    if (!produto?.id) return;
    adicionarProdutoDraft({
      produtoId: produto.id,
      quantidade: qtdProduto,
      nome: produto.nome ?? "",
      precoUnitario: Number(produto.precoVenda ?? 0),
    });
    setProdutoSelecionado("");
    setQtdProduto(1);
  };

  const handleAdicionarServico = () => {
    if (!servicoSelecionado) return;
    const servico = servicos.find((s) => s.id === servicoSelecionado);
    if (!servico?.id) return;
    adicionarServicoDraft({
      servicoId: servico.id,
      quantidade: qtdServico,
      nome: servico.nome ?? "",
      precoUnitario: Number(servico.preco ?? 0),
    });
    setServicoSelecionado("");
    setQtdServico(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroForm("");

    if (!draft.clienteId) {
      setErroForm("Selecione um cliente.");
      return;
    }
    if (draft.produtos.length === 0 && draft.servicos.length === 0) {
      setErroForm("Adicione pelo menos um produto ou serviço.");
      return;
    }

    const sucesso = await createOrdem({
      descricao: draft.descricao.trim() || undefined,
      status: draft.status,
      clienteId: draft.clienteId,
      produtos: draft.produtos.map((p) => ({
        produtoId: p.produtoId,
        quantidade: p.quantidade,
      })),
      servicos: draft.servicos.map((s) => ({
        servicoId: s.servicoId,
        quantidade: s.quantidade,
      })),
    });

    if (sucesso) {
      setTimeout(() => {
        resetDraft();
        setNovaOrdem(false);
      }, 2000);
    }
  };

  const inputClass =
    "p-[8px] rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-1 focus:ring-zinc-400";

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Nova Ordem de Serviço</h1>
            <p className="text-gray-500 mt-2">
              Preencha os dados para criar uma nova ordem de serviço
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetDraft();
              setNovaOrdem(!novaOrdem);
            }}
            className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
          >
            <ArrowSvg />
            Voltar
          </button>
        </header>

        <div className="flex flex-col w-full gap-4 px-8 pb-8 text-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 border border-zinc-200 rounded-lg p-6 max-w-3xl mx-auto w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="cliente" className="font-semibold">
                  Cliente *
                </label>
                <select
                  id="cliente"
                  value={draft.clienteId}
                  onChange={(e) => setDraftClienteId(e.target.value)}
                  disabled={isLoading}
                  className={inputClass}
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="status" className="font-semibold">
                  Status *
                </label>
                <select
                  id="status"
                  value={draft.status}
                  onChange={(e) =>
                    setDraftStatus(e.target.value as StatusOrdem)
                  }
                  disabled={isLoading}
                  className={inputClass}
                >
                  {STATUS_ORDEM_OPCOES.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="descricao" className="font-semibold">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={4}
                value={draft.descricao}
                onChange={(e) => setDraftDescricao(e.target.value)}
                disabled={isLoading}
                placeholder="Descrição detalhada da ordem de serviço (opcional)"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="border border-zinc-100 rounded-lg p-4 flex flex-col gap-3">
              <h2 className="font-semibold text-base">Produtos</h2>
              <div className="flex flex-wrap gap-2 items-end">
                <div className="flex-1 min-w-[180px]">
                  <select
                    value={produtoSelecionado}
                    onChange={(e) => setProdutoSelecionado(e.target.value)}
                    className={inputClass}
                    disabled={isLoading}
                  >
                    <option value="">Selecione um produto</option>
                    {produtos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome} — {formatarMoeda(Number(p.precoVenda ?? 0))}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={qtdProduto}
                    onChange={(e) => setQtdProduto(Number(e.target.value))}
                    className={inputClass}
                    disabled={isLoading}
                    aria-label="Quantidade do produto"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAdicionarProduto}
                  disabled={isLoading || !produtoSelecionado}
                  className="px-4 py-2 rounded-lg border border-zinc-300 font-semibold hover:bg-zinc-50 disabled:opacity-50"
                >
                  Adicionar
                </button>
              </div>
              {draft.produtos.length > 0 && (
                <ul className="flex flex-col gap-2 mt-1">
                  {draft.produtos.map((item) => (
                    <li
                      key={item.produtoId}
                      className="flex justify-between items-center bg-zinc-50 rounded-md px-3 py-2"
                    >
                      <span>
                        {item.nome} × {item.quantidade} —{" "}
                        {formatarMoeda(item.quantidade * item.precoUnitario)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removerProdutoDraft(item.produtoId)}
                        className="text-red-500 text-xs font-semibold"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border border-zinc-100 rounded-lg p-4 flex flex-col gap-3">
              <h2 className="font-semibold text-base">Serviços</h2>
              <div className="flex flex-wrap gap-2 items-end">
                <div className="flex-1 min-w-[180px]">
                  <select
                    value={servicoSelecionado}
                    onChange={(e) => setServicoSelecionado(e.target.value)}
                    className={inputClass}
                    disabled={isLoading}
                  >
                    <option value="">Selecione um serviço</option>
                    {servicos.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nome} — {formatarMoeda(Number(s.preco ?? 0))}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={qtdServico}
                    onChange={(e) => setQtdServico(Number(e.target.value))}
                    className={inputClass}
                    disabled={isLoading}
                    aria-label="Quantidade do serviço"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAdicionarServico}
                  disabled={isLoading || !servicoSelecionado}
                  className="px-4 py-2 rounded-lg border border-zinc-300 font-semibold hover:bg-zinc-50 disabled:opacity-50"
                >
                  Adicionar
                </button>
              </div>
              {draft.servicos.length > 0 && (
                <ul className="flex flex-col gap-2 mt-1">
                  {draft.servicos.map((item) => (
                    <li
                      key={item.servicoId}
                      className="flex justify-between items-center bg-zinc-50 rounded-md px-3 py-2"
                    >
                      <span>
                        {item.nome} × {item.quantidade} —{" "}
                        {formatarMoeda(item.quantidade * item.precoUnitario)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removerServicoDraft(item.servicoId)}
                        className="text-red-500 text-xs font-semibold"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
              <p className="font-semibold text-base">
                Total estimado: {formatarMoeda(totalDraft)}
              </p>
            </div>

            {erroForm && <p className="text-red-500">{erroForm}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="text-white font-semibold border p-[8px] border-zinc-200 rounded-lg h-10 cursor-pointer bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Criar ordem de serviço
            </button>
          </form>
        </div>
      </div>
      {isOpen && <Toast />}
    </div>
  );
}

export default OrdemForm;
