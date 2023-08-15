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

export const ProductThumbnail = ({ id, name, description, price, photo, image }: any) => {

  const session = useUser()

  return (
    <StyledProdThumbnail>

      <ImageDynamic photoIn={image} />


      <div className="container">
        <h3><Link href={`/shop/product/${id}`}>{name}</Link></h3>

        <p className='desc'>{description}</p>

        <div className="menu">
          <AddToCart id={id} />
          <StyledPriceTag>{moneyFormatter(price)}</StyledPriceTag>
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

  .container{
    background-color: var(--c-desaturated);
    background: var(--cg-primary);
    padding: 1rem;
  }

  p.desc{
    flex-grow: 1;
    word-wrap: break-word;
  }

  h3{
    /* margin: 0; */
    /* text-align: center; */
    /* transform: skew(-5deg) rotate(-1deg); */
    /* margin-top: -3rem; */
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);
    /* background: var(--c-primary); */

    a {
      display: inline;
      line-height: 1.3;
      font-size: 2.5rem;
      text-align: center;
      color: var(--c-txt);
      text-decoration: none;
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