import { Pagination } from "@components/Pagination";
import { BlogList } from "@components/blog/BlogList";
import { useRouter } from 'next/navigation'
import styles from "@/styles/blog/Blog.module.scss";
import { gql } from "@apollo/client";
import { getClient } from '@lib/gqlClient';
import ErrorMessage from "@/components/ErrorMessage";
import { QueryLoading } from "@/components/menus/QueryLoading";
import { CategoriesPool } from "@/components/menus/CategoriesPool";
import { TagsPool } from "@/components/menus/TagsPool";
import { PageTHeaderMain } from "@components/layouts/PageTemplates";
import { Category, Tag } from "@lib/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { ProductsList } from "@components/ecommerce/ProductsList";
import { fetchProducts } from "@lib/fetchdata/fetchProducts";

export const revalidate = 5;

type Props = {
  params:{
    page:string | string[] | undefined,
    categories:string | string[] | undefined,
  },
  searchParams: { 
    [key: string]: string | string[] | undefined, 
    categories: string | undefined, 
    page: string | undefined, 
  }
}

export const metadata: Metadata = {
  title: `Shop | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default async function ShopPage({ params, searchParams }:Props) {

  const categoryNames = searchParams.categories?.split(',') || []
  console.log(searchParams);

  return (

    <PageTHeaderMain
      header={Header()}
      main={Main({page: Number(searchParams.page) || 1, categoryNames })}
    />

  )
}

function Header(){

  return (
    <header style={{
      // display: 'none',
    }}>
      <h1> Shop </h1>
    </header>
  )
}

type Main = {
  page:number,
  categoryNames:string[],
}

async function Main({page, categoryNames}:Main) {

  const {data, error} = await fetchProducts({page, categoryNames})
  
  if(error) return <ErrorMessage error={error}/>

  return<>
    <Pagination route='/shop' page={(page) || 1} />

    <ProductsList page={page} categoryNames={categoryNames || []} products={data.products}/>

    <Pagination route='/shop' page={(page) || 1} />
  </>
}
