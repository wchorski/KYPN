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
import { Card } from "@components/layouts/Card";
import { InfoCard } from "@components/blocks/InfoCard";
import { fetchPosts } from "@lib/fetchdata/fetchBlogs";

type Props = {
  params:{
    page:string | string[] | undefined,
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

export default async function BlogFeedPage({ params, searchParams }:Props) {

  const { page, categories } = searchParams
  const categoryNames = categories?.split(',') || []


  return (

    <PageTHeaderMainAside 
      header={Header()}
      main={Main({page: Number(page) || 1, categoryNames})}
      aside={Aside()}
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
  categoryNames:string[]
}

async function Main({page, categoryNames}:Main) {

  const {data, error} = await fetchPosts({page, categoryNames})
  
  if(error) return <ErrorMessage error={error}/>
  
  return<>
    <Pagination route='/blog' page={(page) || 1} />

    <BlogList posts={data?.posts}/>

    <Pagination route='/blog' page={(page) || 1} />
  </>
}

function Aside() {
  
  return<>
    <Card>
      <h2> Categories </h2>
      <CategoriesPool />

    </Card>

    <Card>
      <h2> Tags </h2>
      <TagsPool />
    </Card>
  </>
}
