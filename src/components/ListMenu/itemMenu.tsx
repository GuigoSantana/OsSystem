import { ReactNode } from 'react';
import style from './styles'
import { Link, useLocation } from 'react-router-dom'

type ItemType = {
    children: ReactNode;
    path: string;
    label: string;
}

function ItemMenu({children, path, label }: ItemType) {
    
  const {pathname} = useLocation()
  return (
    <li className={`${style.li} ${pathname === path ? style.liFocus : ''}`}>
            {children}
            <Link className='select-none w-full' to={path}>{label}</Link>
          </li>
  )
}

export default ItemMenu