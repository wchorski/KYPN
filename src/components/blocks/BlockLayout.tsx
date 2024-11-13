import { ReactNode } from "react"
// import { Section } from "@components/blocks/Section"
import { ColorsTheme, GridLayout } from "@ks/types"
import { BlockLayout as BlkLayout } from "../../components/layouts/BlockLayout";
import { getColorTheme } from "@lib/styleHelpers";

type Props = {
  children: ReactNode[],
  layout:number[],
  content?:any,
  // color?:string,
  // backgroundColor?:string,
  colorTheme?:ColorsTheme,
  paddingBlock?:string,
  nestedBlock?:boolean
}

export function BlockLayout(props:Props) {
  // todo `nestedBlock` hacky way but it works (fixes difference between editor block vs web dev added)
  const {children, content, colorTheme = 'bg_c_transparent', layout, paddingBlock = '4vh', nestedBlock} = props
  
  // layout input looks like [1,1] [1,2] [2,1] [1,1,1] [1,2,1]
  const layoutString = layout ? layout.join('_') as GridLayout : '1'
  const clrTheme = getColorTheme(colorTheme)

  return (
    <BlkLayout layout={layoutString}  style={{paddingBlock}} className={clrTheme} nestedBlock={nestedBlock}>
      {content ? content : children}
      {/* {content && <BlockRender document={content}/>} */}
      {/* {content} */}
    </BlkLayout>
  )
}


