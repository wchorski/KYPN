import { ProductThumbnail } from '../../components/ProductThumbnail';
import moneyFormatter from '../../lib/moneyFormatter';

import Image from 'next/image';

import { StyledPriceTag } from "../../styles/PriceTag.styled";
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import AddToCart from './AddToCart';
import { handlePhoto } from '../../lib/handleProductPhoto';
import { gql, useQuery } from '@apollo/client';
import { QueryLoading } from '../menus/QueryLoading';
import ErrorMessage from '../ErrorMessage';
import { TagsPool } from '../menus/TagsPool';
import { CategoriesPool } from '../menus/CategoriesPool';


export function ProductSingle({ id }: any) {

  const { loading, error, data } = useQuery(
    SINGLE_PRODUCT_QUERY, {
    variables: { where: { id: id } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { name, photo, price, description, status, categories, tags } = data.product


  return (<>

    <Head>
      <title>Sick Fits | {name}</title>
    </Head>

    <StyledProductSingle data-testid='singleProduct'>
      <picture className="img-frame">
        <Image
          priority
          src={handlePhoto(photo).image?.url}
          alt={handlePhoto(photo).altText}
          width={handlePhoto(photo).image?.width}
          height={handlePhoto(photo).image?.height}
        />
      </picture>

      <div className="details">
        <h2>{name}</h2>

        <span><StyledPriceTag> {moneyFormatter(price)} </StyledPriceTag></span>
        <span>status: {status}</span>

        <p>{description}</p>
      </div>
      <AddToCart id={id} />
      <Link href={{ pathname: '/shop/product/update', query: { id: id }, }}> Edit ✏️ </Link>

      <footer>

        <h2>Categories: </h2>
        <CategoriesPool categories={categories} />

        <h2>Tags:</h2>
        <TagsPool tags={tags} />

      </footer>

    </StyledProductSingle>
  </>)
}

export const SINGLE_PRODUCT_QUERY = gql`
  query Query($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      name
      photo {
        altText
        id
        image {
          extension
          filesize
          id
          height
          url
          width
        }
      }
      price
      status
      description
      tags {
        name
        id
      }
      categories {
        name
        id
      }
    }
  }
`

const StyledProductSingle = styled.article`
  position: relative;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: start;
  gap: 2em;

  picture{
    overflow: auto;
    display: grid;
    grid-template-rows: minmax(0,1fr) auto;
    resize: both;
    border: 2px dashed var(--c-1);
    
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
    }
  }

`