import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from '@styles/ecommerce/Product.module.scss'
import moneyFormatter from '../../lib/moneyFormatter';
import { ProductDelete } from '@components/ecommerce/ProductDelete';
import AddToCart from '@components/ecommerce/AddToCart';
import { handlePhoto } from '../../lib/handleProductPhoto';
import { ImageDynamic } from '../elements/ImageDynamic';
import { useUser } from '@components/menus/Session';
import { StyledPriceTag } from '../../styles/PriceTag.styled';
import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import { Product } from '../../lib/types';
import { PriceTag } from '@components/ecommerce/PriceTag';

export const ProductThumbnail = ({ id, name, excerpt, price, photo, image, status }: Product) => {

  const session = useUser()

  return (
    <article className={styles.product} >

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
          {session 
            ? status !== 'OUT_OF_STOCK' 
              ? <AddToCart id={id} />
              : <button disabled={true}> out of stock </button>
              
            : <button disabled={true}> Login to shop </button>
          }
          
          <PriceTag price={price}/>
        </div>
      </div>

      {session?.role?.canManageSubscriptionPlans && (
        <div className="menu admin">
          <Link href={{ pathname: '/shop/subscriptions/update', query: { id: id }, }}> Edit ✏️ </Link>
          <ProductDelete id={id}> Delete </ProductDelete>
        </div>
      )}
    </article>
  )
}