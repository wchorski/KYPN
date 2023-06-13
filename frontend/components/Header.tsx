import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import styled from "styled-components";
import { AnnouncementsMarquee } from './elements/AnnouncementsMarquee';
import { RotatingWords } from './blocks/RotatingWords';
import { MdAccountCircle } from 'react-icons/md';
import { SessionBadge, useUser } from './menus/Session';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || "Shop"
const SUB_TITLE = process.env.NEXT_PUBLIC_SUB_TITLE || ""

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
  
  const session = useUser()

  return (
    <StyledHeader>

      
      <StyledUtilNav className='desktop-only'>
        {session ? (
          <SessionBadge session={session} label='My Account'/>
        ) : (
          <Link href={`/auth/login`} className='button '> Login </Link>
        )}

      </StyledUtilNav>

      
      <div className="logo-cont">
        <StyledLogo>
          <Link href={`/home`} > 
          {options.isLogo && (
            <Image src={'/assets/private/logo.png'} width={552} height={221} alt='site logo'/>
          )}
          </Link>
          <span className='sub-title'>{SUB_TITLE}</span>
        </StyledLogo>
      </div>

      {options.isSiteTitle && (
        <h1> {SITE_TITLE} </h1> 
      )}

      <center style={{width: '100%'}}>
        <h6 style={{marginTop: '0'}}> Real DJs For </h6>
        
        <RotatingWords words={[
          {
            label: 'Real Parties',
            color: 'white',
          },
          {
            label: 'World-Class Weddings',
            color: '#fcd701',
          },
          {
            label: 'Magnificent Mitzvahs',
            color: '#5bff00',
          },
          {
            label: 'Captivating Company Parties',
            color: 'cyan',
          },
          {
            label: 'Raging Dancefloors',
            color: '#ea4ce0',
          },
        ]}/>
      </center>


    </StyledHeader>
  )
}

const StyledUtilNav = styled.nav`
  position: absolute;
  right: 1em;
  top: 1em;

  ul{
    display: flex;
    padding: 0;

  }
  
  li{
    padding: 1em;
  }
`


const StyledLogo = styled.div`
  padding: .3em;
  margin: 1rem;
  /* transform: skew(-17deg); */
  /* background-color: var(--c-accent); */
  /* background-image: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%); */
  background-position: 0 0, 50px 50px;
  background-size: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid white 1px;
  border-radius: var(--br-soft);
  background-color: #0000006e;
  padding: 1em;
  max-width: 30em;

  &::before{
    background-color: blue;
    width: 100px;
  }

  img{
    margin: 0 1em;
    /* aspect-ratio: 16/9; */
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  
  a{
    color: var(--c-txt-rev);
    /* outline: auto var(--c-accent); */
    text-decoration: none;
    flex: 1;
    transition: all .3s;

    &:hover, &:focus{
      opacity: .7;
      outline: none;
    }
  }

  .sub-title{
    color: var(--c-accent);
    word-spacing: 2ch;
    font-size: small;
    text-align: center;
  }
  
`

const StyledHeader = styled.header`
  position: relative;
  max-width: var(--maxWidth);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: rgb(138,93,192);
  background: linear-gradient(180deg, rgba(138,93,192,1) 0%, rgba(77,0,142,1) 100%);
  /* background-color: blue; */

  .logo-cont{

  }

  h1{
    /* font-size: 3rem; */
    background-color: var(--c-accent);
    text-shadow: #00000040 1px 1px 10px;
    padding: 0 1em;
    font-size: 1.5rem;
    width: 100%;
    display: flex;
    align-items: center;
  }

  h6{
    margin-bottom: 0;
  }

  .bar{
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }

  .util-menu{
    border-bottom: solid 1px var(--c-2, darkgrey);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .desktop-only{
    display: none;
  }

  @media (min-width: 1000px){
    .desktop-only{
      display: inherit;
    }
  }
  
`
