import { CSSProperties, ReactNode } from "react"
import styles from '@styles/card.module.scss'

type Props = {
  children:ReactNode,
  layout?:'flex'|'grid',
  id?:string,
  bgColor?:string,
  className?:string,
  style?:CSSProperties,
  // layout?: 'default'|'center',
}

export function Card ({ 
  layout, 
  children,
  id,
  bgColor,
  className,
  style,
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
      style={{backgroundColor: bgColor, ...style}}
    >
      {children}
    </div>
  )
}