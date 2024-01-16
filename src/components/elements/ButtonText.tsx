'use client'

import { ReactNode } from "react"
import styles from "@styles/elements/button.module.scss";
import { LoadingAnim } from "./LoadingAnim";

type Props = {
  children:ReactNode
  isPending:boolean,
}

export function ButtonText ({ children, isPending }:Props) {
  return (
    <div className={styles.text_wrap} >

      <span className={isPending ? styles.opacity_0 : ''}>
        {children}
      </span>

      {isPending && <span style={{position: 'absolute'}}>
          <LoadingAnim />
        </span>
      }
    </div>
  )
}