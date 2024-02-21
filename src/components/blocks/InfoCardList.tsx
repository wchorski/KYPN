import Link from "next/link"
import { ReactNode } from "react"
import styles from '@styles/blocs/infocard.module.scss'
import { ImageDynamic } from "@components/elements/ImageDynamic"

export type InfoCard = {
  header:string,
  content?:string|ReactNode,
  children?:ReactNode,
  buttonLink:string,
  buttonLabel:string,
  imageSrc:string,
  color:string,
}

type Props = {
  items:InfoCard[]
}

export function InfoCardList({items}:Props) {
  return (
    <ul className={styles.cardlist} >
      {items.map((item, i) => (
        <li key={i}>
          <InfoCardItem item={item}/>
        </li>
      ))}
    </ul>
  )
}


export function InfoCardItem({item, children}:{item:InfoCard, children?:ReactNode}){

  return (
    <article className={styles.carditem} >
      <header>
        {/* <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure> */}
        <ImageDynamic photoIn={item.imageSrc}/>
        <h3>{item.header}</h3>
      </header>

      <div className={styles.content_wrap} >
        {item.content}
        {children}
        <Link href={item.buttonLink} className="button medium">{item.buttonLabel}</Link>
      </div>

    </article>
  )
}
