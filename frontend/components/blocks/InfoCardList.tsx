import Link from "next/link"
import { ReactNode } from "react"
import styles from './styles/infocard.module.scss'

type InfoCard = {
  header:string,
  content?:string,
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
        <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure>
        <h3>{item.header}</h3>
      </header>

      <div className="content">
        {item.content}
        {children}
      </div>

      <Link href={item.buttonLink} className="button">{item.buttonLabel}</Link>
    </article>
  )
}
