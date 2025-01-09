import { TbCircleDotted } from "react-icons/tb";
import styles from '@styles/elements/nodata.module.css'
import type { ReactNode } from "react";



export function NoData({name, children}:{name?:string, children?:ReactNode}) {
  return (
    <span className={styles.noData} >

      <TbCircleDotted />
      no {name || 'data'} available 
      <br/>
      {children}
    </span>
  )
}

