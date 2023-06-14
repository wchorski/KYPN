import { ReactNode } from "react"
import styles from './styles/BlockLayout.module.scss'

type Props = {
  children: ReactNode[],
  layout:number[],
}

export function BlockLayout({children, layout}:Props) {

  // layout [1,1] [1,2] [2,1] [1,1,1]
  // console.log(props);
  
  return (

    <div className={styles.grid}>

      {children.map((child, i) => <div key={i}> {child} </div>) }
     
    </div>
  )
}


