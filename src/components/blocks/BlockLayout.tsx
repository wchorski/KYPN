import { ReactNode } from "react"
// import { Section } from "@components/blocks/Section"
import { GridLayout } from "@ks/types"
import { BlockLayout as BlkLayout } from "../../components/layouts/BlockLayout";
type Props = {
  children: ReactNode[],
  layout:number[],
}

export function BlockLayout({children, layout}:Props) {

  // layout input looks like [1,1] [1,2] [2,1] [1,1,1] [1,2,1]
  const layoutString = layout.join('_') as GridLayout

  return (
    <BlkLayout layout={layoutString}>
      {children}
    </BlkLayout>
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


