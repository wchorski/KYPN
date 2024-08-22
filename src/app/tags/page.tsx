import { nextAuthOptions } from '@/session'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/blocks/Section'
import { fetchPosts } from '@lib/fetchdata/fetchPosts'
import fetchTags from '@lib/fetchdata/fetchTags'
import { getServerSession } from 'next-auth'
import {Post, Tag} from '@ks/types'
import { Card } from '@components/layouts/Card'
import { BlogList } from '@components/blog/BlogList'
import { TagsPool } from '@components/menus/TagsPool'
import ErrorMessage from '@components/ErrorMessage'
import { envs } from '@/envs'
import { Metadata } from 'next'

type Props = {
  params:{
    page:string | string[] | undefined,
  },
  searchParams: { 
    [key: string]: string | string[] | undefined, 
    ids: string | undefined, 
    page: string | undefined, 
  }
}

export const metadata: Metadata = {
  title: `Tags | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default async function TagsPage ({ params, searchParams }:Props) {
  const session = await getServerSession(nextAuthOptions);
  const { page, ids } = searchParams
  const currPage = Number(page) || 1
  const tagIds = ids?.split(',') || []
  const { posts, count, error: postsError } = await fetchPosts({page: currPage, tagIds, session} )
  const {tags, error: tagsError} = await fetchTags(tagIds)

  if(postsError || tagsError) return <ErrorMessage error={postsError || tagsError}/>
  
  return (
    <PageTHeaderMain
      header={Header(tags)}
      main={Main(posts)}
    />
  )
}

function Header(tags?:Tag[]){

  return<>
    <Section layout={'1'}>
      <h1 style={{marginBottom: 0,}}> Tags {tags ? ':' : null }</h1>
      <p style={{marginTop: 0, color: 'var(--c-primary)'}}>{tags?.map(t => t.name).join(', ')}</p>
    </Section>
  </>
}

function Main(posts?:Post[]){

  return<>
    <Section layout={'1'}>
      <h4>Posts: </h4>
      {posts && <BlogList posts={posts} />}
      <Card>
        <h4> All Tags </h4>
        <TagsPool />
      </Card>
    </Section>
  </>
}