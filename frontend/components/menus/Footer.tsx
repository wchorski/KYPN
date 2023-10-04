import styles from '@styles/footer.module.scss'
import { SiGithub } from 'react-icons/si'
import Link from 'next/link'


export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='siteWrapper'>
          <a
            href="https://www.tawtaw.site"
            target="_blank"
            rel="noopener noreferrer"
          > 
            <span> {`There's a Will There's a Web.site`} </span>
          </a>

          <span> | </span>

          <Link
              href="https://github.com/wchorski/kypn"
              target={'_blank'}
            >
              <SiGithub />
          </Link>
        </div>
    </footer>
  )
}
