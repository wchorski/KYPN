import { gql, useMutation } from "@apollo/client"
import styles from '@styles/ecommerce/cart.module.scss'


export default function CartRemoveItem({id}:{id:string}) {

  const [mutate, {loading, error, data}] = useMutation(MUTATE_CART_REMOVE_ITEM)

  async function handleMutation() {
    const res = await mutate({
      variables: {
        where: {
          id: id
        }
      },
      update: handleUpdate,
      // TODO ep 50, will come back to this. fix cache issues
      // optimisticResponse: {
      //   __typename: 'CartItem',
      //   id: id,
      // }
    })

    // console.log({res})
    
  }

  function handleUpdate(cache:any, payload:any) {
    cache.evict(cache.identify(payload.data.deleteCartItem))
  }
    
  return (
    <button 
      className={styles.remove}  
      type="button" 
      title='Remove this item from cart'
      disabled={loading}
      onClick={handleMutation}
    >
      &times;
    </button>
  )
}

const MUTATE_CART_REMOVE_ITEM = gql`
  mutation DeleteCartItem($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      id
      quantity
    }
  }
`
