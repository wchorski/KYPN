'use client'

import styles from "@styles/elements/button.module.scss";
import { LoadingAnim } from "./LoadingAnim";
import { ReactNode, useEffect, useState } from "react";
import { ButtonText } from "./ButtonText";
import { wait } from "@lib/waitTimeout";

type Props = {
  size?:'small'|'medium'|'large',
}

export function Button ({  size = 'medium',  }:Props) {

  const [isPen, setisPend] = useState(false)

  useEffect( () => {

    const id = setTimeout(() => {
      if(isPen) setisPend(false)
      console.log('USE EFFECT: set timeout');
    }, 1000);

    // return () => 
  }, [isPen])
  

  return (
    <button 
      onClick={(e) => {console.log('click'); setisPend(!isPen)}}
      disabled={isPen}
      className={[styles.button, size, 'button'].join(' ')} 
    > 
      <ButtonText isPending={isPen}> click on MEEEE </ButtonText>
    </button>
  )
}