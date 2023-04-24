import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import moneyFormatter from '../lib/moneyFormatter';
import { ProductDelete } from './ecommerce/ProductDelete';
import AddToCart from './ecommerce/AddToCart';
import { handlePhoto } from '../lib/handleProductPhoto';
import { ImageDynamic } from './elements/ImageDynamic';

export const ProductThumbnail = ({ id, name, description, price, photo }: any) => {


  return (
    <StyledProdThumbnail>


      <StyledPriceTag>{moneyFormatter(price)}</StyledPriceTag>

      <ImageDynamic photoIn={photo} />

      <h3><Link href={`/shop/product/${id}`}>{name}</Link></h3>

      <p className='desc'>{description}</p>

      <div className="menu admin">
        <Link href={{ pathname: '/shop/product/update', query: { id: id }, }}> Edit ✏️ </Link>
        <AddToCart id={id} />
        <ProductDelete id={id}> Delete </ProductDelete>
      </div>
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
  }

  h3{
    margin: 0 1rem;
    text-align: center;
    transform: skew(-5deg) rotate(-1deg);
    margin-top: -3rem;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);
    a {
      background: var(--c-1);
      display: inline;
      line-height: 1.3;
      font-size: 4rem;
      text-align: center;
      color: white;
      padding: 0 1rem;
    }
  }

  .menu{
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
`

const StyledPriceTag = styled.span`
  background: var(--c-3);
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;