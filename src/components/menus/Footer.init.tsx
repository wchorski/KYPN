import styles from '@styles/footer.module.scss'
import { SiGithub } from 'react-icons/si'
import Link from 'next/link'
import { Section } from '@components/layouts/Section'
import { TawTawPowered } from './TawTawPowered'
import { envs } from '@/envs'
import { SocialLinkNav } from '@components/blocks/SocialLinkNav'
import { List } from '@components/elements/List'


export function Footer() {
  return (
    <footer className={styles.footer}>

      <Section layout={'1_1_1'}>

        <div>
          <h4> Contact </h4>
          <List>
            <Link href={`mailto:${envs.ADMIN_EMAIL_ADDRESS}`}> {envs.ADMIN_EMAIL_ADDRESS}</Link>
            <SocialLinkNav 
              color={envs.COLOR_PRIMARY}
              facebook='https://www.facebook.com'
              twitter='https://www.twitter.com'
              github='https://www.github.com'
            />
          </List>
        </div>

        <div>
          <h4> Plans </h4>
          <List>
            <Link href={`/pricing`}> Buisness Website  </Link>
            <Link href={`/pricing`}> DIY Website  </Link>
            <Link href={`/pricing`}> Done For You </Link>
            <Link href={`/pricing`}> Cloud Storage </Link>
          </List>
        </div>

        <div>
          <h4> Pages </h4>
          <List>
            <Link href={`/book-a-service`}> Book a Service</Link>
            <Link href={`/blog`}> Blog </Link>
            <Link href={`/shop`}> Shop </Link>
            <Link href={`/shop`}> Subscription Plans </Link>
          </List>
        </div>

      </Section>

      <Section 
        layout={'1_1_1'}
        color='var(--c-desaturated)'
      >
        <div>
          {envs.NEXT_PUBLIC_COPYWRITE}
        </div>
        <div></div>
        <div>
          <ul className={styles.terms_privacy_list} >
            <li>
              <Link href={`/terms-and-privacy`}> Terms & Conditions </Link>
            </li>
            <li>
              <Link href={`/terms-and-privacy`}> Privacy Policy </Link>
            </li>
          </ul>
        </div>

      </Section>

      <Section layout={'1'} color={'#282828'}>
        <TawTawPowered />
      </Section>

    </footer>
  )
}
