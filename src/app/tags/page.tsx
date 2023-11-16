'use client'
import ErrorMessage from "@components/ErrorMessage";
import { PageTHeaderMain, PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Tag } from "@ks/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { Section } from "@components/layouts/Section";
import Link from "next/link";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { parse } from "graphql";
import { client } from "@lib/request";
import { useEffect, useState } from "react";
import { gql } from "graphql-request";
import { LoadingAnim } from "@components/elements/LoadingAnim";


// export const metadata: Metadata = {
//   title: `Tags | ` + envs.SITE_TITLE,
//   description: envs.SITE_DESC,
// }
type State = 'loading'|'error'|'success'|undefined

export default function TagsPage() {


  // const { tags, error } = await fetchTags()
  const [tags, setTags] = useState<Tag[]>([])
  const [error, setError] = useState<undefined|any>(undefined)
  const [state, setstate] = useState<State>(undefined)


  async function getTags(){

    const variables = {}

    try {
      setstate('loading')
      const { tags }  = await client.request(query, variables) as { tags:Tag[]}
      setTags(tags)
      setstate('success')
      
    } catch (error) {
      console.log({error})
      setError(error)
      setstate('error')
    }
  }

  useEffect(() => {
    getTags()
  
    // return () => 
  }, [])
  

  if(state === 'loading') return <LoadingAnim />
  if(error) return <ErrorMessage error={error}/>

  return <>
    <PageTHeaderMain 
      header={Header()}
      main={Main({tags})}
    />

  </>
}

function Header(){

  return <>
    <Section layout={'1'}>
      <h1> Tags </h1>
    </Section>
  </>
}

type Main = {
  tags:Tag[]|undefined,
}

function Main({tags}:Main) {

  if(!tags) <p> no tags found </p>
  
  return<>
    <Section layout='1'>
      <ul>
        {tags?.map(tag => (
          <li key={tag.id}>
            <Link href={`/tags/${tag.name}`}> {tag.name} </Link>
          </li>
        ))}
      </ul>
    </Section>
  </>
}

const query = gql`
  query getTags {
    tags {
      id
      name
    }
  }
`
