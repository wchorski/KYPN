import styles from '@styles/footer.module.scss'
import { SiGithub } from 'react-icons/si'
import Link from 'next/link'
import { Section } from '@components/layouts/Section'
import { TawTawPowered } from './TawTawPowered'
import { envs } from '@/envs'


export function Footer() {
  return (
    <footer className={styles.footer}>

      <Section layout={'1_1_1'}>

        <div>
          {envs.NEXT_PUBLIC_COPYWRITE}
        </div>
      </Section>

      <Section layout={'1_2'}>

      </Section>

      <Section layout={'1'}>
        <TawTawPowered />
      </Section>

    </footer>
  )
}
