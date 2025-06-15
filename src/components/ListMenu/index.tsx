import ClientesSvg from '../../assets/MenuSvgs/ClientesSvg'
import DashboardSvg from '../../assets/MenuSvgs/DashboardSvg'
import EntradaSvg from '../../assets/MenuSvgs/EntradaSvg'
import FinanceiroSvg from '../../assets/MenuSvgs/FinanceiroSvg'
import OrdensSvg from '../../assets/MenuSvgs/OrdensSvg'
import ProdutosSvg from '../../assets/MenuSvgs/ProdutosSvg'
import SaidaSvg from '../../assets/MenuSvgs/SaidaSvg'
import SairSvg from '../../assets/MenuSvgs/SairSvg'
import ServicosSvg from '../../assets/MenuSvgs/ServicosSvg'
import ItemMenu from './itemMenu'
import style from './styles'
import { useLocation } from 'react-router-dom'

function ListMenu() {
  const {pathname} = useLocation()
  return (
    <div className={style.container}>
      <h1 className={style.h1}>OS Manager</h1>
      <nav className={style.nav}>
        <ul className={style.ul}>
          <ItemMenu path='/' label='Dashboard'>
            <DashboardSvg />
          </ItemMenu>
          <ItemMenu path='/clientes' label='Clientes'>
            <ClientesSvg />
          </ItemMenu>
          <ItemMenu path='/produtos' label='Produtos'>
            <ProdutosSvg />
          </ItemMenu>
          <ItemMenu path='/servicos' label='Serviços'>
            <ServicosSvg />
          </ItemMenu>
          <ItemMenu path='/ordens' label='Ordens'>
            <OrdensSvg />
          </ItemMenu>
          <ItemMenu path='/financeiro' label='financeiro'>
            <FinanceiroSvg />
          </ItemMenu>
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