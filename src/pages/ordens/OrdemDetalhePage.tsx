import ListMenu from "../../components/ListMenu";
import OrdemDetails from "../../components/OrdemContainer/OrdemDetails";

function OrdemDetalhePage() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <OrdemDetails />
      </div>
    </div>
  );
}

export default OrdemDetalhePage;
