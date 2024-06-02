import { nextAuthOptions } from '@/session'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { fetchPosts } from '@lib/fetchdata/fetchPosts'
import { getServerSession } from 'next-auth'

type Props = {
  params:{
    page:string | string[] | undefined,
  },
  searchParams: { 
    [key: string]: string | string[] | undefined, 
    tags: string | undefined, 
    page: string | undefined, 
  }
}

export default async function TagsPage ({ params, searchParams }:Props) {
  const session = await getServerSession(nextAuthOptions);
  const { page, tags } = searchParams
  const currPage = Number(page) || 1
  const tagIds = tags?.split(',') || []
  const { posts, count, error } = await fetchPosts(currPage, tagIds, session )
  
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> TagsPage </h1>
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <p> under construction </p>
    </Section>
  </>
}