import styles from '@styles/ecommerce/product.module.scss'

export function OutOfStockLabel() {
  return (
    <span className={styles.outofstock} >
      Out of Stock
    </span>
  )
}
