'use client'
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"
import styles from '@styles/nav.module.css'
import { useNavControl } from "@hooks/useGlobalContext"

type Props = {
  href:string,
  className?:string,
  children:ReactNode,
  target?:'_blank'|'_self'|'_parent'|'_top',
}

export function NavLink ({ target = '_self',href, children, className = '' }:Props) {

  const { setisNavOpen } = useNavControl()
  let segment = useSelectedLayoutSegment()
  // console.log(segment)
  
  let isActive = (href === `/${segment}`)

  const styleArr = [styles.navlink, className , 'navlink']

  return (
    <Link 
      href={href}
      target={target}
      onClick={() => setisNavOpen(false)}
      className={isActive ? [...styleArr, styles.active,].join(' ') : styleArr.join(' ')}
    >
      {children}
    </Link>
  )
}