import { useEffect, useMemo, useState } from "react";
import NewSvg from "../../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../../assets/FormSvgs/SearchSvg";
import DeleteSvg from "../../../assets/FormSvgs/DeleteSvg";
import EditSvg from "../../../assets/FormSvgs/EditSvg";
import { Link } from "react-router-dom";
import { ServicoListType } from "../../../types/servicosTypes";
import useServicoStore from "../../../stores/useServicoStore";
import useToastStore from "../../../stores/useToastStore";
import ConfirmModal from "../../ConfirmModal";
import Toast from "../../ToastComponent";
import { novoServicoType } from "..";

function servicoCorrespondeBusca(
  servico: ServicoListType,
  termo: string
): boolean {
  const termoTexto = termo.trim().toLowerCase();
  if (!termoTexto) return true;

  const nome = (servico.nome ?? "").toLowerCase();
  const descricao = (servico.descricao ?? "").toLowerCase();
  if (
    nome.includes(termoTexto) ||
    descricao.includes(termoTexto)
  ) {
    return true;
  }

  const preco = String(servico.preco ?? "");
  if (preco.toLowerCase().includes(termoTexto)) return true;

  const termoNumerico = termo.replace(/[^\d.,]/g, "").replace(",", ".");
  if (!termoNumerico) return false;

  return preco.replace(",", ".").includes(termoNumerico);
}

function ServicoList({ novoServico, setNovoServico }: novoServicoType) {
  const [isFocus, setIsFocus] = useState(false);
  const [busca, setBusca] = useState("");
  const [servicoParaExcluir, setServicoParaExcluir] =
    useState<ServicoListType | null>(null);

  const { getServicos, servicos, deleteServico, isLoading } = useServicoStore();
  const { isOpen } = useToastStore();

  useEffect(() => {
    getServicos();
  }, [getServicos]);

  const servicosFiltrados = useMemo(
    () => servicos.filter((s) => servicoCorrespondeBusca(s, busca)),
    [servicos, busca]
  );

  const handleConfirmarExclusao = async () => {
    if (!servicoParaExcluir?.id) return;
    const sucesso = await deleteServico(servicoParaExcluir.id);
    if (sucesso) {
      setServicoParaExcluir(null);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Serviços</h1>
            <p className="text-gray-500 mt-2">
              Gerencie os serviços oferecidos pela sua empresa
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setNovoServico(!novoServico)}
              className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
            >
              <NewSvg />
              Novo Serviço
            </button>
          </div>
        </header>
        <div className="w-full px-8">
          <div
            className={`w-full ${
              isFocus ? "border-zinc-700 " : ""
            }  rounded-lg border-transparent border-2 p-0.5`}
          >
            <div className="w-full flex items-center p-1.5 gap-2 border border-zinc-300 rounded-md">
              <SearchSvg />
              <input
                className="w-full focus:outline-none focus:ring-0"
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder="Buscar por nome, descrição ou preço..."
              />
            </div>
          </div>
        </div>
        <div className="w-full px-8 mt-6 text-sm text-left">
          <div className="border border-zinc-300 rounded-lg w-full">
            <table className="w-full">
              <thead className="border-b border-zinc-300 w-full">
                <tr className="flex justify-between text-zinc-500">
                  <th className="w-full h-12 px-4 flex items-center">Nome</th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Descrição
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">Preço</th>
                  <th className="w-full h-12 px-4 flex items-center">Ações</th>
                </tr>
              </thead>
              {servicosFiltrados.length > 0 ? (
                <tbody className="flex flex-col">
                  {servicosFiltrados.map((servico) => (
                    <tr key={servico.id} className="flex justify-between py-3">
                      <td className="w-full h-12 px-4 flex items-center">
                        {servico.nome}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {servico.descricao}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {servico.preco}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center gap-3 font-light">
                        <button type="button" className="cursor-pointer">
                          <Link to={`/servicos/${servico.id}`}>
                            <EditSvg />
                          </Link>
                        </button>
                        <button
                          type="button"
                          onClick={() => setServicoParaExcluir(servico)}
                          className="cursor-pointer"
                        >
                          <DeleteSvg />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <div className="w-full flex items-center justify-center py-10">
                        <p className="text-zinc-500">
                          {servicos.length === 0
                            ? "Nenhum serviço cadastrado."
                            : "Nenhum serviço encontrado para esta busca."}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={!!servicoParaExcluir}
        title="Excluir serviço"
        message={
          servicoParaExcluir
            ? `Tem certeza que deseja excluir o serviço "${servicoParaExcluir.nome}"? Esta ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setServicoParaExcluir(null)}
        isLoading={isLoading}
      />
      {isOpen && <Toast />}
    </div>
  );
}

export default ServicoList;
