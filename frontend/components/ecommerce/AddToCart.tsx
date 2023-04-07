import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useUser } from "../../components/menus/Session";
import { MdShoppingBag } from 'react-icons/md';
import { QUERY_USER_CURRENT } from '../menus/Session';


export default function AddToCart({ id }: { id: string }) {

  const session = useUser()
  const router = useRouter()
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION)


  async function handleButton() {

    if (!session) return router.push(`/auth/login`)

    const res = await addToCart({
      variables: {
        addToCartId: id,
        productId: id
      },
      refetchQueries: [{ query: QUERY_USER_CURRENT }],
    }).catch(console.error)

    // console.log({res});

  }

  return (
    <button disabled={loading} type="button" onClick={e => handleButton()}>
      Add{loading && 'ing'} To Cart <MdShoppingBag />
    </button>
  );
}

const ADD_TO_CART_MUTATION = gql`
  mutation Mutation($addToCartId: ID!, $productId: ID) {
    addToCart(id: $addToCartId, productID: $productId) {
      id
      quantity
      product {
        name
      }
    }
  }
`
