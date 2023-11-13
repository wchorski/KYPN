import { ReactNode } from "react"
import styles from '@styles/blocs/BlockLayout.module.scss'
import stylesSec from '@styles/elements/section.module.scss'

type Props = {
  children: ReactNode[],
  layout:number[],
}

export function BlockLayout({children, layout}:Props) {

  // layout [1,1] [1,2] [2,1] [1,1,1] [1,2,1]

  const stylesArr = [stylesSec.section, stylesSec[`grid_${layout.join('_')}`] ]
  
  return (

    <section className={stylesArr.join(' ')}>

      {children.map((child, i) => (
        <div key={i}> 
          {child} 
        </div>
      )) }
    
    </section>

  )
}


