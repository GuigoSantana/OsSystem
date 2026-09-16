import { Link, useNavigate, useParams } from "react-router-dom";
import useProdutoStore from "../../../stores/useProdutoStore";
import useToastStore from "../../../stores/useToastStore";
import { ProdutoListType } from "../../../types/produtosTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "../../ToastComponent";

function ProdutoDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { produtos, updateProduto, isLoading } = useProdutoStore();
  const { isOpen } = useToastStore();
  const produtoData = produtos.find((p) => p.id === id);
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<ProdutoListType>({ values: produtoData });

  if (!id) {
    return <p>Produto inválido</p>;
  }

  const onSubmit: SubmitHandler<ProdutoListType> = async (data) => {
    const alteracoes: Partial<
      Pick<
        ProdutoListType,
        "nome" | "descricao" | "precoVenda" | "precoCusto" | "estoque"
      >
    > = {};

    if (dirtyFields.nome) alteracoes.nome = data.nome;
    if (dirtyFields.descricao) alteracoes.descricao = data.descricao;
    if (dirtyFields.precoVenda) alteracoes.precoVenda = data.precoVenda;
    if (dirtyFields.precoCusto) alteracoes.precoCusto = data.precoCusto;
    if (dirtyFields.estoque) alteracoes.estoque = data.estoque;

    if (Object.keys(alteracoes).length === 0) {
      return;
    }

    const sucesso = await updateProduto(id, alteracoes);
    if (sucesso) {
      setTimeout(() => navigate("/produtos"), 2000);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-[80%] h-screen flex flex-col overflow-hidden relative">
        <Link
          to={"/produtos"}
          className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 bg-[#262E3F] text-white rounded-sm text-sm font-semibold absolute right-4 mt-8"
        >
          Voltar
        </Link>
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="p-6 font-bold text-xl">
            Altere os dados do produto que deseja mudar:
          </h1>
          <form
            className="flex flex-col w-[480px] gap-2 text-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="nome" className="font-semibold mt-2">
              Nome do Produto
            </label>
            <input
              type="text"
              id="nome"
              disabled={isLoading}
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
            <label htmlFor="descricao" className="font-semibold mt-2">
              Descrição do produto
            </label>
            <input
              type="text"
              id="descricao"
              disabled={isLoading}
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
            <label htmlFor="precoVenda" className="font-semibold mt-2">
              Preço de venda
            </label>
            <input
              type="number"
              step="0.01"
              id="precoVenda"
              disabled={isLoading}
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
            <label htmlFor="precoCusto" className="font-semibold mt-2">
              Preço de custo
            </label>
            <input
              type="number"
              step="0.01"
              id="precoCusto"
              disabled={isLoading}
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
            <label htmlFor="estoque" className="font-semibold mt-2">
              Quantidade em estoque
            </label>
            <input
              type="number"
              step="1"
              id="estoque"
              disabled={isLoading}
              className={`p-[8px] rounded-lg border-1 border-gray-200 bg-white ${
                errors.estoque?.message ? "border-red-500" : ""
              } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              {...register("estoque", {
                valueAsNumber: true,
                required: "Quantidade em estoque é obrigatória.",
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

export default ProdutoDetails;
