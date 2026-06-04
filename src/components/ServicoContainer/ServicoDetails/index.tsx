import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useServicoStore from "../../../stores/useServicoStore";
import useToastStore from "../../../stores/useToastStore";
import { ServicoListType } from "../../../types/servicosTypes";
import Toast from "../../ToastComponent";

function ServicoDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { servicos, updateServico, isLoading, getServicos } = useServicoStore();
  const { isOpen } = useToastStore();
  const servicoData = servicos.find((s) => s.id === id);

  useEffect(() => {
    if (!servicoData) {
      getServicos();
    }
  }, [servicoData, getServicos]);
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<ServicoListType>({ values: servicoData });

  if (!id) {
    return <p>Serviço inválido</p>;
  }

  const onSubmit: SubmitHandler<ServicoListType> = async (data) => {
    const alteracoes = Object.keys(dirtyFields).reduce((acc, key) => {
      const field = key as keyof ServicoListType;
      acc[field] = data[field] as ServicoListType[keyof ServicoListType];
      return acc;
    }, {} as Partial<ServicoListType>);

    if (Object.keys(alteracoes).length === 0) {
      return;
    }

    const sucesso = await updateServico(id, alteracoes);
    if (sucesso) {
      setTimeout(() => navigate("/servicos"), 2000);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-[80%] h-screen flex flex-col overflow-hidden relative">
        <Link
          to="/servicos"
          className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 bg-[#262E3F] text-white rounded-sm text-sm font-semibold absolute right-4 mt-8"
        >
          Voltar
        </Link>
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="p-6 font-bold text-xl">
            Altere os dados do serviço que deseja mudar:
          </h1>
          <form
            className="flex flex-col w-[480px] gap-2 text-sm"
            onSubmit={handleSubmit(onSubmit)}
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

export default ServicoDetails;
