import { Link, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useClienteStore from "../../../stores/useClienteStore";
import { ClienteListType } from "../../../types/clientesTypes";
import { clientesServices } from "../../../services/clientesServices";

function ClienteDetails() {
  const { id } = useParams<{id: string}>();

  
  const { clientes } = useClienteStore();
  const clienteData = clientes.find((c) => c.id === id);
  const { updateCliente } = clientesServices;
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<ClienteListType>({ values: clienteData });

  if(!id){
    return <p>Cliente inválido</p>
  }

  const onSubmit: SubmitHandler<ClienteListType> = async (data) => {
    console.log(data);
    console.log(dirtyFields);
    const alteracoes = Object.keys(dirtyFields).reduce((acc, key) => {
      const field = key as keyof ClienteListType;
      acc[field] = data[field] as any;
      return acc;
    }, {} as Partial<ClienteListType>);
    console.log({id, ...alteracoes})
    updateCliente(id,{...alteracoes})
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-screen flex flex-col overflow-hidden relative">
        <Link to={"/clientes"} className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 bg-[#262E3F] text-white rounded-sm text-sm font-semibold absolute right-4 mt-8">
          Voltar
        </Link>
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="p-6 font-bold text-xl">
            Altere os dados do cliente que deseja mudar:
          </h1>
          <form
            className="flex flex-col w-[480px] gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("nome")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("email")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("cpf")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("telefone")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("endereco")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />

            <button
              type="submit"
              className="cursor-pointer bg-blue-500 text-white p-2 rounded-lg"
            >
              Salvar apenas mudanças
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClienteDetails;
