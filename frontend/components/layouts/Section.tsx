import { ReactNode } from "react"
import styles from "@styles/elements/section.module.scss";
import { GridLayout } from "@lib/types";

type Props = {
  pad?:number,
  bgColor?:string,
  bgImg?:string,
  col?:number,
  layout:GridLayout,
  children:ReactNode[]
}

export function Section({
  pad = 1, 
  bgColor = 'transparent', 
  bgImg = '', 
  col,
  layout = '1_1',
  children
}:Props
) {

  const stylesArr = [styles.section, styles[`grid_${layout}`] ]

  return (
    <section 
      className={stylesArr.join(' ')}
      style={{backgroundColor: bgColor, background: `url(${bgImg})`}}
    >

      {children?.map((child:any, i:number) => (
        <div key={i}> 
          {child} 
        </div>
      )) }
    
    </section>
  )

  // if(col) return (
  //   <section 
  //     className={styleArr.join(' ')} 
  //     style={{backgroundColor: bgColor, background: `url(${bgImg})`}}
  //   >
  //     <div className={styles[`col-${col}`]}>
  //       {children}
  //     </div>
  //   </section>
  // )

  // return (
  //   <section 
  //     className={styleArr.join(' ')} 
  //     style={{backgroundColor: bgColor, background: `url(${bgImg})`}}
  //   >
  //     {/* <div className="siteWrapper" style={{paddingInline: pad + 'rem'}}> */}
  //       {children}
  //     {/* </div> */}
  //   </section>
  // )
}
