import Link from "next/link"
import { ReactNode } from "react"
import { LuExternalLink } from "react-icons/lu";
import styles from '@styles/blocs/imagelinks.module.scss'

type InfoCard = {
  header:string,
  content?:string,
  children?:ReactNode,
  buttonLink:string,
  buttonLabel:string,
  imageSrc:string,
  imageSize:string,
  color:string,
}

type Props = {
  items:InfoCard[]
}

export function ImageLinkList({items}:Props) {
  return (
    <ul className={styles.links} >
      {items.map((item, i) => (
        <li key={i}>
          <Card item={item}/>
        </li>
      ))}
    </ul>
  )
}


function Card({item}:{item:InfoCard}){

  return (
    <div className={styles.card} >

      {item.header && <h6>{item.header}</h6> }
      

      {item.buttonLink ? (
        <Link href={item.buttonLink} target="#" className="image-cont">
          <figure 
          // todo maybe do a blur?
            // style={{backgroundImage: `url(${item.imageSrc})`}}
          >
            <img src={item.imageSrc} width={item.imageSize}/>
          </figure>
        </Link>
      ) : (
        <div className="image-cont">
          <figure 
          // todo maybe do a blur?
            // style={{backgroundImage: `url(${item.imageSrc})`}}
          >
            <img src={item.imageSrc} width={item.imageSize}/>
          </figure>
        </div>
      )}

      {/* <div className="content">
        {item.content}
      </div> */}
      {item.buttonLink && (
        <Link href={item.buttonLink} target="#" className="btn">
          {item.buttonLabel && <span> {item.buttonLabel} </span> }
          <LuExternalLink />
        </Link>
      )}

    </div>
  )
}