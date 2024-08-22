// import { StyledPagination } from '../styles/Pagination.styled'
// import { gql } from '@apollo/client';
// import Head from 'next/head'
import Link from 'next/link'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { envs } from "@/envs";
import styles from "@styles/menus/pagination.module.scss";
import { ReactElement } from 'react';

const perPage = envs.PERPAGE

type PagProps = {
  page: number,
  route: string,
  count:number|undefined,
}

// any type is a bug workaround
// @ts-ignore
export async function Pagination({ page, route = 'NOROUTE', count = 0 }: PagProps):ReactElement<any, any>{

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

  
  if(count <= perPage) return <></>

  return <>

    <nav data-testid='pagination' className={[styles.pagination, 'siteWrapper'].join(' ')}>

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

      <div className={styles.count_wrap}>
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
    </nav>
  </>
}

// export const query = gql`
//   query Query($whereSubPlans: SubscriptionPlanWhereInput!, $whereProducts: ProductWhereInput!, $wherePosts: PostWhereInput!) {
//     subscriptionPlansCount(where: $whereSubPlans)
//     productsCount(where: $whereProducts)
//     postsCount(where: $wherePosts)
//   }
// `
