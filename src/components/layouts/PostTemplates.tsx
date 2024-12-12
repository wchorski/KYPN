import styles from '@styles/blog/blogpost.module.css'
import { CSSProperties, ReactNode } from "react"

type PostTHeaderMain = {
  // template:'header_main_aside'|'HeaderMain',
  header:ReactNode,
  headerBgImg?:string,
  headerBgColor?:string,
  headerStyles?:CSSProperties,
  headerIsDisplayed?:boolean
  content:ReactNode,
  footer?:ReactNode,
}
export function PostTHeaderContentFooter ({ header, content, footer, headerBgImg, headerBgColor, headerStyles, headerIsDisplayed = true }:PostTHeaderMain) {


  return (
    <main>
    <article className={styles.article}>

      <header
        // className={styles.header}
        style={{
          backgroundImage: `url(${headerBgImg})`,
          backgroundColor: headerBgColor,
          display: headerIsDisplayed ? 'block' : 'none',
          ...headerStyles,
        }}
      >
        {header}
      </header>

      {content}

      <footer className='siteWrapper'>
        {footer}
      </footer>

    </article>
    </main>
  )
}