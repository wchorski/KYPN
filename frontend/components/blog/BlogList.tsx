import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../../components/ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components';
import { QueryLoading } from './../menus/QueryLoading';
import { QueryError } from './../menus/QueryError';
import { perPage } from '../../config';
import { BlogThumbnail } from './BlogThumbnail';

type ProdProps = {
  page: number
}

export function BlogList({ page }: ProdProps) {

  const { loading, error, data } = useQuery(QUERY_POSTS_PAGINATED, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (
    <StyledBlogList>
      {data.posts.map((item: any) => {
        return (
          <li key={item.id}>
            <BlogThumbnail {...item} />
          </li>
        );
      })}
    </StyledBlogList>
  )
}

const StyledBlogList = styled.ul`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-gap: 60px; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;

  li{
    background-color: #dcdcdc;
    padding: .3em;
    box-shadow: #0000004d 2px 2px 8px;
    margin: 1em;
    width: 100%;
  }

  img{
    width: 100%;
    height: auto;
  }
`

export const QUERY_POSTS_PAGINATED = gql`
  query Query($skip: Int!, $take: Int) {
    posts(skip: $skip, take: $take) {
      author{
        id
        name
      }
      dateCreated
      dateModified
      excerpt
      featured_image
      featured_video
      id
      pinned
      slug
      status
      title
    }
  }
`
