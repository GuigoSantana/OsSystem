import {  useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  validarCPF,
  validarEmail,
  validarTelefone,
} from "../../utils/validacoes";
import { CreateUserType } from "../../types/authTypes";

function FormLogin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserType>();

  const [signUp, setSignUp] = useState(false);
  const { userAuthentication, userCreation } = useAuthStore();

  const onSubmit: SubmitHandler<CreateUserType> = async (data) => {
    const loginData = signUp
      ? {
          nome: data!.nome,
          cpf: data!.cpf,
          telefone: data!.telefone,
          email: data!.email,
          senha: data!.senha,
          confSenha: data!.confSenha,
        }
      : {
          email: data!.email,
          senha: data!.senha,
        };

    try {
      const data = signUp
        ? await userCreation(loginData)
        : await userAuthentication(loginData);
      return data;
    } catch (err) {
      console.error("Erro ao efetuar login/signUp", err);
    }
    return loginData;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[440px] text-sm mt-6">
        <h1 className="text-3xl font-black mb-2 ">
          {signUp ? "Crie sua conta" : "Entre na sua conta"}
        </h1>
        <p className="mb-8">
          Ou{" "}
          <span
            onClick={() => setSignUp(!signUp)}
            className="font-semibold cursor-pointer underline text-blue-500"
          >
            {signUp ? "faça login" : "crie uma nova conta"}
          </span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 text-left"
        >
          <label htmlFor="email" className="font-semibold mt-2">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            placeholder="seu@email.com"
            className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
              errors.email?.message ? "border-red-500" : ""
            }`}
            {...register("email", {
              required: "Email é obrigatório.",
              pattern: { value: validarEmail, message: "Email inválido." },
            })}
          />
          {errors?.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {signUp && (
            <>
              <label htmlFor="nome" className="font-semibold">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                placeholder="seu mome completo"
                className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                  errors.nome?.message ? "border-red-500" : ""
                }`}
                {...register("nome", {
                  required: "Digite seu nome.",
                  minLength: {
                    value: 3,
                    message: "Nome deve conter mais de 3 caracteres.",
                  },
                })}
              />
              {errors?.nome && (
                <p className="text-red-500">{errors.nome.message}</p>
              )}

              <label htmlFor="cpf" className="font-semibold mt-2">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                placeholder="seu CPF"
                className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                  errors.cpf?.message ? "border-red-500" : ""
                }`}
                {...register("cpf", {
                  required: "CPF é obrigatório",
                  validate: (value) => validarCPF(value) || "CPF inválido.",
                })}
              />
              {errors?.cpf && (
                <p className="text-red-500">{errors.cpf.message}</p>
              )}

              <label htmlFor="telefone" className="font-semibold mt-2">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                placeholder="seu telefone"
                className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                  errors.telefone?.message ? "border-red-500" : ""
                }`}
                {...register("telefone", {
                  required: "Digite o seu telefone.",
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
            </>
          )}

          <label htmlFor="senha" className="font-semibold mt-2">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            placeholder="******"
            className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
              errors.senha?.message ? "border-red-500" : ""
            }`}
            {...register("senha", {
              required: "Senha é obrigatória.",
              minLength: {
                value: !signUp ? 4 : 6,
                message: "Senha deve conter mais de 6 caracteres.",
              },
            })}
          />
          {errors?.senha && (
            <p className="text-red-500">{errors.senha.message}</p>
          )}
          {signUp && (
            <>
              <label htmlFor="confSenha" className="font-semibold mt-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confSenha"
                placeholder="******"
                className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                  errors.confSenha?.message ? "border-red-500" : ""
                }`}
                {...register("confSenha", {
                  required: "Senha é obrigatória.",
                  minLength: {
                    value: 6,
                    message: "Senha deve conter mais de 6 caracteres.",
                  },
                  validate: (value) =>
                    value === watch("senha") ||
                    "As senhas precisam ser iguais.",
                })}
              />
              {errors.confSenha && (
                <p className="text-red-500">{errors.confSenha?.message}</p>
              )}
            </>
          )}
          <button
            className="mt-4 bg-zinc-900 text-white font-semibold p-[10px] border-0 rounded-lg cursor-pointer hover:bg-zinc-800"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
