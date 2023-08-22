
import Link from 'next/link';
import { BlockRenderer } from '../../components/blocks/BlocksRenderer';
import { QueryLoading } from '../menus/QueryLoading';
import ErrorMessage from '../ErrorMessage';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { YouTubeVideo } from '../blocks/YouTubeVideo';
import { datePretty, datePrettyLocal, datePrettyLocalDay, datePrettyLocalTime } from '../../lib/dateFormatter';
import { TagsPool } from '../menus/TagsPool';
import { CategoriesPool } from '../menus/CategoriesPool';
import { MediaText } from '../blocks/MediaText';
import { BreadCrumbs } from '../elements/BreadCrumbs';
import { ImageDynamic } from '../elements/ImageDynamic';
import Head  from 'next/head';
import { Post } from '../../lib/types';

const SITE_URI = process.env.NEXT_PUBLIC_SITE_URI || 'no_url'

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
  }:Post = data.post

  if (status === 'DRAFT') return <p>This blog post is still a draft</p>
  if (status === 'PRIVATE') return <p>This blog post is private</p>

  return (
    <>
      <Head>
        <title> {title} </title>
        <meta name="description"        content={excerpt} />
        <meta name='keywords'           content={tags.map(tag => tag.name).join(', ')} />
        <meta name="author"             content={author.name} />
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image"       content={featured_image} />
        <meta property="og:url"         content={SITE_URI + '/blog/' + slug} />
        <meta property="og:type"        content="article" />
      </Head>

      <StyledBlogSingle>

        <div className='breadcrumbs-cont'>
          <BreadCrumbs />
        </div>

        <header
          style={{
            backgroundImage: `url(${featured_image})`
          }}
        >
          <ImageDynamic 
            photoIn={featured_image}
          />

          <div className="title-cont">
            <h1>{title}</h1>
            
            <ul className='meta'>
              {author && (
                <li>post by <Link href={`/users/${author.id}`}> {author.name} </Link></li>
              )}
              <li> 
                <time dateTime={dateCreated} className='date' data-tooltip={datePrettyLocalTime(dateCreated)}>
                  {datePrettyLocalDay(dateCreated)}
                </time>
              </li>
              {/* <li>Modified on {datePretty(dateModified)}</li> */}
            </ul>
          </div>

        </header>
        
        {featured_video && (
          <YouTubeVideo
            url={featured_video}
            altText='featured video'
          />
        )}

        
        <BlockRenderer document={content.document} />

        <footer>
          <h2 className='categories'>Categories: </h2>
          <CategoriesPool categories={categories} />


          <h2 className='tags'>Tags:</h2>
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

  max-width: 1000px;
  margin-inline: auto;

  .breadcrumbs-cont{
    /* height: 2rem; */
    padding: 1rem 1rem;
  }

  header{
    /* background: var(--c-accent); */
    position: relative;
    height: 70vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    /* outline: dotted aqua 1px; */
    /* display: flex; */
    /* background-blend-mode: overlay; */

    img{
      object-fit: cover;
      /* outline: dotted lavender 2px; */
      width: 100%;
      position: absolute;
      z-index: -1;
      width: 1px;
      height: 1px;
    }

    .title-cont{
      padding: 3rem;
      margin: 1rem;
      position: relative;
      border-radius: var(--br-dull);
      bottom: 0;
      position: absolute;
      z-index: 1;
      /* backdrop-filter: blur(10px); */

      &::after{
        background-color: var(--c-glass);
        content: '';
        backdrop-filter: blur(10px);
        /* filter: blur(10px); */
        position: absolute;
        inset: 0%;
        z-index: -1;
      }
    }

    .overlay{
      /* background-color: rgb(155 255 0 / 52%); */
      /* background: rgba(242, 242, 242, 0.82); */
      padding: 1rem;
      overflow: hidden;
      height: 100%;
      z-index: 2;
      background-color: var(--c-primary);
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
      margin-bottom: 0;
    }

    ul.meta{
      padding: 0;
      font-size: 1rem;
      list-style: none;
    }

    time.date{
      position: relative;
    }

    /* figure{

      height: 30rem;
      margin: 0;

      img{
        width: 1px;
      }
    } */
  }

  > .video-cont{
    margin: .2rem;
  }

  /* .block-renderer{
    padding: 1rem;
    background-color: var(--c-light);
  } */


  > footer{
    margin-top: 4rem;
    padding: 1rem;

    h2.categories, h2.tags{
      display: none;
    }
  }
`