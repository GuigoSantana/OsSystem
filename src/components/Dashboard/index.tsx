import GraficoValoresFinanceiros from './Grafico'
import ClientesSvg from '../../assets/DashboardSvgs/ClientesSvg'
import ProdutosSvg from '../../assets/DashboardSvgs/ProdutosSvg'
import ServicosSvg from '../../assets/DashboardSvgs/ServicosSvg'
import OrdensSvg from '../../assets/DashboardSvgs/OrdensSvg'
import style from './styles'
import Calendario from './Calendario'
import React from 'react'
import CalendarioSvg from '../../assets/DashboardSvgs/CalendarioSvg'
import { Range } from 'react-date-range'
import Valores from './Valores'
function Dashboard() {
    const [toggleCalendar, setToggleCalendar] = React.useState(false)
    const [stateCalendar, setStateCalendar] = React.useState<Range[]>([
            {
              startDate: new Date(),
              endDate: undefined,
              key: 'selection'
            }
          ]);
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: '2-digit', year: 'numeric'}
  
    const formatter = new Intl.DateTimeFormat('pt-BR', options)

    const formatedStartDate = formatter.format(stateCalendar[0].startDate)
    const formatedEndDate = formatter.format(stateCalendar[0].endDate)

  return (
    <div className={style.content}>
        <div className={style.header.content}>
            <h1 className={style.header.h1}>Dashboard</h1>
            <p>Visão geral do sistema de ordens de serviço</p>
        </div>
        <div className={style.cardsContainer}>
            <div className={style.card.container}>
                <div className={style.card.descriptions}>
                    <p className={style.card.label}>Clientes</p>
                    <ClientesSvg />
                </div>
                <span className={style.card.value}>0</span>
            </div>
            <div className={style.card.container}>
                <div className={style.card.descriptions}>
                    <p className={style.card.label}>Produtos</p>
                    <ProdutosSvg />
                </div>
                <span className={style.card.value}>0</span>
            </div>
            <div className={style.card.container}>
                <div className={style.card.descriptions}>
                    <p className={style.card.label}>Serviços</p>
                    <ServicosSvg />
                </div>
                <span className={style.card.value}>0</span>
            </div>
            <div className={style.card.container}>
                <div className={style.card.descriptions}>
                    <p className={style.card.label}>Total de O.S.</p>
                    <OrdensSvg />
                </div>
                <span className={style.card.value}>0</span>
            </div>

        </div>
        <div className={style.graficContainer}>
            <GraficoValoresFinanceiros />
        </div>

        <div className='w-full border rounded-lg mt-8 py-6 px-6 border-zinc-100'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <CalendarioSvg h='6' w='6'/>
                    <h2 className='text-2xl font-semibold'>Resumo do Período</h2>
                </div>
                <div className='relative'>
                    <div onClick={() => setToggleCalendar(!toggleCalendar)} className='flex items-center gap-2 p-2 rounded-md border border-zinc-200'>
                        <CalendarioSvg h='4' w='4'/>
                        <p className='select-none font-semibold'>{formatedStartDate} - {formatedEndDate}</p>
                    </div>
                    {toggleCalendar &&
                        <Calendario state={stateCalendar} setState={setStateCalendar} />
                    }
                </div>
            </div>
            <Valores />
        </div>
    </div>
  )
}

export default Dashboard