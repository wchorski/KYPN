import { CSSProperties, ReactNode } from "react"
import { GridLayout } from "@ks/types";
import styles from "@styles/grid.module.scss";

type Props = {
  pad?:number,
  imageSrc?:string,
  color?:string,
  col?:number,
  layout:GridLayout,
  children:ReactNode|ReactNode[],
  id?:string,
  style?:CSSProperties,
  className?:string
}

export function Grid({
  pad = 1, 
  imageSrc, 
  color, 
  col,
  layout = '1_1',
  children,
  id,
  style,
  className,
}:Props
) {
  //                                  gotta put a '_' in front because css no like numbers as class names
  const classNms = [styles.grid, styles[`_${layout}`], className ]
  // todo trying global instead of module
  // const stylesArr = [styles.section, styles[`grid_${layout}`] ]

  const inlineStyles = {
    ...styles
  } as CSSProperties

  if(imageSrc) Object.assign(inlineStyles, {background: `url(${imageSrc})`})
  if(color) Object.assign(inlineStyles, {backgroundColor: color,}) 

  return (
    <div 
      id={id}
      className={classNms.join(' ')}
      style={inlineStyles}
    >

      {children}
    
    </div>
  )
  // return (
  //   <div 
  //     id={id}
  //     className={stylesArr.join(' ')}
  //     style={inlineStyles}
  //   >

  //     {Array.isArray(children) ? children?.map((child:any, i:number) => (
  //       <div key={i}> 
  //         {child} 
  //       </div>
  //     )) : (
  //       <div>
  //         {children}
  //       </div>
  //     ) }
    
  //   </div>
  // )
}
