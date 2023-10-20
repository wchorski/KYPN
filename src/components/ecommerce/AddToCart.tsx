'use client'
import { gql } from 'graphql-request';
import { MdShoppingBag } from 'react-icons/md';
import { TbCheck, TbExclamationCircle, TbLoader  } from 'react-icons/tb';

import { useState } from 'react';
import styles from '@styles/eyecandy/SpinCycle.module.scss'
import { parse } from 'graphql';
import { client } from '@lib/request';
import { Session } from '@ks/types';


const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

type State = 'loading'|'pending'|'error'|'out_of_stock'|'success'|undefined

export default function AddToCart({ id, session }: { id: string, session:Session }) {  

  const [state, setstate] = useState<State>(undefined)
  // const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION)


  async function handleButton() {
    // if (!session) return router.push(`/auth/login`)

    try {
      setstate('pending')

      const variables = {
        addToCartId: id,
        productId: id
      }

      // ? yoga request
      const res = await client.request(mutation, variables)
      
      // ? apollo request
      // const res = await addToCart({
      //   variables: {
      //     addToCartId: id,
      //     productId: id
      //   },
      //   // refetchQueries: [{ query: QUERY_USER_CURRENT }],
      // })

      // ? next api
      // const res  = await fetch(`/api/addToCart`, {
      //   method: 'POST',
      //   body: JSON.stringify(variables)
      // })


      console.log(res);

      await delay(500)
      setstate('success')
      await delay(500)
      setstate(undefined)
      
    } catch (error) {
      setstate('error')
      console.log('!!! addtocart error: ', error);
    }

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
      disabled={(state === 'loading') ? true : false} 
      onClick={e => handleButton()}
      className={' addtocart' + ' button'}
    >
      <span>Add To Cart <span style={{marginRight: 'auto'}} className='state'>{renderIcon(state)}</span> </span>
      
    </button>
    
    </>);
}

const mutation = parse(gql`
  mutation addToCart($addToCartId: ID!, $productId: ID) {
    addToCart(id: $addToCartId, productId: $productId) {
      id
      quantity
      product {
        name
      }
    }
  }
`)
