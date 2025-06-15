import ClientesSvg from '../../assets/MenuSvgs/ClientesSvg'
import DashboardSvg from '../../assets/MenuSvgs/DashboardSvg'
import EntradaSvg from '../../assets/MenuSvgs/EntradaSvg'
import FinanceiroSvg from '../../assets/MenuSvgs/FinanceiroSvg'
import OrdensSvg from '../../assets/MenuSvgs/OrdensSvg'
import ProdutosSvg from '../../assets/MenuSvgs/ProdutosSvg'
import SaidaSvg from '../../assets/MenuSvgs/SaidaSvg'
import SairSvg from '../../assets/MenuSvgs/SairSvg'
import ServicosSvg from '../../assets/MenuSvgs/ServicosSvg'
import style from './styles'
import { useLocation } from 'react-router-dom'

function ListMenu() {
  const {pathname} = useLocation()
  return (
    <div className={style.container}>
      <h1 className={style.h1}>OS Manager</h1>
      <nav className={style.nav}>
        <ul className={style.ul}>
          <li className={`${style.li} ${pathname === '/' ? style.liFocus : ''}`}>
            <DashboardSvg />
            <a className='select-none w-full' href='/'>Dashboard</a>
          </li>
          <li className={`${style.li} ${pathname === '/clientes' ? style.liFocus : ''}`}>
            <ClientesSvg />
            <a className='select-none w-full' href='/clientes'>Clientes</a>
          </li>
          <li className={`${style.li} ${pathname === '/produtos' ? style.liFocus : ''}`}>
            <ProdutosSvg />
            <a className='select-none w-full' href='/produtos'>Produtos</a>
          </li>
          <li className={`${style.li} ${pathname === '/servicos' ? style.liFocus : ''}`}>
            <ServicosSvg />
            <a className='select-none w-full' href='/servicos'>Serviços</a>
            </li>
          <li className={`${style.li} ${pathname === '/ordens' ? style.liFocus : ''}`}>
            <OrdensSvg />
            <a className='select-none w-full' href='/ordens'>Ordens de Serviço</a>
          </li>
          <li className={`${style.li} ${pathname === '/financeiro' ? style.liFocus : ''}`}>
            <FinanceiroSvg />
            <a className='select-none w-full' href='/financeiro'>Financeiro</a>
            </li>
          <li id='finaceiros' className={`${style.liFinance} ${style.li} ${pathname === '/entradas' ? style.liFinanceFocus.entrada : ''}`}>
            <EntradaSvg />
            <a className='select-none w-full' href='/entrada'>Nova Entrada</a>
          </li>
          <li id='finaceiros' className={`${style.liFinance} ${style.li} ${pathname === '/saidas' ? style.liFinanceFocus.saida : ''}`}>
            <SaidaSvg />
            <a className='select-none w-full' href='/saida'>Nova Saída</a>
          </li>
        </ul>
        <button className={style.button}>
          <SairSvg />
          <p>Sair</p>
        </button>
      </nav>
    </div>
  )
}

export default ListMenu