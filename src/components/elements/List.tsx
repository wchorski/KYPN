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

  if(!children) return null

  const stylesArr = [styles.linklist, className]
  isAnimated ? stylesArr.push(styles.animated) : ''

  const allStyles = stylesArr.join(' ');

  // return (
  //   <ul className={stylesArr.join(' ')}>
  //     {children.map((child, i) => (
  //       <li
  //         key={i}
  //         style={{
  //           animationDuration: duration + 's',
  //           animationDelay: i * delay + 's'
  //         }}
  //       >
  //         key: {i}
  //         {child}
  //       </li>
  //     ))}
  //   </ul>
  // )

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
     
          {child}
        </li>
      )) : (
        <li
          key={1}
          style={{
            animationDuration: duration + 's',
            animationDelay: 0.1 * delay + 's'
          }}
        >
          {children}
        </li>
      )}
    </ul>
  )
}