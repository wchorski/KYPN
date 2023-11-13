import { ReactNode } from "react"
import styles from "@styles/elements/section.module.scss";
import { GridLayout } from "@ks/types";

type Props = {
  pad?:number,
  bgColor?:string,
  bgImg?:string,
  col?:number,
  layout:GridLayout,
  children:ReactNode|ReactNode[],
  id?:string,
}

export function Section({
  pad = 1, 
  bgColor, 
  bgImg, 
  col,
  layout = '1_1',
  children,
  id,
}:Props
) {

  const stylesArr = [styles.section, styles[`grid_${layout}`] ]

  const inlineStyles = {}

  if(bgImg) Object.assign(inlineStyles, {background: `url(${bgImg})`})
  if(bgColor) Object.assign(inlineStyles, {backgroundColor: bgColor,}) 

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
