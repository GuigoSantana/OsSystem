import ListMenu from '../../components/ListMenu'
import FormCliente from '../../components/ClienteContainer'

function Clientes() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <FormCliente />
      </div>
    </div>
  )
}

export default Clientes