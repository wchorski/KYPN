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


export default function ProductSingle({id}: any) {

  const { loading, error, data } = useQuery(
    SINGLE_PRODUCT_QUERY, {
    variables: { where: { id: id}}
  })
  console.log(data);

  const {name, photo, price, status, description} = data.product
  
  
  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  return (<>

    <Head>
      <title>Sick Fits | {name}</title>
    </Head>

    <StyledProductPage>
      <Image src={photo.image.url} alt={photo.altText} width={photo.image.width} height={photo.image.height}/>
      
      <div className="details">
        <h2>{name}</h2>

        <span><StyledPriceTag> {moneyFormatter(price)} </StyledPriceTag></span>
        <span>status: {status}</span>

        <p>{description}</p>
      </div>

    </StyledProductPage>
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

const StyledProductPage = styled.article`
  position: relative;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2em

  img{
    width: 100%;
    object-fit: contain;
  }
`