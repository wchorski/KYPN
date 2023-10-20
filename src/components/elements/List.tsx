'use client'
import { ReactNode } from 'react'
import styles from '@styles/elements/list.module.scss'
  
type Props = {
  delay?:number;
  duration?:number,
  isAnimated?:boolean,
  children:ReactNode[]|ReactNode,
  className:string,
}

export function List ({ isAnimated = false, delay = 0.2,  duration = 0.2, className, children }:Props) {

  if(!children) return <p> no children </p>

  const stylesArr = [styles.linklist, className]
  isAnimated ? stylesArr.push(styles.animated) : ''

  return (
    <ul className={stylesArr.join(' ')}>
      {Array.isArray(children) ? children.map((child, i) => (
        <li
          key={i}
          style={{
            animationDuration: duration + 's',
            animationDelay: i * delay + 's'
          }}
        >
          key: {i}
          {child}
        </li>
      )) : (
        <li
          style={{
            animationDuration: duration + 's',
            animationDelay: 0.1 * delay + 's'
          }}
          key={1}
        >
          only child:::: 
          {children}
        </li>
      )}
    </ul>
  )
}