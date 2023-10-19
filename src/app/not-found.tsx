'use client'
import styles from '../styles/elements/404.module.scss'
import { envvars } from '../lib/envvars'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import Link from 'next/link'
import { Metadata } from 'next';
import { envs } from '@/envs';
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: `404 | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default function Error404() {
  return (<>

    <PageTHeaderMain 
      header={Header()}
      main={Main()}
    />
  </>)
}

function Header() {
  
  return (
    <center>
      <header>
        <h1> 404 </h1>
      </header>

    </center>
  )
}

function Main(){

  const router = useRouter()

  function handleLink(e:any){
    e.preventDefaults()
    router.back()
  }

  return <>
    <center>
      <p className={styles.watermark}> 
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>

      <p> This page does not exist.  <br /> <br />
        <Link 
          href={`/`} 
          onClick={handleLink}
        > 
          ⇠ Return to previous Page 
        </Link> 
      </p>
    </center>
  </>
}