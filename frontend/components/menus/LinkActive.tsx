import { useRouter } from 'next/router'
import Link from 'next/link'
import { ReactNode } from 'react';
import { useNavControl } from '../../lib/useGlobalContext';



export function LinkActive({ href, children, className }: { href: string, children: ReactNode, className?:string }) {

  const { pathname: urlPathname, push: routerPush, asPath } = useRouter();
  const { setisNavOpen } = useNavControl()


  function handleIsActive() {

    if (urlPathname === href || asPath === href) {
      return 'isActive'
    } else {
      return ''
    }

  }


  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    setisNavOpen(false)
    routerPush(href)
  }

  return (
    <Link
      href={href}
      // @ts-ignore
      onClick={handleClick}
      className={`menu-item ${handleIsActive()} ${className}`}
    >
      {children}
    </Link>

  )
}