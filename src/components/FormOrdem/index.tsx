import { useEffect, useState } from "react";
import NewSvg from "../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../assets/FormSvgs/SearchSvg";
import NovaOrdem from "./NovaOrdem";
import SclameSvg from "../../assets/FormSvgs/SclameSvg";
import ShowSvg from "../../assets/FormSvgs/ShowSvg";
import EditSvg from "../../assets/FormSvgs/EditSvg";
import DeleteSvg from "../../assets/FormSvgs/DeleteSvg";
import useOrdemStore from "../../stores/useOrdemStore";
import axios from "axios";
import { trataData } from "../../utils/trataData";

function FormOrdem() {
  const [isCreate, setIsCreate] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const { ordens, getOrdens } = useOrdemStore();

  useEffect(() => {
    const reqOrdens = async () => {
      const ordensData = await axios.get("http://localhost:3333/ordem");
      getOrdens(ordensData.data);
    };
    reqOrdens();
  }, [getOrdens]);

  

  return (
    <div className="w-full flex justify-center">
      {isCreate ? (
        <NovaOrdem setIsCreate={setIsCreate} />
      ) : (
        <div className="w-full xl:w-[80%] flex flex-col items-center">
          <div className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
            <div>
              <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
              <p className="text-gray-500">
                Gerencie todas as ordens de serviços
              </p>
            </div>
            <div>
              <button
                onClick={() => setIsCreate(!isCreate)}
                className="py-2 px-3 rounded-md bg-[#262E3F] flex items-center gap-2 text-white font-semibold text-sm w-full cursor-pointer"
              >
                <NewSvg />
                Nova Ordem de Serviço
              </button>
            </div>
          </div>
          <div className="w-full px-8">
            <div
              className={`w-full ${
                isFocus ? "border-zinc-700 " : ""
              }  rounded-lg border-transparent border-2 p-0.5`}
            >
              <div
                className="w-full flex items-center p-1.5 gap-2 border border-zinc-300 rounded-md"
              >
                <SearchSvg />
                <input
                  className="w-full focus:outline-none focus:ring-0"
                  type="text"
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  placeholder="Buscar ordens de serviço..."
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
                    <th className="w-full h-12 px-4 flex items-center">
                      Cliente
                    </th>
                    <th className="w-full h-12 px-4 flex items-center">Data</th>
                    <th className="w-full h-12 px-4 flex items-center">
                      Status
                    </th>
                    <th className="w-full h-12 px-4 flex items-center">
                      Valor Total
                    </th>
                    <th className="w-full h-12 px-4 flex items-center">
                      Ações
                    </th>
                  </tr>
                </thead>
                {ordens ? (
                  <tbody className="flex flex-col">
                    {ordens.map((ordem) => {
                      return (
                        <>
                          <tr className="flex justify-between py-3">
                            <th className="w-full h-12 px-4 flex items-center">
                              #{ordem.clienteId.slice(0, 6)}
                            </th>
                            <th className="w-full h-12 px-4 flex items-center font-light">
                              {ordem.cliente.nome}
                            </th>
                            <th className="w-full h-12 px-4 flex items-center font-light">
                              {trataData(ordem.createAt)}
                            </th>
                            <th className="w-full h-12 px-4 flex items-center font-light">
                              <span className="flex gap-1 p-0.5 items-center bg-blue-500 text-white text-[12px] px-3 rounded-full">
                                <SclameSvg />
                                Aberta
                              </span>
                            </th>
                            <th className="w-full h-12 px-4 flex items-center font-light">
                              R$ 123,00
                            </th>
                            <th className="w-full h-12 px-4 flex items-center gap-3 font-light">
                              <button>
                                <ShowSvg />
                              </button>
                              <button>
                                <EditSvg />
                              </button>
                              <button>
                                <DeleteSvg />
                              </button>
                            </th>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                ) : (
                  <div className="w-full flex items-center justify-center py-10">
                    <p>Nenhuma ordem de serviço encontrada</p>
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormOrdem;
