import { useEffect, useMemo, useState } from "react";
import NewSvg from "../../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../../assets/FormSvgs/SearchSvg";
import DeleteSvg from "../../../assets/FormSvgs/DeleteSvg";
import EditSvg from "../../../assets/FormSvgs/EditSvg";
import ShowSvg from "../../../assets/FormSvgs/ShowSvg";
import { Link } from "react-router-dom";
import SclameSvg from "../../../assets/FormSvgs/SclameSvg";
import useOrdemStore from "../../../stores/useOrdemStore";
import useToastStore from "../../../stores/useToastStore";
import { trataData } from "../../../utils/trataData";
import {
  calcularTotalOrdem,
  formatarMoeda,
  getStatusBadgeClass,
  getStatusLabel,
  ordemCorrespondeBusca,
} from "../../../utils/ordemHelpers";
import { OrdemType } from "../../../types/ordensTypes";
import ConfirmModal from "../../ConfirmModal";
import Toast from "../../ToastComponent";
import { novaOrdemType } from "..";

function OrdemList({ novaOrdem, setNovaOrdem }: novaOrdemType) {
  const [isFocus, setIsFocus] = useState(false);
  const [busca, setBusca] = useState("");
  const [ordemParaExcluir, setOrdemParaExcluir] = useState<OrdemType | null>(
    null
  );

  const { ordens, getOrdens, deleteOrdem, isLoading } = useOrdemStore();
  const { isOpen } = useToastStore();

  useEffect(() => {
    getOrdens();
  }, [getOrdens]);

  const ordensFiltradas = useMemo(
    () => ordens.filter((ordem) => ordemCorrespondeBusca(ordem, busca)),
    [ordens, busca]
  );

  const handleConfirmarExclusao = async () => {
    if (!ordemParaExcluir?.id) return;
    const sucesso = await deleteOrdem(ordemParaExcluir.id);
    if (sucesso) {
      setOrdemParaExcluir(null);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col items-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
            <p className="text-gray-500 mt-2">
              Gerencie todas as ordens de serviço
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNovaOrdem(!novaOrdem)}
            className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
          >
            <NewSvg />
            Nova Ordem de Serviço
          </button>
        </header>

        <div className="w-full px-8">
          <div
            className={`w-full ${
              isFocus ? "border-zinc-700" : ""
            } rounded-lg border-transparent border-2 p-0.5`}
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
                placeholder="Buscar por cliente, status, descrição ou valor..."
              />
            </div>
          </div>
        </div>

        <div className="w-full px-8 mt-6 text-sm text-left">
          <div className="border border-zinc-300 rounded-lg w-full">
            <table className="w-full">
              <thead className="border-b border-zinc-300 w-full">
                <tr className="flex justify-between text-zinc-500">
                  <th className="w-full h-12 px-4 flex items-center">N°</th>
                  <th className="w-full h-12 px-4 flex items-center">Cliente</th>
                  <th className="w-full h-12 px-4 flex items-center">Data</th>
                  <th className="w-full h-12 px-4 flex items-center">Status</th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Valor Total
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">Ações</th>
                </tr>
              </thead>
              {ordensFiltradas.length > 0 ? (
                <tbody className="flex flex-col">
                  {ordensFiltradas.map((ordem) => (
                    <tr key={ordem.id} className="flex justify-between py-3">
                      <td className="w-full h-12 px-4 flex items-center font-medium">
                        #{ordem.id.slice(0, 6).toUpperCase()}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {ordem.cliente?.nome ?? "—"}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {trataData(ordem.createdAt)}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        <span
                          className={`flex gap-1 items-center text-white text-[12px] px-3 py-1 rounded-full ${getStatusBadgeClass(ordem.status)}`}
                        >
                          <SclameSvg />
                          {getStatusLabel(ordem.status)}
                        </span>
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {formatarMoeda(calcularTotalOrdem(ordem))}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center gap-3 font-light">
                        <button type="button" className="cursor-pointer" title="Ver ordem">
                          <Link to={`/ordens/${ordem.id}`}>
                            <ShowSvg />
                          </Link>
                        </button>
                        <button type="button" className="cursor-pointer" title="Editar ordem">
                          <Link to={`/ordens/${ordem.id}`}>
                            <EditSvg />
                          </Link>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrdemParaExcluir(ordem)}
                          className="cursor-pointer"
                          title="Excluir ordem"
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
                    <td colSpan={6}>
                      <div className="w-full flex items-center justify-center py-10">
                        <p className="text-zinc-500">
                          {ordens.length === 0
                            ? "Nenhuma ordem de serviço cadastrada."
                            : "Nenhuma ordem encontrada para esta busca."}
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
        isOpen={!!ordemParaExcluir}
        title="Excluir ordem de serviço"
        message={
          ordemParaExcluir
            ? `Tem certeza que deseja excluir a ordem #${ordemParaExcluir.id.slice(0, 6).toUpperCase()} do cliente "${ordemParaExcluir.cliente?.nome}"? Esta ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setOrdemParaExcluir(null)}
        isLoading={isLoading}
      />
      {isOpen && <Toast />}
    </div>
  );
}

export default OrdemList;
