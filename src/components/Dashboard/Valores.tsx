import EntradaSvg from "../../assets/MenuSvgs/EntradaSvg"
import SaidaSvg from "../../assets/MenuSvgs/SaidaSvg"

function Valores() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        <div className="flex flex-col gap-2 rounded-lg p-8 border border-zinc-200 shadow-sm">
            <p className="text-blue-600 font-semibold">Ordens em Aberto</p>
            <span className="text-xl font-bold">R$ 0,00</span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-8 border border-zinc-200 shadow-sm">
            <p className="text-green-600 font-semibold">Ordens Concluídas</p>
            <span className="text-xl font-bold">R$ 0,00</span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-8 border border-zinc-200 shadow-sm">
            <p className="flex items-center text-green-600 font-semibold"><span><EntradaSvg/></span>Entradas</p>
            <span className="text-xl font-bold">R$ 0,00</span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-8 border border-zinc-200 shadow-sm">
            <p className="flex items-center text-red-600 font-semibold"><span><SaidaSvg/></span>Saídas</p>
            <span className="text-xl font-bold">R$ 0,00</span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-8 border border-zinc-200 shadow-sm">
            <p className="text-green-600 font-semibold">Saldo total</p>
            <span className="text-xl font-bold">R$ 0,00</span>
        </div>
    </div>
  )
}

export default Valores