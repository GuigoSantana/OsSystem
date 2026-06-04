import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useClienteStore from "../../../stores/useClienteStore";
import useToastStore from "../../../stores/useToastStore";
import { ClienteListType } from "../../../types/clientesTypes";
import Toast from "../../ToastComponent";
import {
  validarCPF,
  validarEmail,
  validarTelefone,
} from "../../../utils/validacoes";

function ClienteDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { clientes, updateCliente, isLoading } = useClienteStore();
  const { isOpen } = useToastStore();
  const clienteData = clientes.find((c) => c.id === id);
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<ClienteListType>({ values: clienteData });

  if (!id) {
    return <p>Cliente inválido</p>;
  }

  const onSubmit: SubmitHandler<ClienteListType> = async (data) => {
    const alteracoes = Object.keys(dirtyFields).reduce((acc, key) => {
      const field = key as keyof ClienteListType;
      acc[field] = data[field] as ClienteListType[keyof ClienteListType];
      return acc;
    }, {} as Partial<ClienteListType>);

    if (Object.keys(alteracoes).length === 0) {
      return;
    }

    const sucesso = await updateCliente(id, alteracoes);
    if (sucesso) {
      setTimeout(() => navigate("/clientes"), 2000);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-[80%] h-screen flex flex-col overflow-hidden relative">
        <Link
          to={"/clientes"}
          className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 bg-[#262E3F] text-white rounded-sm text-sm font-semibold absolute right-4 mt-8"
        >
          Voltar
        </Link>
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="p-6 font-bold text-xl">
            Altere os dados do cliente que deseja mudar:
          </h1>
          <form
            className="flex flex-col w-[480px] gap-2 text-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="nome" className="font-semibold mt-2">
              Nome do Cliente
            </label>
            <input
              type="text"
              id="nome"
              disabled={isLoading}
              className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                errors.nome?.message ? "border-red-500" : ""
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              {...register("nome", {
                required: "Nome do cliente é obrigatório.",
                minLength: {
                  value: 3,
                  message: "O nome do cliente deve ter pelomenos 3 letras.",
                },
              })}
            />
            {errors?.nome && (
              <p className="text-red-500">{errors.nome?.message}</p>
            )}
            <label htmlFor="email" className="font-semibold mt-2">
              Email do Cliente
            </label>
            <input
              type="email"
              id="email"
              disabled={isLoading}
              className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                errors.email?.message ? "border-red-500" : ""
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              {...register("email", {
                required: "O email do cliente é obrigatório.",
                pattern: validarEmail,
              })}
            />
            {errors?.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <label htmlFor="cpf" className="font-semibold mt-2">
              CPF do Cliente
            </label>
            <input
              type="text"
              id="cpf"
              disabled={isLoading}
              className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                errors.cpf?.message ? "border-red-500" : ""
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              {...register("cpf", {
                required: "CPF do cliente é obrigatório.",
                validate: (value) =>
                  validarCPF(value) || "O CPF do cliente é inválido.",
              })}
            />
            {errors?.cpf && (
              <p className="text-red-500">{errors.cpf.message}</p>
            )}
            <label htmlFor="telefone" className="font-semibold mt-2">
              Telefone do Cliente
            </label>
            <input
              type="phone"
              id="telefone"
              disabled={isLoading}
              className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                errors.telefone?.message ? "border-red-500" : ""
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              {...register("telefone", {
                required: "O telefone do cliente é obrigatório.",
                minLength: {
                  value: 8,
                  message: "telefone deve conter 8 digitos.",
                },
                pattern: {
                  value: validarTelefone,
                  message: "Telefone inválido",
                },
              })}
            />
            {errors?.telefone && (
              <p className="text-red-500">{errors.telefone.message}</p>
            )}
            <label htmlFor="endereco" className="font-semibold mt-2">
              Endereço do Cliente
            </label>
            <input
              type="text"
              id="endereco"
              disabled={isLoading}
              className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                errors.endereco?.message ? "border-red-500" : ""
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              {...register("endereco", {
                required: "O endereço do cliente é obrigatório.",
                minLength: {
                  value: 8,
                  message: "O endereço deve conter 8 digitos.",
                },
              })}
            />
            {errors?.endereco && (
              <p className="text-red-500">{errors.endereco.message}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="text-white font-semibold mt-2 border p-[8px] border-zinc-200 rounded-lg w-30 h-9 cursor-pointer bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Salvar apenas mudanças
            </button>
          </form>
        </div>
      </div>
      {isOpen && <Toast />}
    </div>
  );
}

export default ClienteDetails;
