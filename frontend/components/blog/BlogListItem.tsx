import React from 'react'
import Link from 'next/link';
import { datePretty } from '../../lib/dateFormatter';
import { FiCalendar } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { ImageDynamic } from '../elements/ImageDynamic';
import { User } from '../../lib/types';
import styles from "@/styles/blog/Blog.module.scss";

type Props = {
  id:string,
  slug:string,
  title:string,
  excerpt:string,
  featured_image:string,
  dateModified:string,
  author:User,


  buttonText?:string,
}

export const BlogListItem = ({ id, slug, title, excerpt, featured_image, dateModified, author, buttonText = 'read more' }: Props) => {

  return (
    <article className={styles.thumbnail}>



      <Link href={`/blog/${slug}`} className='featured_image'>
        <ImageDynamic photoIn={featured_image}/>
        {/* <Image
          src={featured_image}
          alt={`post featured image`}
          width={300}
          height={300}
        /> */}
      </Link>

     
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
              <small className='date'> 
                <FiCalendar />
                {datePretty(dateModified)}
              </small>
          </div>
        </header>
        

        <p className='excerpt'>
          {excerpt}
        </p>


        <Link className='readmore button' href={`/blog/${slug}`}>{buttonText}</Link>
        {/* <div className="menu admin">
          <Link href={{ pathname: '/shop/product/update', query: { id: id }, }}> Edit ✏️ </Link>
          <AddToCart id={id} />
          <ProductDelete id={id}> Delete </ProductDelete>
        </div> */}

      </div>

    </article>
  )
}