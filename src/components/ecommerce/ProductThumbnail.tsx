
import React, { ReactElement } from 'react'
import Link from 'next/link';
import styles from '@styles/ecommerce/product.module.scss'
import AddToCartForm from '@components/ecommerce/AddToCartForm';
import { ImageDynamic } from '../elements/ImageDynamic';
// import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import { Product, Session } from '@ks/types';
import { PriceTag } from '@components/ecommerce/PriceTag';
import { envs } from '@/envs';
import { StatusBadge } from '@components/StatusBadge';

type Props = {
  product:Product,
  session:any,
}

// @ts-ignore
export async function ProductThumbnail({product, session}: Props):ReactElement<any, any> {

  // const sesh:Session = {}

  if(!product) return  <p> no prod </p>

  const { id, name, excerpt, price, rental_price,  image, status, isForSale, isForRent } = product


  return (
    <article className={styles.product} >
      
      {(status === 'DRAFT' || status === 'PRIVATE') && <StatusBadge type={'product'} status={status} />}
      {/* <StatusBadge type={'product'} status={status} /> */}

      {status === 'OUT_OF_STOCK' && <p>out of stock</p> }
      <Link href={`/shop/products/${id}`} className='featured_image'>
        <ImageDynamic photoIn={image} />
      </Link>


      <div className="container">
        <Link href={`/shop/products/${id}`} className='title'>
          <h3>{name}</h3>
        </Link>

        <p className='desc'>{excerpt}</p>

        <div className="menu">
          
          {session 
            ? status !== 'OUT_OF_STOCK' 
              ? <>
                {isForSale && <div className='addtocart_wrap'>
                  <AddToCartForm productId={id} sessionId={session.itemId} type={'SALE'}/>
                  <PriceTag price={price} />
                </div>}
                {isForRent && <div className='addtocart_wrap'>
                  <AddToCartForm productId={id} sessionId={session.itemId} type={'RENTAL'}/>
                  <PriceTag price={rental_price} subtext={'/hour'}/>
                </div>}
              </>
              : <button disabled={true}> out of stock </button>
              
            : <Link href={`/login`}> Login to shop </Link>
          }
        </div>
      </div>

      {session?.data?.role?.canManageProducts && (
        <div className="menu admin">
          <Link href={envs.BACKEND_URL + `/products/${id}`} target={'_blank'}> Edit ✏️ </Link>
          {/* <ProductDelete id={id}> Delete </ProductDelete> */}
        </div>
      )}
    </article>
  )
}
