import NewSvg from "../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../assets/FormSvgs/SearchSvg";
import EditSvg from "../../assets/FormSvgs/EditSvg";
import DeleteSvg from "../../assets/FormSvgs/DeleteSvg";
import { useEffect, useState } from "react";
import useProdutoStore from "../../stores/useProdutoStore";

function FormProduto() {
  const [isFocus, setIsFocus] = useState(true);
  const { getProdutos, produtos } = useProdutoStore();

    useEffect(() => {
      getProdutos();
    }, [getProdutos]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Produtos</h1>
            <p className="text-gray-500 mt-2">
              Gerencie os produtos da sua empresa
            </p>
          </div>
          <div>
            <button className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]">
              <NewSvg />
              Novo Produto
            </button>
          </div>
        </header>
        <div className="w-full px-8">
          <div
            className={`w-full ${
              isFocus ? "border-zinc-700 " : ""
            }  rounded-lg border-transparent border-2 p-0.5`}
          >
            <div className="w-full flex items-center p-1.5 gap-2 border border-zinc-300 rounded-md">
              <SearchSvg />
              <input
                className="w-full focus:outline-none focus:ring-0"
                type="text"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder=" Buscar Produtos..."
              />
            </div>
          </div>
        </div>
        <div className="w-full px-8 mt-6 text-sm text-left">
          <div className="border border-zinc-300 rounded-lg w-full">
            <table className="w-full">
              <thead className="border-b border-zinc-300 w-full">
                <tr className="flex justify-between text-zinc-500">
                  <th className="w-full h-12 px-4 flex items-center">Nome</th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Preço Venda
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Preço Compra
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">
                    Estoque
                  </th>
                  <th className="w-full h-12 px-4 flex items-center">Ações</th>
                </tr>
              </thead>
              {produtos ? (
                <tbody className="flex flex-col">
                  {produtos.map((produto, index) => (
                    <tr key={index} className="flex justify-between py-3">
                      <td className="w-full h-12 px-4 flex items-center">
                        {produto.title}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {produto.precov}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {produto.precoc}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {produto.estoque}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center gap-3 font-light">
                        <button>
                          <EditSvg />
                        </button>
                        <button>
                          <DeleteSvg />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className="w-full flex items-center justify-center py-10">
                  <p>Nenhuma ordem de serviço encontrada</p>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormProduto;
