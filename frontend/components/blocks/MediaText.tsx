import Image from "next/image";
import styles from './styles/mediatext.module.scss'
import { ReactNode } from "react";

// const bg = `https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg`

type Props = {
  mediatext: tMediaText
}

export type tMediaText = {
  imageSrc?: string,
  imageAlt?:string,
  mediaWidth?: string,
  rowReverse?: boolean,
  content?: ReactNode,
  children?: ReactNode,
}
// type tMediaText = {
//   bg: string,
//   mediaWidth: string,
//   rowReverse: boolean,
//   content: {
//     document: any[]
//   },
// }

export function MediaText({imageSrc, imageAlt, content, rowReverse = false, children}:tMediaText) {
  
  // console.log(rowReverse);
  
  
  return (
    <div 
      className={styles.mediatext} 
      // bg={imageSrc} 
      style={{msFlexDirection: rowReverse ? 'row-reverse' : 'row'}}
    >
      <div className="content-cont">
        <article>
          {content}
          {children}
        </article>

      </div>

      <div className="media-cont">
        <figure>
          <Image 
            src={imageSrc || ''}
            width={100}
            height={100}
            alt={imageAlt || 'no alt caption'}
          />
        </figure>
      </div>
    </div>
  )
}
