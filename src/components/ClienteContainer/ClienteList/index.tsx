import EditSvg from "../../../assets/FormSvgs/EditSvg";
import DeleteSvg from "../../../assets/FormSvgs/DeleteSvg";
import { trataData } from "../../../utils/trataData";
import NewSvg from "../../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../../assets/FormSvgs/SearchSvg";
import { useEffect, useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import useClienteStore from "../../../stores/useClienteStore";
import { propsTypes } from "..";
import { Link } from "react-router-dom";

function ClienteList({ setNovoCliente, novoCliente }: propsTypes) {
  const [isFocus, setIsFocus] = useState(true);

  const { usuarioId } = useAuthStore();
  const { getClientes, clientes, deleteCliente } = useClienteStore();

  useEffect(() => {
    getClientes(usuarioId);
  }, [getClientes, usuarioId]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-gray-500 mt-2">
              Gerencie os clientes da sua empresa
            </p>
          </div>
          <div>
            <button
              onClick={() => setNovoCliente(!novoCliente)}
              className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
            >
              <NewSvg />
              Novo Cliente
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
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder=" Buscar clientes..."
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
                  <th className="w-full h-12 px-4 flex items-center">Email</th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Telefone
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Data de Cadastro
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">Ações</th>
                </tr>
              </thead>
              {clientes ? (
                <tbody className="flex flex-col">
                  {clientes.map((cliente, index) => (
                    <tr key={index} className="flex justify-between py-3">
                      <td className="w-full h-12 px-4 flex items-center">
                        {cliente.nome}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {cliente.email}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {cliente.telefone}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {trataData(cliente.createdAt)}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center gap-3 font-light">
                        <button className="cursor-pointer">
                          <Link to={`/clientes/${cliente.id}`}>
                            <EditSvg />
                          </Link>
                        </button>
                        <button
                          onClick={() => deleteCliente(cliente.id)}
                          className="cursor-pointer"
                        >
                          <DeleteSvg />
                        </button>
                      </td>
                    </tr>
                  ))}
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
    </div>
  );
}

export default ClienteList;
