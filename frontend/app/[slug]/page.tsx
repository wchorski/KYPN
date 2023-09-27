'use client'
import { AsideBar } from "@/components/layouts/AsideBar"
import { Card } from "@components/layouts/Card"
import { PageTHeaderMain, PageTHeaderMainAside, PageTMain } from "@components/layouts/PageTemplates"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useRouter } from "next/navigation"
import Error404 from "../404"
import ErrorMessage from "@components/ErrorMessage"
import { QueryLoading } from "@components/menus/QueryLoading"
import { Content, Page } from "@lib/types"
import { datePretty } from "@lib/dateFormatter"
import { BlockRenderer } from "@components/blocks/BlocksRenderer"

type Props = {
  params:{
    slug:string,
  },
  template:string,
}

export default function PageBySlug ({
  params,
}:Props) {

  const { loading, error, data } = useQuery(
    QUERY_PAGE_SINGLE, {
      variables: { where: { slug: params.slug } }
    }
  )
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  if (!data.page) return <Error404 />

  const {
    id,
    title,
    slug,
    status,
    featured_image,
    featured_video,
    excerpt,
    dateModified,
    dateCreated,
    template,
    allow_comments,
    author,
    categories,
    tags,
    content,
  }:Page = data.page

  // console.log(data);
  

  if (status === 'DRAFT') return <p>This blog post is still a draft</p>
  if (status === 'PRIVATE') return <p>This blog post is private</p>
  

  if(template === 'FULLWIDTH') return (
    <PageTHeaderMain
      header={Header({dateCreated, dateModified, title, author, featured_image})} 
      main={Main(content)}
    />
  )

  return (
    <PageTHeaderMainAside 
      header={Header({dateCreated, dateModified, title, author, featured_image})}
      main={Main(content)}
      aside={Aside()}
    />
  )
}

type Header = {
  title:string,
  dateCreated:string,
  dateModified:string,
  featured_image:string,
  author?:{
    name?:string,
  }
}

//? Content
function Header({dateCreated, dateModified, title, author, featured_image }:Header){

  // console.log(dateCreated);
  
  return (

    <header
        className='page'
        style={{
          backgroundImage: `url(${featured_image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: ('FULLWIDTH_WITHHEADER' === 'FULLWIDTH_WITHHEADER') ? 'block' : 'none',
        }}
      >

      <div className='overlay'>
        <h1>{title}</h1>

        <span>
          <em> Published on {datePretty(dateCreated)}</em>
          <br />
          <em> Modified on {datePretty(dateModified)}</em>
        </span>
        <br />

        {author?.name ? (
          <span>
            <em> · by {author?.name}</em>
          </span>
        ) : null}

        {/* <span>View Count : 12345</span> */}

      </div>
    </header>
  )
}


function Main(content:Content){

  return <>
    <BlockRenderer document={content.document} />
  </>
}

function Aside(){
  return <>
    <Card>
      <h2> Aside</h2>
    </Card>
  </>
}


// //? Data Fetching
export const QUERY_PAGE_SINGLE = gql`
  query Page($where: PageWhereUniqueInput!) {
    page(where: $where) {
      id
      slug
      title
      template
      dateCreated,
      dateModified,
      tags {
        name
      }
      categories {
        name
      }
      status
      author{
        id
        name
      }
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`