'use client'
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useSession } from "../menus/Session";
import { MdShoppingBag } from 'react-icons/md';
import { TbCheck, TbExclamationCircle, TbQuestionMark, TbLoader  } from 'react-icons/tb';
import { QUERY_USER_CURRENT } from '../menus/Session';
import { useState } from 'react';
import styles from '../../styles/eyecandy/SpinCycle.module.scss'
import stylesButton from "@/styles/ecommerce/AddToCart.module.scss";

const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

type State = 'loading'|'pending'|'error'|'out_of_stock'|'success'|undefined

export default function AddToCart({ id }: { id: string }) {

  const [state, setstate] = useState<State>(undefined)
  const session = useSession()
  const router = useRouter()
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION)


  async function handleButton() {

    if (!session) return router.push(`/auth/login`)

    try {

      setstate('pending')
      
      const res = await addToCart({
        variables: {
          addToCartId: id,
          productId: id
        },
        refetchQueries: [{ query: QUERY_USER_CURRENT }],
      })

      await delay(500)

      setstate('success')

      await delay(500)

      setstate(undefined)
      
    } catch (error) {
      setstate('error')
      console.warn('addtocart error: ', error);
    }


    // console.log({res});

  }

  const renderIcon = (state:State) => {

    switch (state) {
      case 'pending':
        return <TbLoader className={styles.spin}/>
        
      case 'success':
        return <TbCheck />

      case 'error':
        return <TbExclamationCircle />
    
      default:
        return <MdShoppingBag /> 
    }
  }

  return (<>
    <button 
      type="button" 
      disabled={loading || state !== undefined} 
      onClick={e => handleButton()}
      className={' addtocart' + ' button'}
    >
      <span>Add To Cart <span style={{marginRight: 'auto'}} className='state'>{renderIcon(state)}</span> </span>
      
    </button>
    
    </>);
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
