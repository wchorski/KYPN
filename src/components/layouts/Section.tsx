import { CSSProperties, ReactNode } from "react"
import { GridLayout } from "@ks/types";
// import styles from "@styles/elements/section.module.scss";

type Props = {
  pad?:number,
  imageSrc?:string,
  color?:string,
  col?:number,
  layout:GridLayout,
  children:ReactNode|ReactNode[],
  id?:string,
  styles?:CSSProperties,
  className?:string
}

export function Section({
  pad = 1, 
  imageSrc, 
  color, 
  col,
  layout = '1_1',
  children,
  id,
  styles,
  className,
}:Props
) {
  //                                  gotta put a '_' in front because css no like numbers as class names
  const stylesArr = ['section', `grid`, [`_${layout}`], className ]
  // todo trying global instead of module
  // const stylesArr = [styles.section, styles[`grid_${layout}`] ]

  const inlineStyles = {
    ...styles
  } as CSSProperties

  if(imageSrc) Object.assign(inlineStyles, {background: `url(${imageSrc})`})
  if(color) Object.assign(inlineStyles, {backgroundColor: color,}) 

  return (
    <section 
      id={id}
      className={stylesArr.join(' ')}
      style={inlineStyles}
    >

      {Array.isArray(children) ? children?.map((child:any, i:number) => (
        <div key={i}> 
          {child} 
        </div>
      )) : (
        <div>
          {children}
        </div>
      ) }
    
    </section>
  )
}
