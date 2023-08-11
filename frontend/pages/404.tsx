import styles from '../styles/elements/404.module.scss'

export default function Error404() {
  return (<>
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
