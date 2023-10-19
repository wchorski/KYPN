
import Link from 'next/link';
import { QueryLoading } from '@components/menus/QueryLoading';
import ErrorMessage from '@components/ErrorMessage';
import { gql } from "@apollo/client";
import { getClient } from '@lib/gqlClient';
import { YouTubeVideo } from '@components/blocks/YouTubeVideo';
import { datePretty, datePrettyLocal, datePrettyLocalDay, datePrettyLocalTime } from '@lib/dateFormatter';
import { TagsPool } from '@components/menus/TagsPool';
import { CategoriesPool } from '@components/menus/CategoriesPool';
import { MediaText } from '@components/blocks/MediaText';
import { BreadCrumbs } from '@components/elements/BreadCrumbs';
import { ImageDynamic } from '@components/elements/ImageDynamic';
import Head  from 'next/head';
import { Category, Post, Tag, User } from '@ks/types';
import { BlockRenderer } from '@components/blocks/BlocksRenderer';
import { envs } from '@/envs';
import styles from '@styles/blog/blogpost.module.scss'
import { PageTHeaderMain } from '@components/layouts/PageTemplates';

export const revalidate = 5;

type Props = {
  params:{
    slug:string | string[] | undefined,
  },
  template:string,
}


export default async function BlogPageBySlug({ params }:Props) {
  
  const client = getClient()
  const { data, error, loading } = await client.query({query, 
    variables: { where: { slug: params.slug } }
  })


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
        <meta name='keywords'           content={tags?.map(tag => tag.name).join(', ')} />
        <meta name="author"             content={author?.name} />
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image"       content={featured_image} />
        <meta property="og:url"         content={envs.SITE_URI + '/blog/' + params.slug} />
        <meta property="og:type"        content="article" />
      </Head>

      <main>
        
    <div className={[styles.breadcrumbs_wrap, 'siteWrapper'].join(' ')}>
      <BreadCrumbs />
    </div>
      
    <article className={styles.article} >

      <header
        style={{
          backgroundImage: `url(${featured_image})`
        }}
      >
        <ImageDynamic 
          photoIn={featured_image}
        />

        <div className="overlay siteWrapper">
          <div className={styles.title_wrap}>
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

            </ul>
          </div>
        </div>

      </header>

      {featured_video && (
        <div className="featured_video">

          <YouTubeVideo
            url={featured_video}
            altText='featured video'
          />
        </div>
      )}

      <div className="siteWrapper">
        <BlockRenderer document={content.document} />
      </div>

      <footer>
        <h2 className='categories'>Categories: </h2>
        <CategoriesPool />


        <h2 className='tags'>Tags:</h2>
        <TagsPool />
      </footer>

    </article>
    
    </main>
    </>
  )
}

const query = gql`
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

// const StyledBlogSingle = styled.article`

//   margin-inline: auto;

//   .breadcrumbs-cont{
//     /* height: 2rem; */
//     padding: 1rem 1rem;
//   }

//   header{
//     /* background: var(--c-accent); */
//     position: relative;
//     height: 70vh;
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: 50% 50%;
//     /* outline: dotted aqua 1px; */
//     /* display: flex; */
//     /* background-blend-mode: overlay; */

//     img{
//       object-fit: cover;
//       /* outline: dotted lavender 2px; */
//       width: 100%;
//       position: absolute;
//       z-index: -1;
//       width: 1px;
//       height: 1px;
//     }

//     .title-cont{
//       padding: 3rem;
//       margin: 1rem;
//       position: relative;
//       border-radius: var(--br-dull);
//       bottom: 0;
//       position: absolute;
//       z-index: 1;
//       /* backdrop-filter: blur(10px); */

//       &::after{
//         background-color: var(--c-glass);
//         content: '';
//         backdrop-filter: blur(10px);
//         /* filter: blur(10px); */
//         position: absolute;
//         inset: 0%;
//         z-index: -1;
//       }
//     }

//     .overlay{
//       /* background-color: rgb(155 255 0 / 52%); */
//       /* background: rgba(242, 242, 242, 0.82); */
//       padding: 1rem;
//       overflow: hidden;
//       height: 100%;
//       z-index: 2;
//       background-color: var(--c-primary);
//     }

//     .content-cont{
//       article > *:nth-child(odd){
//         min-height: 50%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         border-bottom: solid 3px var(--c-txt);
//       }
//       article > *:nth-child(even){
//         background-color: transparent;
//       }
//     }

//     h1{
//       margin-bottom: 0;
//     }

//     ul.meta{
//       padding: 0;
//       font-size: 1rem;
//       list-style: none;
//     }

//     time.date{
//       position: relative;
//     }

//     /* figure{

//       height: 30rem;
//       margin: 0;

//       img{
//         width: 1px;
//       }
//     } */
//   }

//   > .video-cont{
//     margin: .2rem;
//     background-color: var(--c-dark);
//   }


//   > footer{
//     margin-top: 4rem;
//     padding: 1rem;

//     h2.categories, h2.tags{
//       display: none;
//     }
//   }
// `