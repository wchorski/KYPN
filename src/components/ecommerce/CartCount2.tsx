import styles from '@styles/ecommerce/cart.module.css'
import { MdShoppingBag } from "react-icons/md";


export function CartCount2({ count }: { count: number }) {

  return (
    <div className={styles.carticon}>

      <div className={styles.cartdot}  key={count}>
        <span> {count} </span>
      </div>

      <MdShoppingBag className="cart"/>

    </div>
  )
}
