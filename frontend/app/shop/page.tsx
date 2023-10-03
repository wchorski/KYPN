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
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Category, Tag } from "@lib/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { ProductsList } from "@components/ecommerce/ProductsList";

type Props = {
  params:{
    page:string | string[] | undefined,
  },
}

export const metadata: Metadata = {
  title: `Shop | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default async function ShopPage({ params }:Props) {

  const client = getClient()
  const { data, error, loading } = await client.query({query})

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const {categories, tags} = data

  return (

    <PageTHeaderMainAside 
      header={Header()}
      main={Main({page: Number(params.page)})}
      aside={Aside({categories, tags})}
    />

  )
}

function Header(){

  return (
    <header style={{
      // display: 'none',
    }}>
      <h1> Blog </h1>
    </header>
  )
}

type Main = {
  page:number,
}

function Main({page}:Main) {
  
  return<>
    <Pagination route='/shop' page={(page) || 1} />

    <ProductsList page={Number(page) || 1} />

    <Pagination route='/shop' page={(page) || 1} />
  </>
}

type Aside = {
  categories:Category[],
  tags:Tag[],
}

function Aside({categories, tags}:Aside) {
  
  return<>
    <div className="widget">
      <h2> Categories </h2>
      <CategoriesPool />

      <h2> Tags </h2>
      <TagsPool />
    </div>
  </>
}

const query = gql`
  query Query {
    categories {
      id
      name
    }
    tags {
      id
      name
    }
  }
`