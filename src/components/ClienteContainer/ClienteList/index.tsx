import EditSvg from "../../../assets/FormSvgs/EditSvg";
import DeleteSvg from "../../../assets/FormSvgs/DeleteSvg";
import { trataData } from "../../../utils/trataData";
import NewSvg from "../../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../../assets/FormSvgs/SearchSvg";
import { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import useClienteStore from "../../../stores/useClienteStore";
import useToastStore from "../../../stores/useToastStore";
import { propsTypes } from "..";
import { Link } from "react-router-dom";
import { ClienteListType } from "../../../types/clientesTypes";
import ConfirmModal from "../../ConfirmModal";
import Toast from "../../ToastComponent";

function clienteCorrespondeBusca(
  cliente: ClienteListType,
  termo: string
): boolean {
  const termoTexto = termo.trim().toLowerCase();
  if (!termoTexto) return true;

  const termoNumerico = termo.replace(/\D/g, "");
  const campos = [cliente.nome, cliente.email, cliente.telefone, cliente.cpf];

  if (
    campos.some((campo) =>
      (campo ?? "").toLowerCase().includes(termoTexto)
    )
  ) {
    return true;
  }

  if (!termoNumerico) return false;

  const cpfNumerico = (cliente.cpf ?? "").replace(/\D/g, "");
  const telefoneNumerico = (cliente.telefone ?? "").replace(/\D/g, "");

  return (
    cpfNumerico.includes(termoNumerico) ||
    telefoneNumerico.includes(termoNumerico)
  );
}

function ClienteList({ setNovoCliente, novoCliente }: propsTypes) {
  const [isFocus, setIsFocus] = useState(false);
  const [busca, setBusca] = useState("");
  const [clienteParaExcluir, setClienteParaExcluir] =
    useState<ClienteListType | null>(null);

  const { usuarioId } = useAuthStore();
  const { getClientes, clientes, deleteCliente, isLoading } = useClienteStore();
  const { isOpen } = useToastStore();

  const handleConfirmarExclusao = async () => {
    if (!clienteParaExcluir) return;
    const sucesso = await deleteCliente(clienteParaExcluir.id);
    if (sucesso) {
      setClienteParaExcluir(null);
    }
  };

  useEffect(() => {
    getClientes(usuarioId);
  }, [getClientes, usuarioId]);

  const clientesFiltrados = useMemo(
    () => clientes.filter((cliente) => clienteCorrespondeBusca(cliente, busca)),
    [clientes, busca]
  );

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
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder="Buscar por nome, email, telefone ou CPF..."
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
              {clientesFiltrados.length > 0 ? (
                <tbody className="flex flex-col">
                  {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id} className="flex justify-between py-3">
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
                          type="button"
                          onClick={() => setClienteParaExcluir(cliente)}
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
                    <td colSpan={5}>
                      <div className="w-full flex items-center justify-center py-10">
                        <p className="text-zinc-500">
                          {clientes.length === 0
                            ? "Nenhum cliente cadastrado."
                            : "Nenhum cliente encontrado para esta busca."}
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
        isOpen={!!clienteParaExcluir}
        title="Excluir cliente"
        message={
          clienteParaExcluir
            ? `Tem certeza que deseja excluir o cliente "${clienteParaExcluir.nome}"? Esta ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setClienteParaExcluir(null)}
        isLoading={isLoading}
      />
      {isOpen && <Toast />}
    </div>
  );
}

export default ClienteList;
