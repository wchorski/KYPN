
import { Card } from "@components/layouts/Card"
import { PageTHeaderMain, PageTHeaderMainAside, PageTMain } from "@components/layouts/PageTemplates"

import Error404 from "../not-found"
import ErrorMessage from "@components/ErrorMessage"
import {  Page } from "@ks/types"
import { datePretty } from "@lib/dateFormatter"
import fetchPage from "@lib/fetchdata/fetchPage"
import { BlockRender } from '@components/blocks/BlockRender'
import { envs } from "@/envs"
import { Metadata, ResolvingMetadata } from "next"
import { Section } from "@components/layouts/Section"
import {NotPublicPage} from "@components/NotPublicPage"
export const revalidate = 5;

type Props = {
  params:{
    slug:string,
  },
}
 
export async function generateMetadata({ params }:Props,
  parent: ResolvingMetadata,
){

  const { slug } = params
  const { page , error} = await fetchPage(slug)

  return {
    title: page?.title || '404' + ' | ' + envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }
}

export default async function PageBySlug ({params,}:Props) {


  const { page , error} = await fetchPage(params.slug)


  // if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  if (!page) return <Error404 />

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
    author,
    categories,
    tags,
    content,
  }:Page = page

  // console.log(data);
  

  if (status === 'DRAFT') return (
    <NotPublicPage status={status}> 
      <p>This blog post is still a draft</p> 
    </NotPublicPage>
  )

  if (status === 'PRIVATE') return (
    <NotPublicPage status={status}> 
      <p>This blog post is private</p> 
    </NotPublicPage>
  )

  if(template === 'FULLWIDTH' || template === 'FULLWIDTH_WITHHEADER') return (
    <PageTHeaderMain
      header={Header({dateCreated, dateModified, title, author, featured_image, template})} 
      main={Main(content)}
      headerStyles={{
        backgroundImage: `url(${featured_image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: (template === 'FULLWIDTH_WITHHEADER') ? 'block' : 'none',
      }}
    />
  )

  return (
    <PageTHeaderMainAside 
      header={Header({dateCreated, dateModified, title, author, featured_image, template})}
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
  template:'FULLWIDTH'|'FULLWIDTH_WITHHEADER'|'WITHSIDEBAR'|'BLANK'|string
  author?:{
    name?:string,
  }
}

//? Content
function Header({dateCreated, dateModified, title, author, featured_image, template }:Header){

  // console.log(dateCreated);
  
  return <>

    <Section layout={'1'}>
      
    
      <h1>{title}</h1>

      <span>
        <em> Published on {datePretty(dateCreated)}</em>
        <br />
        <em> Modified on {datePretty(dateModified)}</em>
      </span>
      <br />

      {author?.name && (
        <span>
          <em> · by {author?.name}</em>
        </span>
      )}

      {/* <span>View Count : 12345</span> */}

  </Section>
  </>
}


function Main(content:any){

  return <>
    <BlockRender document={content.document} />
  </>
}

function Aside(){
  return <>
    <Card>
      <h2> Aside</h2>
    </Card>
  </>
}
