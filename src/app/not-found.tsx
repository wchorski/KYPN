'use client'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import Link from 'next/link'
import { Metadata } from 'next';
import { envs } from '@/envs';
import { useRouter } from "next/navigation";
import { Section } from '@components/layouts/Section'
import styles from '../styles/elements/404.module.scss'
import { ReactNode } from 'react';

type Props = {
  children?:ReactNode
}

export const metadata: Metadata = {
  title: `404 | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default function NoDataFoundError404({children}:Props) {
  return (<>

    <PageTHeaderMain 
      header={Header()}
      main={Main(children)}
    />
  </>)
}

function Header() {
  

  return<>
    <Section layout={'1'}>

   
        <h1
          style={{
            textAlign: 'center',
            marginInline: 'auto',
          }}
        > 
          404 
        </h1>
     


    </Section>
  </>
}

function Main(children:ReactNode){

  const router = useRouter()

  // function handleLink(e:any){
  //   e.preventDefaults()
  //   router.back()
  // }

  return <>
    <center>
      <p className={styles.watermark}> 
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>
      
      {children}
      {!children && <p> This page does not exist.  </p>}

      <Link 
        href={`/`} 
        // onClick={handleLink}
      > 
        ⇠ Return to previous Page 
      </Link> 

    </center>
  </>
}