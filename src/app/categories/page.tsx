import ErrorMessage from "@components/ErrorMessage";
import { PageTHeaderMain, PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Category, Post, Tag } from "@ks/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { Section } from "@components/layouts/Section";
import Link from "next/link";
import fetchCategories from "@lib/fetchdata/fetchCats";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchPosts } from "@lib/fetchdata/fetchPosts";
import { CategoriesPool } from "@components/menus/CategoriesPool";
import { PostsList } from "@components/blocks/PostsList";
import { BlogList } from "@components/blog/BlogList";

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
  title: `Categoires | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default async function CategoriesPage({ params, searchParams }:Props) {

  const session = await getServerSession(nextAuthOptions);
  const { page, categories } = searchParams
  const currPage = Number(page) || 1
  const categoryIds = categories?.split(',') || []
  const { posts, count, error } = await fetchPosts(currPage, categoryIds, session )

  if(error) return <ErrorMessage error={error}/>

  return <>
    <PageTHeaderMain 
      header={Header()}
      main={Main({posts})}
    />

  </>
}

function Header(){

  return <>
    <Section layout={'1'}>
      <h1> Categories </h1>
    </Section>
  </>
}

type Main = {
  posts:Post[]|undefined,
}

function Main({posts}:Main) {
  
  return<>
    <Section layout='1'>
      <CategoriesPool />
      {posts && <BlogList posts={posts} />}
    </Section>
  </>
}

// function Aside() {
  
//   return<>
//     <Card>
//       <h2> Categories </h2>
//       <CategoriesPool />

//     </Card>

//     <Card>
//       <h2> Tags </h2>
//       <TagsPool />
//     </Card>
//   </>
// }
