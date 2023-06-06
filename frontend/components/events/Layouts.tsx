import React, { ReactNode } from 'react'
import { Nav } from '../../components/menus/Nav'
// import { TableOfContents } from 'components/TableOfContents';
import { Footer } from '../../components/menus/Footer'
import { StyledMainCont } from '../../styles/elements/MainCont.styled'
import Header from '../Header'
import styled from 'styled-components'
import { AnnouncementsMarquee } from './AnnouncementsMarquee'
import ShoppingCart from '../ecommerce/ShoppingCart'


export function Layout_Wide_Width({ children }: { children: ReactNode }) {

  return (

    <StyledLayout_WideWith className='layout-wrap'>

      <AnnouncementsMarquee
        message={'custom marquee message that you can all read'}
        url={'/shop'}
        isActive={false}
      />

      <Header options={{
        isLogo: true,
        isSiteTitle: true,
      }}/>
     
      <Nav />


      <StyledMainCont>
        {children}
      </StyledMainCont>

      <Footer />

    </StyledLayout_WideWith>
  )
}

export function Layout_Just_Content({ children }: { children: ReactNode }) {

  return (

    <div className='layout-wrap'>

      {children}

    </div>
  )
}

const StyledLayout_WideWith = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--maxWidth);
  margin: 0 auto;
  
  header,
  main,
  nav#menu-main,
  footer{
    /* outline: dotted 1px purple; */
    /* border: dotted 1px purple; */
    width: 100%;
    /* overflow: hidden; */
  }

  header{
    position: sticky;
  }

  nav#menu-main{
    position: sticky;
    top: 0px;
    background-color: var(--c-3);
  }

  main{
    flex-grow: 1;
    padding-top: 1em;
  }

  

`