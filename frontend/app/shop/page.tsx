import { Pagination } from "@components/Pagination";
import ErrorMessage from "@/components/ErrorMessage";

import { PageTHeaderMain } from "@components/layouts/PageTemplates";
import { envs } from "@/envs";
import { Metadata } from "next";
import { ProductsList } from "@components/ecommerce/ProductsList";
import { fetchProducts } from "@lib/fetchdata/fetchProducts";
import { Product } from "@lib/types";

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
  const currPage = Number(page) || 1
  const categoryNames = categories?.split(',') || []

  const {data, error} = await fetchProducts({page: currPage, categoryNames})
  
  const { products } = data

  if(error) return <ErrorMessage error={error}/>

  return (

    <PageTHeaderMain
      header={Header()}
      main={Main({page: currPage, categoryNames, products })}
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
  products:Product[]
}

function Main({page, categoryNames, products}:Main) {

  if(!products) <p> no products found </p>

  return<>
    <Pagination route='/shop' page={(page) || 1} />

    <ProductsList page={page} categoryNames={categoryNames || []} products={products}/>

    <Pagination route='/shop' page={(page) || 1} />
  </>
}
