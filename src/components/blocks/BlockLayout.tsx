import { ReactNode } from "react"
import stylesSec from '@styles/elements/section.module.scss'
import { Section } from "@components/layouts/Section"
import { GridLayout } from "@ks/types"

type Props = {
  children: ReactNode[],
  layout:number[],
}

export function BlockLayout({children, layout}:Props) {

  // layout [1,1] [1,2] [2,1] [1,1,1] [1,2,1]

  // const stylesArr = [stylesSec.section, stylesSec[`grid_${layout.join('_')}`] ]
  
  const layoutString = layout.join('_') as GridLayout

  return (
    <Section layout={layoutString}>
      {children}
    </Section>
  )
  // return (

  //   <section className={stylesArr.join(' ')}>

  //     {children.map((child, i) => (
  //       <div key={i}> 
  //         {child} 
  //       </div>
  //     )) }
    
  //   </section>

  // )
}


