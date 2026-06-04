import { SubmitHandler, useForm } from "react-hook-form";
import ArrowSvg from "../../../assets/FormSvgs/ArrowSvg";
import useServicoStore from "../../../stores/useServicoStore";
import useToastStore from "../../../stores/useToastStore";
import { ServicoFormType } from "../../../types/servicosTypes";
import Toast from "../../ToastComponent";
import { novoServicoType } from "..";

function ServicoForm({ novoServico, setNovoServico }: novoServicoType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicoFormType>();

  const { isLoading, createServico } = useServicoStore();
  const { isOpen } = useToastStore();

  const onSubmit: SubmitHandler<ServicoFormType> = async (data) => {
    const sucesso = await createServico({
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
    });
    if (sucesso) {
      setTimeout(() => setNovoServico(false), 2000);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Novo Serviço</h1>
            <p className="text-gray-500 mt-2">
              Adicione as informações para cadastrar um novo serviço
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setNovoServico(!novoServico)}
              className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
            >
              <ArrowSvg />
              Voltar
            </button>
          </div>
        </header>
        <div className="flex flex-col flex-wrap justify-between w-full gap-4 px-8 py-8 text-sm">
          <div className="flex justify-center w-full border-zinc-200 border rounded-md p-2">
            <div className="w-[480px] p-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <label htmlFor="nome" className="font-semibold mt-2">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  id="nome"
                  disabled={isLoading}
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.nome?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("nome", {
                    required: "Nome do serviço é obrigatório.",
                    minLength: {
                      value: 4,
                      message: "O nome deve conter no mínimo 4 caracteres.",
                    },
                  })}
                />
                {errors?.nome && (
                  <p className="text-red-500">{errors.nome?.message}</p>
                )}
                <label htmlFor="descricao" className="font-semibold mt-2">
                  Descrição do serviço
                </label>
                <input
                  type="text"
                  id="descricao"
                  disabled={isLoading}
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.descricao?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("descricao", {
                    required: "Descrição do serviço é obrigatória.",
                    minLength: {
                      value: 4,
                      message:
                        "A descrição deve conter no mínimo 4 caracteres.",
                    },
                  })}
                />
                {errors?.descricao && (
                  <p className="text-red-500">{errors.descricao?.message}</p>
                )}
                <label htmlFor="preco" className="font-semibold mt-2">
                  Preço do serviço
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="preco"
                  disabled={isLoading}
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.preco?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("preco", {
                    valueAsNumber: true,
                    required: "Preço do serviço é obrigatório.",
                    min: {
                      value: 0.1,
                      message: "O preço deve ser maior que zero.",
                    },
                  })}
                />
                {errors?.preco && (
                  <p className="text-red-500">{errors.preco?.message}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white font-semibold mt-2 border p-[8px] border-zinc-200 rounded-lg w-40 h-9 cursor-pointer bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cadastrar Serviço
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <Toast />}
    </div>
  );
}

export default ServicoForm;
