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
import { Category, Post, Tag } from "@lib/types";
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
  const currPage = Number(page) || 1
  const categoryNames = categories?.split(',') || []
  
  const {data, error} = await fetchPosts({page: currPage, categoryNames})

  const {posts} = data

  if(error) return <ErrorMessage error={error}/>

  return (

    <PageTHeaderMainAside 
      header={Header()}
      main={Main({page: currPage, posts})}
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
  posts:Post[]
}

function Main({posts, page}:Main) {

  if(!posts) <p> no posts found </p>
  
  return<>
    <Pagination route='/blog' page={(page) || 1} />

    <BlogList posts={posts}/>

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
