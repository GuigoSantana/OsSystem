import { novoProdutoType } from "..";
import ArrowSvg from "../../../assets/FormSvgs/ArrowSvg";

function ProdutoForm({ novoProduto, setNovoProduto }: novoProdutoType) {
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
              <form action="submit" className="flex flex-col gap-2">
                <label htmlFor="nomedoproduto" className="font-semibold">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  id="nomedoproduto"
                  name="nomedocliente"
                  className="border border-zinc-200 rounded-md p-1"
                />
                <label htmlFor="emaildocliente" className="font-semibold">
                  Email do Cliente
                </label>
                <input
                  type="email"
                  id="emaildocliente"
                  name="emaildocliente"
                  className="border border-zinc-200 rounded-md p-1"
                />
                <label htmlFor="cpfdocliente" className="font-semibold">
                  CPF do Cliente
                </label>
                <input
                  type="text"
                  id="cpfdocliente"
                  name="cpfdocliente"
                  className="border border-zinc-200 rounded-md p-1"
                />
                <label htmlFor="telefonedocliente" className="font-semibold">
                  Telefone do Cliente
                </label>
                <input
                  type="phone"
                  id="telefonedocliente"
                  name="telefonedocliente"
                  className="border border-zinc-200 rounded-md p-1"
                />
                <label htmlFor="enderecodocliente" className="font-semibold">
                  Endereço do Cliente
                </label>
                <input
                  type="text"
                  id="enderecodocliente"
                  name="enderecodocliente"
                  className="border border-zinc-200 rounded-md p-1"
                />
                <button className="text-white font-semibold border border-zinc-200 rounded-md w-30 h-9 cursor-pointer bg-blue-500">
                  Criar Cliente
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoForm;
