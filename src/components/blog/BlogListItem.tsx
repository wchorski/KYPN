import React from 'react'
import Link from 'next/link';
import { datePrettyLocal } from '@lib/dateFormatter';
import { FiCalendar } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { ImageDynamic } from '../elements/ImageDynamic';
import { Post, User } from '@ks/types';
import styles from "@styles/blog/blog.module.scss";
import { YouTubeVideo } from '@components/blocks/YouTubeVideo';
import { StatusBadge } from '@components/StatusBadge';

type Props = {
  id:string,
  slug:string,
  title:string,
  excerpt:string,
  featured_image:string,
  featured_video:string,
  dateModified:string,
  author:User,
  status:Post['status'],


  buttonText?:string,
}

export const BlogListItem = ({ id, slug, title, excerpt, featured_image, featured_video, dateModified, author, buttonText = 'read more', status }: Props) => {

  return (
    <article className={styles.thumbnail}>

      <figure className='featured_image'>
        {featured_video ? (

          <YouTubeVideo 
            altText={`${title}'s featured video`}
            url={featured_video}
          />
        ) : (
          <Link href={`/blog/${slug}`}>
            <ImageDynamic photoIn={featured_image}/>
            {/* <Image
              src={featured_image}
              alt={`post featured image`}
              width={300}
              height={300}
            /> */}
          </Link>
        )}
      </figure>

     
      <div className='wrapper'>
        <header style={{position: 'relative'}}>
          {status !== 'PUBLIC' && <div style={{position: 'absolute', top: '1rem', right: '1rem'}}>
            <StatusBadge type={'post'} status={status} />
          </div>}
          <Link href={`/blog/${slug}`} className='title'>
            <h3> {title} </h3>
          </Link>
      
            <div className="meta">
              {author && (
                <small> 
                  <Link className='author' href={`/users/${author?.id}`}> <CgProfile /> {author?.name}</Link>
                </small>
              )}
              <time dateTime={dateModified} title='Publication update date'> 
                <FiCalendar />
                {datePrettyLocal(dateModified, 'day')}
              </time>
              
          </div>
        </header>
        

        <p className='excerpt'>
          {excerpt}
          <Link className='readmore' href={`/blog/${slug}`}>{buttonText}</Link>
        </p>


        {/* <div className="menu admin">
          <Link href={{ pathname: '/shop/products/update', query: { id: id }, }}> Edit ✏️ </Link>
          <AddToCart id={id} />
          <ProductDelete id={id}> Delete </ProductDelete>
        </div> */}

      </div>

    </article>
  )
}