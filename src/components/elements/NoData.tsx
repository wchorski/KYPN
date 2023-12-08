import { TbCircleDotted } from "react-icons/tb";
import styles from '@styles/elements/nodata.module.scss'



export function NoData({name}:{name?:string}) {
  return (
    <span className={styles.noData} >

      <TbCircleDotted />
      no {name || 'data'} available 
  
    </span>
  )
}

