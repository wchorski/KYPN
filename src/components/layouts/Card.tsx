import { ReactNode } from "react"
import styles from '@styles/card.module.scss'

type Props = {
  children:ReactNode,
  layout?:'flex'|'grid',
  id?:string,
  // layout?: 'default'|'center',
}

export function Card ({ 
  layout, 
  children,
  id
}:Props) {

  const allStyles = [
    'card',
    styles.card, 
    styles[layout || ''],
  ].join(' ')

  return (
    <div 
      id={id}
      className={allStyles} 
    >
      {children}
    </div>
  )
}