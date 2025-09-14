import FormServico from "../../components/ServicoContainer"
import ListMenu from "../../components/ListMenu"

function Servicos() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <FormServico />
      </div>
    </div>
  )
}

export default Servicos