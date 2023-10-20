
import React from 'react'
import Link from 'next/link';
import styles from '@styles/ecommerce/Product.module.scss'
import { ProductDelete } from '@components/ecommerce/ProductDelete';
import AddToCart from '@components/ecommerce/AddToCart';
import { ImageDynamic } from '../elements/ImageDynamic';
import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import { Product } from '@ks/types';
import { PriceTag } from '@components/ecommerce/PriceTag';
import fetchSession from '@lib/fetchdata/fetchSession';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/session';

export async function ProductThumbnail({ id, name, excerpt, price, photo, image, status }: Product) {

  // const session = useSession()
  const session = await getServerSession(nextAuthOptions);

  return (
    <article className={styles.product} >
      
      {status === 'DRAFT' && <p> DRAFT PRODUCT </p> }

      {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }
      <Link href={`/shop/product/${id}`} className='featured_image'>
        <ImageDynamic photoIn={image} />
      </Link>


      <div className="container">
        <Link href={`/shop/product/${id}`} className='title'>
          <h3>{name}</h3>
        </Link>

        <p className='desc'>{excerpt}</p>

        <div className="menu">


          <AddToCart id={id} />
   
          
          {/* {session 
            ? status !== 'OUT_OF_STOCK' 
              ? <AddToCart id={id} />
              : <button disabled={true}> out of stock </button>
              
            : <Link href={`/api/auth/signin`}> Login to shop </Link>
          } */}
          
          <PriceTag price={price}/>
        </div>
      </div>

      {session?.data?.role?.canManageSubscriptionPlans && (
        <div className="menu admin">
          <Link href={{ pathname: '/shop/subscriptions/update', query: { id: id }, }}> Edit ✏️ </Link>
          <ProductDelete id={id}> Delete </ProductDelete>
        </div>
      )}
    </article>
  )
}