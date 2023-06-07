import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../../components/ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components';
import { QueryLoading } from './../menus/QueryLoading';
import { QueryError } from './../menus/QueryError';
import { perPage } from '../../config';
import { BlogListItem } from './BlogListItem';

type ProdProps = {
  page: number,
  categories?: {id:string}[],
}

export function BlogList({ page, categories = [] }: ProdProps) {

  const catArray = categories.map(cat => ({categories: { some: { id: { equals: cat.id }}}}))

  const { loading, error, data } = useQuery(QUERY_POSTS_PAGINATED, {
    variables: {
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
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (
    <StyledBlogList>
      {data.posts.map((item: any) => {
        return (
          <li key={item.id}>
            <BlogListItem {...item} buttonText="Press Play"/>
          </li>
        );
      })}
    </StyledBlogList>
  )
}

const StyledBlogList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1em;
  /* grid-template-columns: 1fr 1fr; */
  /* grid-gap: 60px; */
  /* display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around; */
  list-style: none;
  margin: 0;
  padding: 0;

  li{
    background-color: var(--c-desaturated);
    /* padding: .3em; */
    box-shadow: #0000004d 2px 2px 8px;
    /* margin: 1em; */
    width: 100%;
  }

  img{
    width: 100%;
    height: auto;
  }
`

export const QUERY_POSTS_PAGINATED = gql`
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
