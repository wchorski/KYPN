import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components';
import { QueryLoading } from '../menus/QueryLoading';
import { QueryError } from '../menus/QueryError';
import { perPage } from '../../config';

type ProdProps = {
  page: number
}

export function ProductsList({ page }: ProdProps) {
  // const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)
  const { loading, error, data } = useQuery(GET_PAGE_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />
  // console.log({ data });

  return (
    <StyledProductsList>
      {/* {data.products.length <= 0 && (
        <p> No Products Available </p>
      )} */}
      {data.products.map((prod: any) => {
        // console.log(prod);

        if(prod.status === 'DRAFT') return null

        return (
          <li key={prod.id}>
            <ProductThumbnail {...prod} />

          </li>
        );
      })}
    </StyledProductsList>
  )
}

const StyledProductsList = styled.ul`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-gap: 60px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;

  li{
    background-color: #dcdcdc;
    /* padding: .3em; */
    box-shadow: #0000004d 2px 2px 8px;
    margin: 1em;
    width: 20em;
  }

  img{
    width: 100%;
    height: auto;
  }
`

export const GET_PAGE_PRODUCTS_QUERY = gql`
  query Query($skip: Int!, $take: Int) {
    products(skip: $skip, take: $take) {
      description
      id
      name
      price
      status
      image
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      id
      description
      name
      price
      status
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`