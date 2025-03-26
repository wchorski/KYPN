// import { StyledPagination } from '../styles/Pagination.styled'
// import { gql } from '@apollo/client';
// import Head from 'next/head'
import { count_wrap, pagination } from "@styles/menus/pagination.module.css";
import Link from 'next/link'
import type { ReactElement } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { envs } from "@/envs";

const perPage = envs.PERPAGE

type PagProps = {
  page: number,
  route: string,
  count:number|undefined,
}

// any type is a bug workaround
// @ts-ignore
export async function Pagination({ page, route = 'NOROUTE', count = 0 }: PagProps):ReactElement<any, any>{

  const pageCount = Math.ceil(count / perPage)


  if(count <= perPage) return <></>

  return <>

    <nav data-testid='pagination' className={[pagination].join(' ')}>

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

      <div className={count_wrap}>
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
