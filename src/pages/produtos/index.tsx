import FormProduto from "../../components/ProdutoContainer"
import ListMenu from "../../components/ListMenu"

function Produtos() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <FormProduto />
      </div>
    </div>
  )
}

export default Produtos