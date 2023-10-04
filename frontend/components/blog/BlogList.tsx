import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../ecommerce/ProductThumbnail";
import { gql } from '@apollo/client'
import { QueryLoading } from '../menus/QueryLoading';
import { QueryError } from '../menus/QueryError';
import { BlogListItem } from './BlogListItem';
import styles from "@/styles/blog/Blog.module.scss";
import { envvars } from '@lib/envvars';
import { List } from '@components/elements/List';
import { getClient } from '@lib/gqlClient';
export const revalidate = 5;

const perPage = envvars.PERPAGE


type ProdProps = {
  page: number,
  categories?: {id:string}[],
}

export async function BlogList({ page, categories = [] }: ProdProps) {

  const catArray = categories.map(cat => ({categories: { some: { id: { equals: cat.id }}}}))

  const client = getClient()
  const { data, error, loading } = await client.query({query, variables: {
    skip: page * perPage - perPage,
    take: perPage,
    orderBy: [
      {
        dateModified: "desc"
      }
    ],
    where: {
      OR: catArray,
      NOT: [
        {
          OR: [
            {
              status: {
                equals: "DRAFT"
              }
            },
            {
              status: {
                equals: "PRIVATE"
              }
            },
          ]
        }
      ]
    },
  }})

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (
    <List className={styles.blog} isAnimated={true}>
      {data.posts.map((item: any) => (
        <BlogListItem {...item} />
      ))}
    </List>
  )

}


const query = gql`
  query Posts($where: PostWhereInput!, $orderBy: [PostOrderByInput!]!, $take: Int, $skip: Int!) {
    posts(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      title
      featured_image
      featured_video
      author {
        id
        name
        nameLast
      }
      dateModified
      excerpt
      pinned
      slug
      status
      template
      tags {
        id
        name
      }
      categories {
        id
        name
      }
    }
  }
`
