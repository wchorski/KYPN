import { ReactNode } from 'react'
import styles from '@styles/aside.module.scss'
  
type Props = {
  children:ReactNode
}

export function AsideBar ({ children }:Props) {
  return (
    <aside className={styles.aside} aria-label='Site Sidebar'>
      {children}
    </aside>
  )
}