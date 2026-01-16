import { Link, useParams } from "react-router-dom";
import useProdutoStore from "../../../stores/useProdutoStore";
import { ProdutoListType } from "../../../types/produtosTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { produtosService } from "../../../services/produtosService";

function ProdutoDetails() {
  const { id } = useParams<{id: string}>();

  
  const { produtos } = useProdutoStore();
  const produtoData = produtos.find((p) => p.id === id);
  const { updateProduto } = produtosService;
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<ProdutoListType>({ values: produtoData });

  if(!id){
    return <p>Produto inválido</p>
  }

  const onSubmit: SubmitHandler<ProdutoListType> = async (data) => {
    console.log(data);
    console.log(dirtyFields);
    const alteracoes = Object.keys(dirtyFields).reduce((acc, key) => {
      const field = key as keyof ProdutoListType;
      acc[field] = data[field] as any;
      return acc;
    }, {} as Partial<ProdutoListType>);
    console.log({id, ...alteracoes})
    updateProduto(id,{...alteracoes})
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-screen flex flex-col overflow-hidden relative">
        <Link to={"/produtos"} className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 bg-[#262E3F] text-white rounded-sm text-sm font-semibold absolute right-4 mt-8">
          Voltar
        </Link>
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="p-6 font-bold text-xl">
            Altere os dados do produto que deseja mudar:
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
              {...register("descricao")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("precoVenda")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("precoCusto")}
              className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"
            />
            <input
              {...register("estoque")}
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

export default ProdutoDetails;
