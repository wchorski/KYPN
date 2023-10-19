// import { StyledPagination } from '../styles/Pagination.styled'
// import { gql } from '@apollo/client';
// import Head from 'next/head'
import Link from 'next/link'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import ErrorMessage from './ErrorMessage';
// import { QueryLoading } from './menus/QueryLoading';
import { envs } from "@/envs";
// import { getClient } from '@lib/gqlClient';
import styles from "@styles/menus/pagination.module.scss";

const perPage = envs.PERPAGE

type PagProps = {
  page: number,
  route: string,
  count:number,
}

export async function Pagination({ page, route = 'NOROUTE', count }: PagProps){

  // old way when i was fetching from client
  // const client = getClient()
  // const { data, error, loading } = await client.query({query, 
  //   variables: {
  //     whereProducts: { NOT: [
  //       {
  //         status: {
  //           equals: "DRAFT"
  //         }
  //       },
  //       {
  //         status: {
  //           equals: "PRIVATE"
  //         }
  //       }
  //     ]},
  //     whereSubPlans: { NOT: [
  //       {
  //         status: {
  //           equals: "DRAFT"
  //         }
  //       },
  //       {
  //         status: {
  //           equals: "PRIVATE"
  //         }
  //       }
  //     ]},
  //     wherePosts: { NOT: [
  //       {
  //         status: {
  //           equals: "DRAFT"
  //         }
  //       },
  //       {
  //         status: {
  //           equals: "PRIVATE"
  //         }
  //       }
  //     ]},
  //   }
  // })
  // todo make this modular with other Schema types

  // if (loading) return <QueryLoading />
  // if (error) return <ErrorMessage error={error} />

  // const handleItemCount = () => {
  //   if (route === '/shop') return data.productsCount
  //   if (route === '/blog') return data.postsCount
  //   if (route === '/shop/subscriptions') return data.subscriptionPlansCount
  //   return 0
  // }

  const pageCount = Math.ceil(count / perPage)

  
  if(count <= perPage) return null

  return (<>
    {/* <Head>
      <title> {page} / {pageCount} </title>
    </Head> */}

    <div data-testid='pagination' className={[styles.pagination, 'siteWrapper'].join(' ')}>


      {/* <Link href={`/shop?page=${page - 1}`} aria-disabled={page <= 1}> */}

      {page <= 1 ? (
        <span className='disabled' aria-disabled={true}>
          <MdKeyboardArrowLeft />
          Prev
        </span>
      ) : (
        <Link href={`${route}?page=${page - 1}`} >
          <MdKeyboardArrowLeft />
          Prev
        </Link>
      )}

      <div className='count-cont'>
        <span> {page} of {pageCount}</span>
        <span data-testid='pagination-countTotal'>
          {count} Total
        </span>
      </div>

      {(page >= Math.ceil(count / perPage)) ? (
        <span aria-disabled={true}>
          Next
          <MdKeyboardArrowRight />
        </span>
      ) : (
        <Link href={`${route}?page=${page + 1}`} >
          Next
          <MdKeyboardArrowRight />
        </Link>
      )}



    </div>
  </>)
}

// export const query = gql`
//   query Query($whereSubPlans: SubscriptionPlanWhereInput!, $whereProducts: ProductWhereInput!, $wherePosts: PostWhereInput!) {
//     subscriptionPlansCount(where: $whereSubPlans)
//     productsCount(where: $whereProducts)
//     postsCount(where: $wherePosts)
//   }
// `
