import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import moneyFormatter from '../../lib/moneyFormatter';
import { ProductDelete } from '../ecommerce/ProductDelete';
import AddToCart from '../ecommerce/AddToCart';
import { handlePhoto } from '../../lib/handleProductPhoto';
import { ImageDynamic } from '../elements/ImageDynamic';
import { SubscriptionPlan } from '../../lib/types';
import { useUser } from '../menus/Session';
import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import { BlockRenderer } from '../blocks/BlocksRenderer';
import { StyledPriceTag } from '../../styles/PriceTag.styled';

type Props = {
  item:SubscriptionPlan
}

export const SubscriptionThumbnail = ({ item }: Props) => {

  const session = useUser()

  const {price, photo, status, image, id, name, excerpt, billing_interval} = item

  return (
    <StyledProdThumbnail>
      
      {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }
      <Link href={`/shop/subscriptionplan/${id}`} className='featured_image'>
        <ImageDynamic photoIn={{url: image, altText: `${name} product feature image`,}} className='featured'/>
      </Link>

      <Link href={`/shop/subscriptionplan/${id}`} className='title'>
        <h3>{name}</h3>
      </Link>
      
      <div className="container">
          <div className='excerpt-wrap'>
            {/* <BlockRenderer document={excerpt.document} /> */}
            <p className='excerpt'>{excerpt}</p>
          </div>

        <div className="menu">
          <Link href={`/shop/subscriptionplan/${id}`} className='cta'> View More </Link>
          <StyledPriceTag> {moneyFormatter(price)} <small> / {billing_interval} </small> </StyledPriceTag>
        </div>

      </div>

      {session?.role?.canManageSubscriptionPlans && (
        <div className="menu admin">
          <Link href={{ pathname: '/shop/subscriptions/update', query: { id: id }, }}> Edit ✏️ </Link>
          <ProductDelete id={id}> Delete </ProductDelete>
        </div>
      )}

    </StyledProdThumbnail>
  )
}

const StyledProdThumbnail = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  p.desc{
    flex-grow: 1;
    display: -webkit-box;
    margin: 2rem 0;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  a.featured_image img{
    transition: all .3s;
    min-height: 14em;
  }

  a.featured_image{
    &:hover, &:focus{

      img{
        transform: scale(0.99);
        filter: contrast(0.7);
      }
    }
  }
  
  a.title {
    display: block;
    line-height: 1.3;
    font-size: 2.5rem;
    text-decoration: none;
    color: white;

    &:hover, &:focus{
      color: var(--c-light);
    }

    h3{
      margin: 0;
      background: var(--c-desaturated);
      box-shadow: #00000049 1px -1px 2px;
      padding: 0 1rem;
      width: fit-content;
      border-radius: 0 var(--br-dull) 0 0;
      /* text-align: center; */
      /* transform: skew(-5deg) rotate(-1deg); */
      margin-top: -3rem;
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);
  
      text-wrap: balance;
      transform: translateY(1rem);
    }
  }


  .container{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
    background-color: var(--c-desaturated);
  }

  p.excerpt{
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  a.cta{
    padding: 1rem;
    border: solid 2px var(--c-light);
    border-radius: var(--br-dull);
    text-decoration: none;

    &:hover, &:focus{
      background-color: var(--c-light);
      color: var(--c-desaturated)
    }
  }

  .menu{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: auto;
    align-items: center;
  }

  .admin{
    background-color: var(--c-dark);
    padding: 1rem;
  }

`