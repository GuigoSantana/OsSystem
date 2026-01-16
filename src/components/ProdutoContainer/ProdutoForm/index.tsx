import { SubmitHandler, useForm } from "react-hook-form";
import { novoProdutoType } from "..";
import ArrowSvg from "../../../assets/FormSvgs/ArrowSvg";
import useProdutoStore from "../../../stores/useProdutoStore";
import { ProdutoFormType } from "../../../types/produtosTypes";
import useToastStore from "../../../stores/useToastStore";
import Toast from "../../ToastComponent";

function ProdutoForm({ novoProduto, setNovoProduto }: novoProdutoType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutoFormType>();

  const { isLoading, createProduto } = useProdutoStore();
  const {isOpen} = useToastStore();

  const onSubmit: SubmitHandler<ProdutoFormType> = async (data) => {
    const dataProduto = {
      nome: data?.nome,
      descricao: data?.descricao,
      precoVenda: data?.precoVenda,
      precoCusto: data?.precoCusto,
      estoque: data?.estoque,
    };
    createProduto(dataProduto);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Novo Produto</h1>
            <p className="text-gray-500 mt-2">
              Adicione as informações para cadastrar um novo produto
            </p>
          </div>
          <div>
            <button
              onClick={() => setNovoProduto(!novoProduto)}
              className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
            >
              <ArrowSvg />
              Voltar
            </button>
          </div>
        </header>
        <div className="flex flex-col flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div className="flex justify-center w-full border-zinc-200 border rounded-md p-2">
            <div className="w-[480px] p-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <label htmlFor="nome" className="font-semibold">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  id="nome"
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.nome?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("nome", {
                    required: "Nome do produto é obrigatório.",
                    minLength: {
                      value: 4,
                      message: "O nome deve conter no mínimo 4 caracteres.",
                    },
                  })}
                />
                {errors?.nome && (
                  <p className="text-red-500">{errors.nome?.message}</p>
                )}
                <label htmlFor="descricao" className="font-semibold">
                  Descrição do produto
                </label>
                <input
                  type="text"
                  id="descricao"
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.descricao?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("descricao", {
                    required: "Descrição do produto é obrigatória.",
                    minLength: {
                      value: 4,
                      message: "A descrição deve conter no mínimo 2 palavras.",
                    },
                  })}
                />
                {errors?.descricao && (
                  <p className="text-red-500">{errors.descricao?.message}</p>
                )}
                <label htmlFor="precoVenda" className="font-semibold">
                  Preço de venda
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="precoVenda"
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.precoVenda?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("precoVenda", {
                    valueAsNumber: true,
                    required: "Preço de venda do produto é obrigatório.",
                    min: {
                      value: 0.1,
                      message: "O preço deve ser maior que zero.",
                    },
                  })}
                />
                {errors?.precoVenda && (
                  <p className="text-red-500">{errors.precoVenda?.message}</p>
                )}
                <label htmlFor="precoCusto" className="font-semibold">
                  Preço de custo
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="precoCusto"
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.precoCusto?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("precoCusto", {
                    valueAsNumber: true,
                    required: "Preço de custo do produto é obrigatório.",
                    min: {
                      value: 0.1,
                      message: "O preço deve ser maior que zero.",
                    },
                  })}
                />
                {errors?.precoCusto && (
                  <p className="text-red-500">{errors.precoCusto?.message}</p>
                )}
                <label htmlFor="estoque" className="font-semibold">
                  Quantidade em estoque
                </label>
                <input
                  type="number"
                  step="1"
                  id="estoque"
                  className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                    errors.estoque?.message ? "border-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  {...register("estoque", {
                    valueAsNumber: true,
                    required: "Preço de custo do produto é obrigatório.",
                    min: {
                      value: 1,
                      message: "O estoque não pode ser negativo.",
                    },
                    validate: (value) =>
                      Number.isInteger(value) ||
                      "O estoque deve ser um número inteiro.",
                  })}
                />
                {errors?.estoque && (
                  <p className="text-red-500">{errors.estoque?.message}</p>
                )}
                <button className="text-white font-semibold border border-zinc-200 rounded-md w-30 h-9 cursor-pointer bg-blue-500">
                  Cadastrar Produto
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

export default ProdutoForm;
