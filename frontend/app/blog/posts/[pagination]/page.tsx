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

type Props = {
  params:{
    pagination:string | string[] | undefined,
  },
}



export default async function BlogFeedPagination({ params }:Props) {

  const client = getClient()
  const { data, error, loading } = await client.query({query})


  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const {categories, tags} = data

  return (

    <PageTHeaderMainAside 
      header={Header()}
      main={Main({page: Number(params.pagination)})}
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
    <Pagination route='/blog/posts' page={(page) || 1} />

    <BlogList page={page || 1} />

    <Pagination route='/blog/posts' page={(page) || 1} />
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
      <CategoriesPool categories={categories}/>

      <h2> Tags </h2>
      <TagsPool tags={tags}/>
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