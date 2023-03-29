import { QueryError } from '@/components/menus/QueryError';
import { QueryLoading } from '@/components/menus/QueryLoading';
import { ProductThumbnail } from '@/components/ProductThumbnail';
import moneyFormatter from '@/lib/moneyFormatter';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import ErrorMessage from '../ErrorMessage';
import { StyledPriceTag } from "@/styles/PriceTag.styled";
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';


export default function ProductSingle({id}: any) {

  const { loading, error, data:{ product: {name, photo, price, status, description}} } = useQuery(
    SINGLE_PRODUCT_QUERY, {
    variables: { where: { id: id}}
  })
  // console.log(data);

  // const {name, photo, price, status, description} = data.product //? doesn't work, but above is how you destructure
  
  
  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  return (<>

    <Head>
      <title>Sick Fits | {name}</title>
    </Head>

    <StyledProductSingle>
      <picture className="img-frame">
        <Image src={photo.image.url} alt={photo.altText} width={photo.image.width} height={photo.image.height}/>
      </picture>
      
      <div className="details">
        <h2>{name}</h2>

        <span><StyledPriceTag> {moneyFormatter(price)} </StyledPriceTag></span>
        <span>status: {status}</span>

        <p>{description}</p>
      </div>

      <Link href={{pathname: '/shop/product/update', query: {id: id},}}> Edit ✏️ </Link>

    </StyledProductSingle>
  </>)
}

const SINGLE_PRODUCT_QUERY = gql`
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