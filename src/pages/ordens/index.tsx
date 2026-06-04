import ListMenu from '../../components/ListMenu'
import OrdemContainer from "../../components/OrdemContainer";

function Ordens() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <OrdemContainer />
      </div>
    </div>
  )
}

export default Ordens