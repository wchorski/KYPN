import { ReactNode } from "react"
// import { Section } from "@components/blocks/Section"
import { GridLayout } from "@ks/types"
import { BlockLayout as BlkLayout } from "../../components/layouts/BlockLayout";
import { BlockRender } from "./BlockRender";
type Props = {
  children: ReactNode[],
  layout:number[],
  content?:any,
  color?:string,
  backgroundColor?:string,
  paddingBlock?:string,
}

export function BlockLayout(props:Props) {
  const {children, content, color, backgroundColor, layout, paddingBlock} = props
  
  // layout input looks like [1,1] [1,2] [2,1] [1,1,1] [1,2,1]
  const layoutString = layout ? layout.join('_') as GridLayout : '1'

  return (
    <BlkLayout layout={layoutString} color={color} backgroundColor={backgroundColor} style={{paddingBlock}}>
      {content ? content : children}
      {/* {content && <BlockRender document={content}/>} */}
      {/* {content} */}
    </BlkLayout>
  )
}


