import { StyledPagination } from '../styles/Pagination.styled'
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head'
import Link from 'next/link'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ErrorMessage from './ErrorMessage';
import { QueryLoading } from './menus/QueryLoading';
import { perPage } from "../config";

type PagProps = {
  page: number,
}

export const Pagination = ({ page }: PagProps) => {

  const { error, loading, data } = useQuery(QUERY_PRODUCTS_COUNT)

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  // console.log('pag data, ', data);


  const pageCount = Math.ceil(data.productsCount / perPage)

  return (<>
    <Head>
      <title>Sick Fits - {page} / {pageCount} </title>
    </Head>

    <StyledPagination data-testid='pagination'>


      {/* <Link href={`/shop?page=${page - 1}`} aria-disabled={page <= 1}> */}
      <Link href={`/shop/${page - 1}`} aria-disabled={page <= 1}>
        <MdKeyboardArrowLeft />
        Prev
      </Link>

      <div className='count-cont'>
        <span> {page} of {pageCount}</span>
        <span data-testid='pagination-countTotal'>
          {data.productsCount} Total Products
        </span>
      </div>

      {/* <Link href={`/shop?page=${page + 1}`} aria-disabled={page > data.productsCount}> */}
      <Link href={`/shop/${page + 1}`} aria-disabled={page >= Math.ceil(data.productsCount / perPage)}>
        Next
        <MdKeyboardArrowRight />
      </Link>

    </StyledPagination>
  </>)
}

export const QUERY_PRODUCTS_COUNT = gql`
  query Query {
    productsCount
  }
`