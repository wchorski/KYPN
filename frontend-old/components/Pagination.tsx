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
  route: string,
}

export const Pagination = ({ page, route = 'NOROUTE' }: PagProps) => {

  // todo make this modular with other Schema types
  const { error, loading, data } = useQuery(QUERY_MULTI_COUNT, {
    variables: {
      whereProducts: { NOT: [
        {
          status: {
            equals: "DRAFT"
          }
        },
        {
          status: {
            equals: "PRIVATE"
          }
        }
      ]},
      whereSubPlans: { NOT: [
        {
          status: {
            equals: "DRAFT"
          }
        },
        {
          status: {
            equals: "PRIVATE"
          }
        }
      ]},
      wherePosts: { NOT: [
        {
          status: {
            equals: "DRAFT"
          }
        },
        {
          status: {
            equals: "PRIVATE"
          }
        }
      ]},
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const handleItemCount = () => {
    if (route === '/shop') return data.productsCount
    if (route === '/blog/posts') return data.postsCount
    if (route === '/shop/subscriptions') return data.subscriptionPlansCount
    return 0
  }

  const pageCount = Math.ceil(handleItemCount() / perPage)

  
  if(handleItemCount() <= perPage) return null

  return (<>
    {/* <Head>
      <title> {page} / {pageCount} </title>
    </Head> */}

    <StyledPagination data-testid='pagination'>


      {/* <Link href={`/shop?page=${page - 1}`} aria-disabled={page <= 1}> */}
      <Link href={`${route}/${page - 1}`} aria-disabled={page <= 1}>
        <MdKeyboardArrowLeft />
        Prev
      </Link>

      <div className='count-cont'>
        <span> {page} of {pageCount}</span>
        <span data-testid='pagination-countTotal'>
          {handleItemCount()} Total
        </span>
      </div>

      <Link href={`${route}/${page + 1}`} aria-disabled={page >= Math.ceil(handleItemCount() / perPage)}>
        Next
        <MdKeyboardArrowRight />
      </Link>

    </StyledPagination>
  </>)
}

export const QUERY_MULTI_COUNT = gql`
  query Query($whereSubPlans: SubscriptionPlanWhereInput!, $whereProducts: ProductWhereInput!, $wherePosts: PostWhereInput!) {
    subscriptionPlansCount(where: $whereSubPlans)
    productsCount(where: $whereProducts)
    postsCount(where: $wherePosts)
  }
`
