import { ReactNode } from "react"
import styles from "@styles/elements/section.module.scss";

type Props = {
  children:ReactNode|ReactNode[]
  imageSrc?:string,
  color?:string,
  columns?:number,
  content?: ReactNode,
}

export function Section({color, imageSrc, content, children, columns = 1}:Props) {

  const styleArr = [styles.section, styles.grid]

  if(columns > 1) return (
    <section 
      className={styleArr.join(' ')} 
      style={{backgroundColor: color, background: `url(${imageSrc})`}}
    >
      <div className={styles[`col_${columns}`]}>
        {children}
      </div>
    </section>
  )

  return (
    <section 
      className={styleArr.join(' ')} 
      style={{backgroundColor: color, background: `url(${imageSrc})`}}
    >
      {/* <div className="siteWrapper" style={{paddingInline: pad + 'rem'}}> */}
        {children}
      {/* </div> */}
    </section>
  )
}