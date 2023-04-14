import { useRouter } from 'next/router'
import Link from 'next/link'
import { ReactNode } from 'react';
import { useNavControl } from '../../lib/useGlobalContext';

export function LinkActive({ href, children }: { href: string, children: ReactNode }) {

  const { pathname: urlPathname, push: routerPush, asPath } = useRouter();
  const { setisNavOpen } = useNavControl()

  const style = {
    // backgroundColor: urlPathname === href ? 'var(--c-2)' : '',
    backgroundColor: urlPathname === href || asPath === href ? 'var(--c-2)' : '',
  }

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    setisNavOpen(false)
    routerPush(href)
  }

  return (
    <Link
      href={href}
      style={style}
      // @ts-ignore
      onClick={handleClick}
      className='menu-item'
    >
      {children}
      {/* {name} */}
      {/* <a style={style} onClick={handleClick} className='hurdur'> 
        {name} 
      </a> */}
    </Link>

  )
}