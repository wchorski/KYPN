import { ReactNode } from 'react'
import Image from "next/image";
import styles from '@styles/menus/hero.module.scss'
  
type Props = {
  title:string,
  description:string,
  logoSrc:string,
  bgImg?:string,
  children:ReactNode
}

export function Hero ({ children, title, description, logoSrc, bgImg = '' }:Props) {
  return (
    <header 
      className={styles.hero}
      style={{
        background: `url(${bgImg})`
      }}
    >
      <div className="siteWrapper">
        <Image 
          src={logoSrc}
          alt='site Logo'
          width={100}
          height={200}
          className='site-logo'
        />

        <div>
          <h1>{title}</h1>

          <p>{description}</p>
        </div>


        {children}

      </div>
    </header>
  )
}