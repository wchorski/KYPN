import { TbCircleDotted } from "react-icons/tb";
import styles from '@styles/elements/nodata.module.scss'

export function NoData() {
  return (
    <span className={styles.noData} >

      <TbCircleDotted />
      no data available 
  
    </span>
  )
}

