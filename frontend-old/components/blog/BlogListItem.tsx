import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
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

const StyledBlogItem = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--c-dark);
  border: solid 2px var(--c-primary);
  box-shadow: #0000004d 2px 2px 8px;
  border-radius: var(--br-sharp);
  overflow: hidden;

  > * {
    padding: 0;
  }

  .meta-cont{
    padding: 1em;
    padding-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  img{
    /* width: 300px !important; */
    width: 100% !important;
    height: 300px !important;
    object-fit: cover;
    min-height: 14em;
    background: var(--cg-stripes);
  
  }

  p{
    flex-grow: 1;
    /* padding: 1em; */
  }
  
  a {
    /* background: var(--c-accent); */
    display: inline;
    /* font-size: 4rem; */
    /* text-align: left; */
    color: var(--c-txt);
    text-decoration: none;
    /* padding: 0 1rem; */
    transition: .3s;

    &:hover{
      opacity: .7;
      color: var(--c-accent) !important;
    }
  }

  h3{
    /* margin: 0 1rem; */
    /* text-align: center; */
    /* transform: skew(-5deg) rotate(-1deg); */
    /* margin-top: -3rem; */
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);
    margin: 1rem 0;
    line-height: 1.3em;


  }

  .date, .author{
    margin-right: 10px;
    display: flex;
    align-items: center;

    svg{
      margin-right: 5px;
    }
  }

  .menu{
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  a.readmore{
    margin-top: auto;
    /* position: absolute; */
    bottom: 1em;
    right: 1em;
  }
`

const StyledPriceTag = styled.span`
  background: var(--c-primary);
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;