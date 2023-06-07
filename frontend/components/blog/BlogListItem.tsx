import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { datePretty } from '../../lib/dateFormatter';
import { FiCalendar } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { ImageDynamic } from '../elements/ImageDynamic';


export const BlogListItem = ({ id, slug, title, excerpt, featured_image, dateModified, author, buttonText = 'read more...' }: any) => {

  return (
    <StyledBlogItem>



      <Link href={`/blog/${slug}`}>
        <ImageDynamic photoIn={featured_image}/>
        {/* <Image
          src={featured_image}
          alt={`post featured image`}
          width={300}
          height={300}
        /> */}
      </Link>
     

      <div className='meta-cont'>
        <h3><Link href={`/blog/${slug}`}>{title}</Link></h3>
    
          {author && (
            <small className='author'> 
              <CgProfile />
              <Link href={`/blog/posts/search?user=${author?.id}`}>{author?.name}</Link>
            </small>
          )}
          <small className='date'> 
            <FiCalendar />
            {datePretty(dateModified)}
          </small>
       

        <p className='excerpt'>
          

          {/* {excerpt} */}
        </p>

        <Link className='readmore button small' href={`/blog/${slug}`}>{buttonText}</Link>
        {/* <div className="menu admin">
          <Link href={{ pathname: '/shop/product/update', query: { id: id }, }}> Edit ✏️ </Link>
          <AddToCart id={id} />
          <ProductDelete id={id}> Delete </ProductDelete>
        </div> */}
      </div>

    </StyledBlogItem>
  )
}

const StyledBlogItem = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

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
  }

  p{
    flex-grow: 1;
    /* padding: 1em; */
  }

  h3{
    /* margin: 0 1rem; */
    /* text-align: center; */
    /* transform: skew(-5deg) rotate(-1deg); */
    /* margin-top: -3rem; */
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);
    margin: 0;
    line-height: 1.3em;

    a {
      /* background: var(--c-accent); */
      display: inline;
      /* font-size: 4rem; */
      /* text-align: left; */
      color: var(--c-txt);
      text-decoration: none;
      /* padding: 0 1rem; */
    }

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
  background: var(--c-3);
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