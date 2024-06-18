import { CSSProperties, ReactNode } from "react"
import styles from '@styles/card.module.scss'

type Props = {
  children:ReactNode,
  layout?:'flex'|'grid',
  direction?:'row'|'column',
  id?:string,
  bgColor?:string,
  className?:string,
  style?:CSSProperties,
  gap?:string
  // layout?: 'default'|'center',
}

export function Card ({ 
  layout, 
  direction = 'column',
  children,
  id,
  bgColor,
  className,
  style,
  gap = '1rem',
}:Props) {

  const allStyles = [
    'card',
    styles.card, 
    styles[layout || ''],
  ].join(' ')

  return (
    <div 
      id={id}
      className={allStyles + ' ' + className} 
      style={{backgroundColor: bgColor, flexDirection: direction, gap: gap, ...style}}
    >
      {children}
    </div>
  )
}