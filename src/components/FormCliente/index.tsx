import useClienteStore from "../../stores/useClienteStore";
import { useEffect } from "react";
import NewSvg from "../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../assets/FormSvgs/SearchSvg";
import EditSvg from "../../assets/FormSvgs/EditSvg";
import DeleteSvg from "../../assets/FormSvgs/DeleteSvg";
import { trataData } from "../../utils/trataData";

function FormCliente() {
  const { getClientes, clientes } = useClienteStore();

  useEffect(() => {
    getClientes();
  }, [getClientes]);

  return (
    <div className="w-full px-10 py-8">
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-gray-500 mt-2">
            Gerencie os clientes da sua empresa
          </p>
        </div>
        <div>
          <button className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]">
            <NewSvg />
            Novo Cliente
          </button>
        </div>
      </header>
      <div className="border">
        <div className="flex items-center gap-2 w-full p-2 border border-zinc-300 rounded-lg">
          <SearchSvg />
          <input
            className="w-full focus:outline-none focus:ring-0"
            type="text"
            placeholder=" Buscar clientes..."
          />
        </div>
      </div>
      <div className="w-full mt-6 text-sm text-left">
        <div className="border border-zinc-300 rounded-lg w-full">
          <table className="w-full">
            <thead className="border-b border-zinc-300 w-full">
              <tr className="flex justify-between text-zinc-500">
                <th className="w-full h-12 px-4 flex items-center">Nome</th>
                <th className="w-full h-12 px-4 flex items-center">Email</th>
                <th className="w-full h-12 px-4 flex items-center">Telefone</th>
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
                      {trataData(cliente.createAt)}
                    </td>
                    <td className="w-full h-12 px-4 flex items-center gap-3 font-light">
                      <button>
                        <EditSvg />
                      </button>
                      <button>
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
  );
}

export default FormCliente;
