import Head from 'next/head'
import styles from '../styles/elements/404.module.scss'
import { envvars } from '../lib/envvars'

export default function Error404() {
  return (<>
    <Head>
      <title> Account | {envvars.SITE_TITLE} </title>
      <meta name="description"        content={'reference your account tickets, bookings, downloads, and more'} />
    </Head>
    <center className={styles.wrapper}>
      <h1> 404 </h1>
      <p className={styles.watermark}> 
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>
      <p> This page does not exist </p>
    </center>
  </>)
}
