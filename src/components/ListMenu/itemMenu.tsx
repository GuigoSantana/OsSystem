import { ReactNode } from 'react';
import style from './styles'
import { useLocation } from 'react-router-dom'

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
            <a className='select-none w-full' href={path}>{label}</a>
          </li>
  )
}

export default ItemMenu