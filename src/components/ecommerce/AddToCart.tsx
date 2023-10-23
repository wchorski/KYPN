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

export default function AddToCart({ id, session }: { id: string, session:any }) {  

  const [state, setstate] = useState<State>(undefined)


  async function handleButton() {
    // if (!session) return router.push(`/auth/login`)

    try {
      setstate('pending')

      const variables = {
        addToCartId: id,
        productId: id
      }


      // ? gql-request (yoga) request
      const res = await client.request(mutation, variables)

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


const mutation = parse(`
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
