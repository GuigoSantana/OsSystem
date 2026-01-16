import { propsTypes } from "..";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  validarCPF,
  validarEmail,
  validarTelefone,
} from "../../../utils/validacoes";
import useClienteStore from "../../../stores/useClienteStore";
import useToastStore from "../../../stores/useToastStore";
import Toast from "../../ToastComponent";
import { ClienteFormType } from "../../../types/clientesTypes";

function ClienteForm({ setNovoCliente, novoCliente }: propsTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClienteFormType>();

  const { createCliente, isLoading } = useClienteStore();
  const { isOpen } = useToastStore();

  const onSubmit: SubmitHandler<ClienteFormType> = async (data) => {
    const dataCliente = {
      nome: data?.nome,
      email: data?.email,
      telefone: data?.telefone,
      endereco: data?.endereco,
      cpf: data?.cpf,
    };
    createCliente(dataCliente);
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Novo cliente</h1>
            <p className="text-gray-500 mt-2">
              Informe os dados do cliente e complete o cadastro.
            </p>
          </div>
          <button
            onClick={() => setNovoCliente(!novoCliente)}
            className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
          >
            Voltar
          </button>
        </header>
        <div className="flex flex-col flex-wrap justify-between w-full gap-4 px-8 py-8 text-sm">
          <div className="flex justify-center w-full border-zinc-200 border rounded-lg p-2">
            <div className="w-[480px] p-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <label htmlFor="nome" className="font-semibold mt-2">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  id="nome"
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.nome?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("nome", {
                    required: "Nome do cliente é obrigatório.",
                    minLength: {
                      value: 3,
                      message:
                        "O nome do cliente deve ter pelomenos 3 letras.",
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
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.email?.message ? "border-red-500" : ""
                  }`}
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
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.email?.message ? "border-red-500" : ""
                  }`}
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
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.telefone?.message ? "border-red-500" : ""
                  }`}
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
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.endereco?.message ? "border-red-500" : ""
                  }`}
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
                  className="text-white font-semibold mt-2 border p-[8px] border-zinc-200 rounded-lg w-30 h-9 cursor-pointer bg-blue-500"
                  type="submit"
                  disabled={isLoading}
                >
                  Criar Cliente
                </button>
                {isOpen && <Toast />}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClienteForm;
