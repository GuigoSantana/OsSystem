import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
function FormLogin() {
  const [signUp, setSignUp] = useState(false);
  const {getAuthentication, getCreationAndAuthentication} = useAuthStore()




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      nome?: HTMLInputElement;
      cpf?: HTMLInputElement;
      telefone?: HTMLInputElement;
      email: HTMLInputElement;
      senha: HTMLInputElement;
      confSenha?: HTMLInputElement;
    };
    const loginData = signUp
      ? {
          nome: formElements.nome!.value,
          cpf: formElements.cpf!.value,
          telefone: formElements.telefone!.value,
          email: formElements.email.value,
          senha: formElements.senha.value,
        }
      : {
          email: formElements.email.value,
          senha: formElements.senha.value,
        };

    try {
      const data = signUp
        ? await getCreationAndAuthentication(loginData)
        : await getAuthentication(loginData);
        return data
    } catch (err) {
      console.error("Erro ao efetuar login/signUp", err);
    }
    return loginData;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[440px] text-sm mt-6">
        <h1 className="text-3xl font-black mb-2">
          {signUp ? "Crie sua conta" : "Entre na sua conta"}
        </h1>
        <p className="mb-8">
          Ou{" "}
          <span
            onClick={() => setSignUp(!signUp)}
            className="font-semibold cursor-pointer"
          >
            {signUp ? "faça login" : "crie uma nova conta"}
          </span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-left">
          {signUp && (
            <>
              <label htmlFor="nome" className="font-semibold">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="seu mome completo"
                required
                className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
              />

              <label htmlFor="cpf" className="font-semibold mt-6">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                placeholder="seu CPF"
                required
                className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
              />
              <label htmlFor="telefone" className="font-semibold mt-6">
                Telefone
              </label>
              <input
                type="text"
                name="telefone"
                id="telefone"
                placeholder="seu telefone"
                required
                className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
              />
            </>
          )}
          <label htmlFor="email" className="font-semibold mt-6">
            E-mail
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="seu@email.com"
            required
            className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
          />
          <label htmlFor="senha" className="font-semibold mt-6">
            Senha
          </label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="******"
            required
            className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
          />
          {signUp && (
            <>
              <label htmlFor="confSenha" className="font-semibold mt-6">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confSenha"
                id="confSenha"
                placeholder="******"
                required
                className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
              />
            </>
          )}
          <button className="mt-4 bg-zinc-900 text-white font-semibold p-[10px] border-0 rounded-lg cursor-pointer hover:bg-zinc-800">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
