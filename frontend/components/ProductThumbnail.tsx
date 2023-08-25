import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import moneyFormatter from '../lib/moneyFormatter';
import { ProductDelete } from './ecommerce/ProductDelete';
import AddToCart from './ecommerce/AddToCart';
import { handlePhoto } from '../lib/handleProductPhoto';
import { ImageDynamic } from './elements/ImageDynamic';
import { useUser } from './menus/Session';
import { StyledPriceTag } from '../styles/PriceTag.styled';
import { OutOfStockLabel } from './elements/OutOfStockLabel';
import { Product } from '../lib/types';
import { PriceTag } from './ecommerce/PriceTag';

export const ProductThumbnail = ({ id, name, excerpt, price, photo, image, status }: Product) => {

  const session = useUser()

  return (
    <StyledProdThumbnail>

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
    </StyledProdThumbnail>
  )
}

const StyledProdThumbnail = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  a.featured_image img{
    height: 100%;
    min-height: 14em;
    min-height: 14em;
    box-shadow: var(--boxs-1);
    transition: all .3s ease-in-out;
  }

  .container{
    /* background-color: var(--c-light); */
    background-color: var(--c-txt-cont);
    /* background: var(--cg-primary); */
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  p.desc{
    flex-grow: 1;
    word-wrap: break-word;
  }

  a.featured_image{
    &:hover, &:focus{

      img{
        transform: scale(1.01);
        filter: contrast(1.2);
      }
    }
  }
  a.title{
    display: inline;
    line-height: 1.3;
    font-size: 2rem;
    color: var(--c-txt);
    text-decoration: none;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);

    h3{
      margin: 0;
    }

    &:hover, &:focus{
      color: var(--c-light);
    }
  }
  

  .menu{
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
  .admin{
    background-color: var(--c-dark);
    padding: 1rem;
  }
`

// const StyledPriceTag = styled.span`
//   background: var(--c-primary);
//   transform: rotate(3deg);
//   color: white;
//   font-weight: 600;
//   padding: 5px;
//   line-height: 1;
//   font-size: 3rem;
//   display: inline-block;
//   position: absolute;
//   top: -3px;
//   right: -3px;
// `;