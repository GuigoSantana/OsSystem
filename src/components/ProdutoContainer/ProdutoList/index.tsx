import { useEffect, useMemo, useState } from "react";
import useProdutoStore from "../../../stores/useProdutoStore";
import useToastStore from "../../../stores/useToastStore";
import NewSvg from "../../../assets/FormSvgs/NewSvg";
import SearchSvg from "../../../assets/FormSvgs/SearchSvg";
import DeleteSvg from "../../../assets/FormSvgs/DeleteSvg";
import EditSvg from "../../../assets/FormSvgs/EditSvg";
import { novoProdutoType } from "..";
import { Link } from "react-router-dom";
import { ProdutoListType } from "../../../types/produtosTypes";
import ConfirmModal from "../../ConfirmModal";
import Toast from "../../ToastComponent";

function produtoCorrespondeBusca(
  produto: ProdutoListType,
  termo: string
): boolean {
  const termoTexto = termo.trim().toLowerCase();
  if (!termoTexto) return true;

  const nome = (produto.nome ?? "").toLowerCase();
  if (nome.includes(termoTexto)) return true;

  const precoVenda = String(produto.precoVenda ?? "");
  const precoCusto = String(produto.precoCusto ?? "");

  if (
    precoVenda.toLowerCase().includes(termoTexto) ||
    precoCusto.toLowerCase().includes(termoTexto)
  ) {
    return true;
  }

  const termoNumerico = termo.replace(/[^\d.,]/g, "").replace(",", ".");
  if (!termoNumerico) return false;

  const vendaNormalizado = precoVenda.replace(",", ".");
  const custoNormalizado = precoCusto.replace(",", ".");

  return (
    vendaNormalizado.includes(termoNumerico) ||
    custoNormalizado.includes(termoNumerico)
  );
}

function ProdutoList({ novoProduto, setNovoProduto }: novoProdutoType) {
  const [isFocus, setIsFocus] = useState(false);
  const [busca, setBusca] = useState("");
  const [produtoParaExcluir, setProdutoParaExcluir] =
    useState<ProdutoListType | null>(null);

  const { getProdutos, produtos, deleteProduto, isLoading } = useProdutoStore();
  const { isOpen } = useToastStore();

  useEffect(() => {
    getProdutos();
  }, [getProdutos]);

  const produtosFiltrados = useMemo(
    () => produtos.filter((produto) => produtoCorrespondeBusca(produto, busca)),
    [produtos, busca]
  );

  const handleConfirmarExclusao = async () => {
    if (!produtoParaExcluir?.id) return;
    const sucesso = await deleteProduto(produtoParaExcluir.id);
    if (sucesso) {
      setProdutoParaExcluir(null);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Produtos</h1>
            <p className="text-gray-500 mt-2">
              Gerencie os produtos da sua empresa
            </p>
          </div>
          <div>
            <button
              onClick={() => setNovoProduto(!novoProduto)}
              className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
            >
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
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder="Buscar por nome ou preço..."
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
              {produtosFiltrados.length > 0 ? (
                <tbody className="flex flex-col">
                  {produtosFiltrados.map((produto) => (
                    <tr key={produto.id} className="flex justify-between py-3">
                      <td className="w-full h-12 px-4 flex items-center">
                        {produto.nome}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {produto.precoVenda}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {produto.precoCusto}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center font-light">
                        {produto.estoque}
                      </td>
                      <td className="w-full h-12 px-4 flex items-center gap-3 font-light">
                        <button type="button" className="cursor-pointer">
                          <Link to={`/produtos/${produto.id}`}>
                            <EditSvg />
                          </Link>
                        </button>
                        <button
                          type="button"
                          onClick={() => setProdutoParaExcluir(produto)}
                          className="cursor-pointer"
                        >
                          <DeleteSvg />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <div className="w-full flex items-center justify-center py-10">
                        <p className="text-zinc-500">
                          {produtos.length === 0
                            ? "Nenhum produto cadastrado."
                            : "Nenhum produto encontrado para esta busca."}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={!!produtoParaExcluir}
        title="Excluir produto"
        message={
          produtoParaExcluir
            ? `Tem certeza que deseja excluir o produto "${produtoParaExcluir.nome}"? Esta ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setProdutoParaExcluir(null)}
        isLoading={isLoading}
      />
      {isOpen && <Toast />}
    </div>
  );
}

export default ProdutoList;
