'use client'

import { ReactNode } from "react"
import styles from "@styles/elements/button.module.css";
import { LoadingAnim } from "./LoadingAnim";

type Props = {
  children:ReactNode
  isAnim:boolean,
}

export function ButtonText ({ children, isAnim }:Props) {
  return (
    <div className={styles.text_wrap} >

      <span className={isAnim ? styles.opacity_0 : ''}>
        {children}
      </span>

      {isAnim && <span style={{position: 'absolute'}}>
          <LoadingAnim />
        </span>
      }
    </div>
  )
}