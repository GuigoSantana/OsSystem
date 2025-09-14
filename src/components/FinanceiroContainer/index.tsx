import SearchSvg from "../../assets/FormSvgs/SearchSvg";
import EntradaSvg from "../../assets/MenuSvgs/EntradaSvg";
import SaidaSvg from "../../assets/MenuSvgs/SaidaSvg";

function FormFinanceiro() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full xl:w-[80%] flex flex-col item-center">
        <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold">Financeiro</h1>
            <p className="text-gray-500 mt-2">
              Gerenciamento de entradas e saidas financeiras
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-[42px] cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700">
              <EntradaSvg color="text-white" />
              Nova Entrada
            </button>
            <button className="h-[42px] cursor-pointer flex items-center gap-2 py-2 px-3 rounded-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700">
              <SaidaSvg color="text-white" />
              Nova Saída
            </button>
          </div>
        </header>

        <div className="w-full gap-5 flex justify-around px-8">
          <div className="border border-zinc-200 rounded-lg items-center px-6 py-6 w-full shadow">
            <p className="flex items-center">
              <EntradaSvg /> Total de Entradas
            </p>
            <span className="text-2xl font-bold">R$ 0,00</span>
          </div>
          <div className="border border-zinc-200 rounded-lg items-center px-6 py-6 w-full shadow">
            <p className="flex items-center">
              <SaidaSvg /> Total de Saídas
            </p>
            <span className="text-2xl font-bold">R$ 0,00</span>
          </div>
          <div className="bg-green-100 border border-zinc-200 rounded-lg items-center px-6 py-6 w-full shadow">
            <p>Saldo Atual</p>
            <span className="text-2xl font-bold">R$ 0,00</span>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 shadow mx-8 my-6 py-6">
          <div className="flex justify-between px-6 ">
            <h2 className="text-2xl font-semibold">Histórico de Transações</h2>
           <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-zinc-500"><SearchSvg /></span>
             <input className="border border-zinc-200 pl-8 py-2 px-2 rounded-lg" type="search" placeholder="Buscar transação..." />
           </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-zinc-500">Nenhuma transação encontrada</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormFinanceiro;
