import { useRouter } from 'next/router'


import Link from 'next/link';
import { BlockRenderer } from '../components/blocks/BlocksRenderer';
import { QueryLoading } from '../components/menus/QueryLoading';
import ErrorMessage from '../components/ErrorMessage';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { YouTubeVideo } from '../components/blocks/YouTubeVideo';
import { datePretty } from '../lib/dateFormatter';
import { TagsPool } from '../components/menus/TagsPool';
import { CategoriesPool } from '../components/menus/CategoriesPool';
import Error404 from './404';


export default function PageBySlug() {

  const { query } = useRouter()

  const { loading, error, data } = useQuery(
    QUERY_PAGE_SINGLE, {
    variables: { where: { slug: query.slug } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  if (!data.page) return <Error404 />

  const {
    id,
    title,
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
  } = data.page

  if (status === 'DRAFT') return <p>This blog post is still a draft</p>
  if (status === 'PRIVATE') return <p>This blog post is private</p>

  return (
    <>
      <StyledPageSingle isShown={false} >
        <header
          className='page'
          style={{
            backgroundImage: `url(${featured_image})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className='overlay'>
            <h1>{title}</h1>


            <span>
              <em>Published on {new Date(dateCreated).toLocaleDateString()}</em>
              <br />
              <em>Modified on {datePretty(dateModified)}</em>
            </span>
            <br />

            {author?.name ? (
              <span>
                <em> · by {author?.name}</em>
              </span>
            ) : null}

            <span>View Count : 12345</span>

          </div>

          <hr />
        </header>

        <BlockRenderer document={content.document} />

      </StyledPageSingle>

    </>
  )
}

const StyledPageSingle = styled.div<{isShown: boolean}>`
  header.page{
    /* display: ${props => props.isShown ? 'none' : 'block'}; */
    /* display: block; */
    ${props => props.isShown ? '' : 'height: 2rem; opacity: 0;'}

    background: var(--c-bg);
    position: relative;
    /* background-blend-mode: overlay; */

    .overlay{
      /* background-color: rgb(155 255 0 / 52%); */
      background: rgba(30, 30, 30, 0.474);
      overflow: hidden;
      height: 100%;
      z-index: 2;
    }

    text-align: center;
    color: var(--c-txt);
  }


  footer{
    h2{
      margin-bottom: .1em;
      font-size: 1.2rem;
    }
  }

  p{
    /* text-align: center; */
    /* max-width: 60ch; */
    margin: 1em auto;
  }
`

export const QUERY_PAGE_SINGLE = gql`
  query Page($where: PageWhereUniqueInput!) {
    page(where: $where) {
      id
      slug
      title
      template
      tags {
        name
      }
      categories {
        name
      }
      status
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`