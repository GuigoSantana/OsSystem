import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useOrdemStore from "../../../stores/useOrdemStore";
import useToastStore from "../../../stores/useToastStore";
import { ordensService } from "../../../services/ordensService";
import {
  OrdemEditFormType,
  OrdemType,
  StatusOrdem,
} from "../../../types/ordensTypes";
import Toast from "../../ToastComponent";
import { trataData } from "../../../utils/trataData";
import {
  STATUS_ORDEM_OPCOES,
  calcularTotalOrdem,
  formatarMoeda,
  getStatusBadgeClass,
  getStatusLabel,
} from "../../../utils/ordemHelpers";
import SclameSvg from "../../../assets/FormSvgs/SclameSvg";

function OrdemDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { ordens, updateOrdem, isLoading } = useOrdemStore();
  const { isOpen } = useToastStore();
  const [ordem, setOrdem] = useState<OrdemType | null>(null);
  const [carregando, setCarregando] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<OrdemEditFormType>();

  useEffect(() => {
    if (!id) return;

    const fromStore = ordens.find((o) => o.id === id);
    if (fromStore) {
      setOrdem(fromStore);
      reset({
        status: fromStore.status,
        descricao: fromStore.descricao ?? "",
      });
      setCarregando(false);
      return;
    }

    setCarregando(true);
    ordensService
      .getOrdemById(id)
      .then((res) => {
        setOrdem(res.data);
        reset({
          status: res.data.status,
          descricao: res.data.descricao ?? "",
        });
        useOrdemStore.setState((state) => ({
          ordens: state.ordens.some((o) => o.id === id)
            ? state.ordens.map((o) => (o.id === id ? res.data : o))
            : [...state.ordens, res.data],
        }));
      })
      .catch(() => setOrdem(null))
      .finally(() => setCarregando(false));
  }, [id, ordens, reset]);

  if (!id) {
    return <p className="p-8">Ordem inválida</p>;
  }

  if (carregando) {
    return (
      <p className="p-8 text-zinc-500">Carregando ordem de serviço...</p>
    );
  }

  if (!ordem) {
    return (
      <p className="p-8 text-zinc-500">Ordem de serviço não encontrada.</p>
    );
  }

  const onSubmit: SubmitHandler<OrdemEditFormType> = async (data) => {
    const alteracoes: { status?: StatusOrdem; descricao?: string } = {};

    if (dirtyFields.status) {
      alteracoes.status = data.status;
    }
    if (dirtyFields.descricao) {
      alteracoes.descricao = data.descricao.trim() || undefined;
    }

    if (Object.keys(alteracoes).length === 0) {
      return;
    }

    const sucesso = await updateOrdem(id, alteracoes);
    if (sucesso) {
      setTimeout(() => navigate("/ordens"), 2000);
    }
  };

  const inputClass =
    "p-[8px] rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-1 focus:ring-zinc-400";

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col px-8 py-8 relative">
        <Link
          to="/ordens"
          className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 bg-[#262E3F] text-white rounded-sm text-sm font-semibold absolute right-8 top-8"
        >
          Voltar
        </Link>

        <header className="mb-6 pr-28">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">
              Ordem #{ordem.id.slice(0, 6).toUpperCase()}
            </h1>
            <span
              className={`flex gap-1 items-center text-white text-[12px] px-3 py-1 rounded-full ${getStatusBadgeClass(ordem.status)}`}
            >
              <SclameSvg />
              {getStatusLabel(ordem.status)}
            </span>
          </div>
          <p className="text-gray-500 mt-2">
            Cliente: <strong>{ordem.cliente?.nome}</strong> · Criada em{" "}
            {trataData(ordem.createdAt)}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 flex flex-col gap-6 border border-zinc-200 rounded-lg p-6 text-sm"
          >
            <h2 className="font-semibold text-base">Editar ordem</h2>
            <p className="text-zinc-500 text-xs -mt-4">
              Produtos e serviços não podem ser alterados após a criação.
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="font-semibold">
                Status
              </label>
              <select
                id="status"
                disabled={isLoading}
                className={`${inputClass} ${
                  errors.status ? "border-red-500" : ""
                }`}
                {...register("status", {
                  required: "Status é obrigatório.",
                })}
              >
                {STATUS_ORDEM_OPCOES.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="descricao" className="font-semibold">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={4}
                disabled={isLoading}
                placeholder="Descrição da ordem (opcional)"
                className={`${inputClass} resize-none`}
                {...register("descricao")}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="text-white font-semibold border p-[8px] border-zinc-200 rounded-lg h-10 cursor-pointer bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed w-fit"
            >
              Salvar alterações
            </button>
          </form>

          <aside className="flex flex-col gap-4">
            <div className="border border-zinc-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Resumo</h3>
              <p className="text-2xl font-bold text-[#262E3F]">
                {formatarMoeda(calcularTotalOrdem(ordem))}
              </p>
              <p className="text-zinc-500 text-xs mt-1">Valor total</p>
            </div>

            <div className="border border-zinc-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Produtos</h3>
              {ordem.produtos.length === 0 ? (
                <p className="text-zinc-500 text-xs">Nenhum produto</p>
              ) : (
                <ul className="flex flex-col gap-2 text-sm">
                  {ordem.produtos.map((item) => (
                    <li
                      key={item.produtoId}
                      className="flex justify-between gap-2 bg-zinc-50 rounded-md px-2 py-1.5"
                    >
                      <span>
                        {item.produto?.nome ?? "Produto"} × {item.quantidade}
                      </span>
                      <span className="font-medium shrink-0">
                        {formatarMoeda(
                          item.quantidade * item.precoUnitario
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border border-zinc-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Serviços</h3>
              {ordem.servicos.length === 0 ? (
                <p className="text-zinc-500 text-xs">Nenhum serviço</p>
              ) : (
                <ul className="flex flex-col gap-2 text-sm">
                  {ordem.servicos.map((item) => (
                    <li
                      key={item.servicoId}
                      className="flex justify-between gap-2 bg-zinc-50 rounded-md px-2 py-1.5"
                    >
                      <span>
                        {item.servico?.nome ?? "Serviço"} × {item.quantidade}
                      </span>
                      <span className="font-medium shrink-0">
                        {formatarMoeda(
                          item.quantidade * item.precoUnitario
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
      {isOpen && <Toast />}
    </div>
  );
}

export default OrdemDetails;
