import styles from '@styles/blocs/colorswatch.module.scss'


export function ColorSwatch() {
  return (
    <div className={styles.swatch} >
      <div className={styles.box}>1</div>
      <div className={styles.box}>2</div>
      <div className={styles.box}>3</div>
      <div className={styles.box}>4</div>
      <div className={styles.box}>5</div>
      <div className={styles.box}>6</div>
      <div className={styles.box}>7</div>
      <div className={styles.box}>8 color 3 light</div>
      <div className={styles.box}>9 color 3 dark </div>
    </div>
  )
}

// srgb, lab, oklch
