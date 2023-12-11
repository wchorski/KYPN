import React from 'react'
import Link from 'next/link';
import { datePretty } from '@lib/dateFormatter';
import { FiCalendar } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { ImageDynamic } from '../elements/ImageDynamic';
import { User } from '@ks/types';
import styles from "@styles/blog/blog.module.scss";
import { YouTubeVideo } from '@components/blocks/YouTubeVideo';

type Props = {
  id:string,
  slug:string,
  title:string,
  excerpt:string,
  featured_image:string,
  featured_video:string,
  dateModified:string,
  author:User,


  buttonText?:string,
}

export const BlogListItem = ({ id, slug, title, excerpt, featured_image, featured_video, dateModified, author, buttonText = 'read more' }: Props) => {

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
        <header>
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
                {datePretty(dateModified)}
              </time>
          </div>
        </header>
        

        <p className='excerpt'>
          {excerpt}
        </p>


        <Link className='readmore button' href={`/blog/${slug}`}>{buttonText}</Link>
        {/* <div className="menu admin">
          <Link href={{ pathname: '/shop/products/update', query: { id: id }, }}> Edit ✏️ </Link>
          <AddToCart id={id} />
          <ProductDelete id={id}> Delete </ProductDelete>
        </div> */}

      </div>

    </article>
  )
}