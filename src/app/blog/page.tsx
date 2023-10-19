import { Pagination } from "@components/Pagination";
import { BlogList } from "@components/blog/BlogList";
import styles from "@/styles/blog/Blog.module.scss";
import ErrorMessage from "@components/ErrorMessage";
import { CategoriesPool } from "@components/menus/CategoriesPool";
import { TagsPool } from "@components/menus/TagsPool";
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Category, Post, Tag } from "@ks/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { Card } from "@components/layouts/Card";
import { InfoCard } from "@components/blocks/InfoCard";
import { fetchPosts } from "@lib/fetchdata/fetchPosts";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";

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

  const session = await getServerSession(nextAuthOptions);
  const { page, categories } = searchParams
  const currPage = Number(page) || 1
  const categoryNames = categories?.split(',') || []
  
  const { posts, count, error } = await fetchPosts(categoryNames, currPage, session )
  

  if(error) return <ErrorMessage error={error}/>

  return (

    <PageTHeaderMainAside 
      header={Header()}
      main={Main({page: currPage, posts, count})}
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
  posts:Post[],
  count:number,
}

function Main({posts, page, count}:Main) {

  if(!posts) <p> no posts found </p>
  
  return<>
    <Pagination route='/blog' page={(page) || 1} count={count}/>

    <BlogList posts={posts}/>

    <Pagination route='/blog' page={(page) || 1} count={count}/>
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
