import { Pagination } from "@components/Pagination";
import ErrorMessage from "@/components/ErrorMessage";

import { PageTHeaderMain } from "@components/layouts/PageTemplates";
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

  const { page, categories } = searchParams
  const categoryNames = categories?.split(',') || []

  return (

    <PageTHeaderMain
      header={Header()}
      main={Main({page: Number(page) || 1, categoryNames })}
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
