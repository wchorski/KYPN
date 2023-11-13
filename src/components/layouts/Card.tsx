import { ReactNode } from "react"
import styles from '@styles/card.module.scss'

type Props = {
  children:ReactNode,
  layout?:'flex'|'grid',
  // layout?: 'default'|'center',
}

export function Card ({ 
  layout, 
  children 
}:Props) {

  const allStyles = [
    styles.card, 
    styles[layout || ''],
  ].join(' ')

  return (
    <div 
      className={allStyles} 
    >
      {children}
    </div>
  )
}