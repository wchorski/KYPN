import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import moneyFormatter from '@/lib/moneyFormatter';

export const ProductThumbnail = ({id, name, description, price, photo}: any) => {

  return (
    <StyledProdThumbnail>

      
      <StyledPriceTag>{moneyFormatter(price)}</StyledPriceTag>
      {photo && (
        <Image 
        src={photo?.image?.url} 
        alt={photo?.altText}
        width={photo?.image?.width}
        height={photo?.image?.height}
        />
      )}
        
      {!photo && <p>No image</p>}

      <p>{description}</p>
      <h3><Link href={`/shop/product/${id}`}>{name}</Link></h3>
    </StyledProdThumbnail>
  )
}

const StyledProdThumbnail = styled.article`
  position: relative;

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