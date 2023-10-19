import styles from '@styles/ecommerce/Product.module.scss'

export function OutOfStockLabel() {
  return (
    <span className={styles.outofstock} >
      Out of Stock
    </span>
  )
}
