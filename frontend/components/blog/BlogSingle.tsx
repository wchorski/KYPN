
import Link from 'next/link';
import { BlockRenderer } from '../../components/blocks/BlocksRenderer';
import { QueryLoading } from '../menus/QueryLoading';
import ErrorMessage from '../ErrorMessage';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { YouTubeVideo } from '../blocks/YouTubeVideo';
import { datePretty } from '../../lib/dateFormatter';
import { TagsPool } from '../menus/TagsPool';
import { CategoriesPool } from '../menus/CategoriesPool';


export default function BlogPage({ slug }: { slug: string | string[] | undefined }) {

  const { loading, error, data } = useQuery(
    QUERY_BLOG_SINGLE, {
    variables: { where: { slug: slug } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const {
    id,
    title,
    pinned,
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
  } = data.post

  if (status === 'DRAFT') return <p>This blog post is still a draft</p>
  if (status === 'PRIVATE') return <p>This blog post is private</p>

  return (
    <>
      <div>
        <Link href="/">&larr; back home</Link>
      </div>

      <StyledBlogSingle>
        <header
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
        </header>

        <YouTubeVideo
          url={featured_video}
          altText='featured video'
        />


        <BlockRenderer document={content.document} />

        <footer>
          <h2>Categories: </h2>
          <CategoriesPool categories={categories} />


          <h2>Tags:</h2>
          <TagsPool tags={tags} />
        </footer>

      </StyledBlogSingle>

    </>
  )
}


export const QUERY_BLOG_SINGLE = gql`
  query Post($where: PostWhereUniqueInput!) {
    post(where: $where) {
      id
      title
      pinned
      status
      featured_image
      featured_video
      excerpt
      dateModified
      dateCreated
      template
      allow_comments
      author {
        id
        name
      }
      categories {
        name
      }
      tags {
        name
        productsCount
        postsCount
      }
      content {
        document
      }
    }
  }
`

const StyledBlogSingle = styled.article`
  header{
    background: var(--c-accent);
    position: relative;
    /* background-blend-mode: overlay; */

    .overlay{
      /* background-color: rgb(155 255 0 / 52%); */
      background: rgba(242, 242, 242, 0.82);
      overflow: hidden;
      height: 100%;
      z-index: 2;
    }
  }


  footer{
    h2{
      margin-bottom: .1em;
      font-size: 1.2rem;
    }
  }
`