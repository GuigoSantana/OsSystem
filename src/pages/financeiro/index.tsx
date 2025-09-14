import FormFinanceiro from "../../components/FinanceiroContainer";
import ListMenu from "../../components/ListMenu";

function Finaceiro() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <FormFinanceiro />
      </div>
    </div>
  );
}

export default Finaceiro;
