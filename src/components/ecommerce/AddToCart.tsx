'use client'
import { MdShoppingBag } from 'react-icons/md';
import { TbCheck, TbExclamationCircle, TbLoader  } from 'react-icons/tb';

import { useState } from 'react';
import stylesAnim from '@styles/eyecandy/SpinCycle.module.scss'
import styles from '@styles/ecommerce/cart.module.scss'
import { client } from '@lib/request';
import { useCart } from '@components/hooks/CartStateContext';

function plainJSON(json:any) {
  const fixed = JSON.parse(JSON.stringify(json))
  return fixed
}
const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

type State = 'loading'|'pending'|'error'|'out_of_stock'|'success'|undefined

type Props = {
  productId:string,
  sessionId:string,
}

export default function AddToCart({ productId, sessionId }: { productId:string, sessionId:string }) {  

  const [state, setstate] = useState<State>(undefined)
  const { getUserCart, } = useCart()


  async function handleButton() {
    // if (!session) return router.push(`/auth`)

    try {
      setstate('pending')

      const variables = {
        addToCartId: productId,
        productId: productId
      }
      
      // ? gql-request (yoga) request
      // const res = await client.request(mutation, variables)
      const res = await fetch(`/api/addToCart`, {
        method: 'POST',
        body: JSON.stringify({variables})
      })
      const data = await res.json()
      // console.log({data})

      await delay(500)
      setstate('success')
      await delay(500)
      setstate(undefined)

      console.log('+++ update user cart');
      getUserCart(sessionId)
      
    } catch (error) {
      setstate('error')
      console.log('!!! addtocart error: ', error);
    } 

  }

  const renderIcon = (state:State) => {

    switch (state) {
      case 'pending':
        return <TbLoader className={stylesAnim.spin}/>
        
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
      disabled={(state === 'pending')} 
      onClick={e => handleButton()}
      className={styles.addtocart + ' button'}
    >
      <span>
        Add To Cart 
        <span style={{marginRight: 'auto'}} className='state'>{renderIcon(state)}</span> 
      </span>
      
    </button>
    
    </>);
}
