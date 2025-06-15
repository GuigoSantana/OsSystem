import ListMenu from '../../components/ListMenu'
import FormOrdem from '../../components/FormOrdem'

function Ordens() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <FormOrdem />
      </div>
    </div>
  )
}

export default Ordens