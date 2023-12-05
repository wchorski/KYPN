import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || "Shop"

type Props = {
  options?: {
    isLogo?:boolean,
    isSiteTitle?:boolean,
  }
}

const default_options = {
  isLogo: true,
  isSiteTitle: true,
}

export default function Header({options = default_options}:Props) {


  return (
    <header>

      <figure>
        <Link href={`/home`} > 
        {options.isLogo && (
          <Image src={'/assets/private/logo.svg'} width={100} height={100} alt='site logo'/>
        )}
        </Link>
      </figure>

      {options.isSiteTitle && (
        <Link href={`/home`} className='site-title'> <h1> {SITE_TITLE} </h1> </Link>
      )}

    </header>
  )
}

// const StyledLogo = styled.div`

//   background-position: 0 0, 50px 50px;
//   background-size: 20px 20px;
//   display: flex;
//   align-items: center;
//   /* margin-left: 1rem; */

//   &::before{
//     background-color: blue;
//     width: 100px;
//   }

  
//   a{
//     color: var(--c-txt-rev);
//     text-decoration: none;
//     flex: 1;
//     transition: opacity .3s;

//     &:hover, &:focus{
//       opacity: .7;
//     }
//   }
  
// `

// const StyledHeader = styled.header`
//   max-width: var(--w-sitemax);
//   display: flex;


//   a.site-title{

//     text-shadow: #00000040 1px 1px 10px;
//     padding-inline: 1rem;
//     font-size: 1.5rem;
//     line-height: normal;
//     display: flex;
//     align-items: center;
//     color: var(--c-txt);
//     text-decoration: none;

//     &:hover, &:focus{
//       color: var(--c-accent);
//     }
//   }

//   .bar{
//     display: grid;
//     grid-template-columns: auto 1fr;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .util-menu{
//     border-bottom: solid 1px var(--c-2, darkgrey);
//     display: grid;
//     grid-template-columns: auto 1fr;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//   }

//   @media screen and (max-width: 500px){
//     a.site-title{
//       display: none;
//     }
//   }
  
  
// `
