
import Link from 'next/link';
import { BlockRenderer } from '../../components/blocks/BlocksRenderer';
import { QueryLoading } from '../menus/QueryLoading';
import ErrorMessage from '../ErrorMessage';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { YouTubeVideo } from '../blocks/YouTubeVideo';
import { datePretty, datePrettyLocal } from '../../lib/dateFormatter';
import { TagsPool } from '../menus/TagsPool';
import { CategoriesPool } from '../menus/CategoriesPool';
import { MediaText } from '../blocks/MediaText';
import { BreadCrumbs } from '../elements/BreadCrumbs';


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

      <StyledBlogSingle>

        <div className='breadcrumbs-cont'>
          <BreadCrumbs />
        </div>

        <header>
          <MediaText 
            imageSrc={featured_image}
            imageAlt='Featured Image'
            rowReverse={true}
          >
            <h1>{title}</h1>
            <ul className='meta'>
              {author && (
                <li>post by <Link href={`/users/${author.id}`}> {author.name} </Link></li>
              )}
              <li>Published on {datePrettyLocal(dateCreated , 'day')}</li>
              {/* <li>Modified on {datePretty(dateModified)}</li> */}
            </ul>
          </MediaText>

        </header>
        
        {featured_video && (
          <YouTubeVideo
            url={featured_video}
            altText='featured video'
          />
        )}


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

  .breadcrumbs-cont{
    /* height: 2rem; */
    padding: 1rem 1rem;
  }

  header{
    /* background: var(--c-accent); */
    position: relative;
    padding: 0;
    margin-bottom: 4rem;
    /* display: flex; */
    /* background-blend-mode: overlay; */

    .overlay{
      /* background-color: rgb(155 255 0 / 52%); */
      /* background: rgba(242, 242, 242, 0.82); */
      padding: 1rem;
      overflow: hidden;
      height: 100%;
      z-index: 2;
      background-color: var(--c-3);
    }

    .content-cont{
      article > *:nth-child(odd){
        min-height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: solid 3px var(--c-txt);
      }
      article > *:nth-child(even){
        background-color: transparent;
      }
    }

    h1{
      font-size: 1.2rem;
    }

    ul.meta{
      padding: 1rem;
      list-style: none;
    }

    /* figure{

      height: 30rem;
      margin: 0;

      img{
        width: 1px;
      }
    } */
  }


  footer{
    margin-top: 4rem;

    h2{
      margin-bottom: .1em;
      font-size: .8rem;
    }
  }
`