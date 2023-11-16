import { ReactNode } from 'react'
import Image from "next/image";
import styles from '@styles/menus/hero.module.scss'
import Link from 'next/link';
  
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
        background: `url(${bgImg})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="siteWrapper">
        <Link href={`/home`}>
          <Image 
            src={logoSrc}
            alt='site Logo'
            width={150}
            height={200}
            className='site-logo'
          />
        </Link>

        <div>
          <Link href={`/home`} style={{color: 'white', textDecoration: 'none'}}>
            <h1>{title}</h1>
          </Link>

          <p>{description}</p>
        </div>


        {children}

      </div>
    </header>
  )
}