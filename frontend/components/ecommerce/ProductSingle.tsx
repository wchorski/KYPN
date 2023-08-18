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
import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import { BlockRenderer } from '../blocks/BlocksRenderer';
import { StyledProductArticle } from '../../styles/ecommerce/ProductArticle.styled';

const SITE_URI = process.env.NEXT_PUBLIC_SITE_URI || 'no_url'

export function ProductSingle({ id }: any) {

  const { loading, error, data } = useQuery(
    SINGLE_PRODUCT_QUERY, {
    variables: { where: { id: id } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { name, image, photo, price, description, excerpt, status, categories, tags, author}:Product = data.product

  // todo finish how to add good SEO, maybe learn nextjs /app router paradymn

  return (<>

    <Head>
      <title> {name} </title>
      <meta name="description"        content={excerpt} />
      <meta name='keywords'           content={tags.map(tag => tag.name).join(', ')} />
      <meta name="author"             content={author.name} />
      <meta property="og:title"       content={name} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={SITE_URI + '/shop/product/' + id} />
      <meta property="og:type"        content="article" />
    </Head>

    <StyledProductArticle data-testid='singleProduct'>

      <aside>
        {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }

        <figure className="img-frame">
          <ImageDynamic photoIn={ {url: image, altText: 'subscription image'}}/>
          
        </figure>
      </aside>

      <div className="content">
        <div className="details">
          <h2>{name}</h2>

          <p><span className="price"> {moneyFormatter(price)} </span> / month</p>
 
          <AddToCart id={id}/>

          <div className='description-wrap'>
            <BlockRenderer document={description.document} />
          </div>
        </div>
        
        {/* //todo frontend plan editing */}
        {/* <Link href={{ pathname: '/shop/subscriptionplan/update', query: { id: id }, }}> Edit ✏️ </Link> */}

        <footer>

          <h5 className='categories'>Categories: </h5>
          <CategoriesPool categories={categories} />

          <h5 className='tags'>Tags:</h5>
          <TagsPool tags={tags} />
          
        </footer>

      </div>

    </StyledProductArticle>
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
      excerpt
      description {
        document(hydrateRelationships: true)
      }
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