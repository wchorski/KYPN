import styles from '@styles/elements/nodata.module.css'
import type { ReactNode } from "react";
import { TbCircleDotted } from "react-icons/tb";



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

