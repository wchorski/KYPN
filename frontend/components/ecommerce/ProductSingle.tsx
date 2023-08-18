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
import { ImageDynamic } from '../elements/ImageDynamic';
import { Metadata } from 'next';
import { Product } from '../../lib/types';

const SITE_URI = process.env.NEXT_PUBLIC_SITE_URI || 'no_url'

export function ProductSingle({ id }: any) {

  const { loading, error, data } = useQuery(
    SINGLE_PRODUCT_QUERY, {
    variables: { where: { id: id } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { name, image, photo, price, description, status, categories, tags, author}:Product = data.product

  // todo finish how to add good SEO, maybe learn nextjs /app router paradymn

  return (<>

    <Head>
      <title> {name} </title>
      <meta name="description" content={description} />
      <meta name='keywords' content={tags.map(tag => tag.name).join(', ')} />
      <meta name="author" content={author.name} />
      <meta property="og:title"       content={name} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url" content={SITE_URI + '/shop/product/' + id} />
      <meta property="og:type" content="article" />
    </Head>

    <StyledProductSingle data-testid='singleProduct'>

      <figure>
        <ImageDynamic photoIn={{url: image, altText: `${name} featured Image`} || photo}/>
      </figure>

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
      image
      # photo {
      #   altText
      #   id
      #   image {
      #     extension
      #     filesize
      #     id
      #     height
      #     url
      #     width
      #   }
      # }
      price
      status
      description
      author{
        id
        name
      }
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

  figure{
    margin: 0;
    
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
    }
  }

`