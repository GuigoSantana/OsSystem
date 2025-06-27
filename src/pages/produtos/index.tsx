import FormProduto from "../../components/FormProduto"
import ListMenu from "../../components/ListMenu"

function Protudos() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <FormProduto />
      </div>
    </div>
  )
}

export default Protudos