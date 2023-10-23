import { Pagination } from "@components/Pagination";
import { BlogList } from "@components/blog/BlogList";
import styles from "@/styles/blog/Blog.module.scss";
import ErrorMessage from "@components/ErrorMessage";
import { CategoriesPool } from "@components/menus/CategoriesPool";
import { TagsPool } from "@components/menus/TagsPool";
import { PageTHeaderMain, PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Category, Post, Tag } from "@ks/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { Card } from "@components/layouts/Card";
import { InfoCard } from "@components/blocks/InfoCard";
import { fetchPosts } from "@lib/fetchdata/fetchPosts";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import fetchTags from "@lib/fetchdata/fetchTags";
import { Section } from "@components/layouts/Section";
import Link from "next/link";
import fetchCategories from "@lib/fetchdata/fetchCats";


export const metadata: Metadata = {
  title: `Tags | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default async function CategoriesPage() {

  const { categories, error } = await fetchCategories()

  if(error) return <ErrorMessage error={error}/>

  return <>
    <PageTHeaderMain 
      header={Header()}
      main={Main({categories})}
    />

  </>
}

function Header(){

  return (
    <header style={{
      // display: 'none',
    }}>
      <h1> Categories </h1>
    </header>
  )
}

type Main = {
  categories:Category[]|undefined,
}

function Main({categories}:Main) {

  if(!categories) <p> no categories found </p>
  
  return<>
    <Section layout='1'>
      <ul>
        {categories?.map(cat => (
          <li key={cat.id}>
            <Link href={`/categories/${cat.name}`}> {cat.name} </Link>
          </li>
        ))}
      </ul>
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
