import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { datePretty } from '../../lib/dateFormatter';


export const BlogThumbnail = ({ id, slug, title, excerpt, featured_image, dateModified, author }: any) => {

  return (
    <StyledBlogThumbnail>


      {featured_image && (
        <Image
          src={featured_image}
          alt={`post featured image`}
          width={300}
          height={300}
        />
      )}

      <div>
        <h3><Link href={`/blog/${slug}`}>{title}</Link></h3>

        <p className='excerpt'>
          <span>{author ? author.name : ''}</span>
          |
          <span>{datePretty(dateModified)}</span>
          <br />

          {excerpt}
          <Link href={`/blog/${slug}`}>{'  [read more...]'}</Link>
        </p>

        {/* <div className="menu admin">
          <Link href={{ pathname: '/shop/product/update', query: { id: id }, }}> Edit ✏️ </Link>
          <AddToCart id={id} />
          <ProductDelete id={id}> Delete </ProductDelete>
        </div> */}
      </div>

    </StyledBlogThumbnail>
  )
}

const StyledBlogThumbnail = styled.article`
  position: relative;
  display: flex;
  /* flex-direction: column; */
  height: 100%;

  img{
    width: 300px;
    height: auto;
    object-fit: cover;
  }

  p{
    flex-grow: 1;
    padding: 1em;
  }

  h3{
    margin: 0 1rem;
    /* text-align: center; */
    transform: skew(-5deg) rotate(-1deg);
    margin-top: -3rem;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.311);
    a {
      background: var(--c-1);
      display: inline;
      line-height: 1.3;
      font-size: 4rem;
      /* text-align: left; */
      color: var(--c-txt-rev);
      padding: 0 1rem;
    }
  }

  .menu{
    display: flex;
    justify-content: space-between;
    margin-top: auto;
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