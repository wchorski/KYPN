import React, { ReactNode } from 'react'
import { Nav } from '../menus/Nav'
import { Footer } from '../menus/Footer'
import { StyledMainCont } from '../../styles/elements/MainCont.styled'
import styled from 'styled-components'
import { AnnouncementsMarquee } from './AnnouncementsMarquee'
import ShoppingCart from "@components/ecommerce/ShoppingCart";

import { fontHeader, fontParagraph, fontExo, fontSub } from "../../styles/fonts";

export function Layout_Wide_Width({ children }: { children: ReactNode }) {

  return (<>
     
    <StyledLayout_WideWith className={`layout-wrap ${fontHeader.variable} ${fontSub.variable} ${fontParagraph.variable}`}>

      <AnnouncementsMarquee />

      <Nav />
      <ShoppingCart />


      <StyledMainCont>
        {children}
      </StyledMainCont>

      <Footer />

    </StyledLayout_WideWith>

    {/* <div className="bg-canvas" 
      style={{
        position: 'fixed', 
        top: '0', 
        left: '0',
        zIndex: '-10',
        background: 'yellow',
        height: '10%',
      }}>
      <VectorGPT />
    </div> */}

  </>)
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
  /* max-width: var(--maxWidth); */
  margin: 0 auto;
  min-height: 100%;
  
  > header,
  main,
  nav#menu-main,
  footer{
    /* outline: dotted 1px purple; */
    /* border: dotted 1px purple; */
    width: 100%;
    /* overflow: hidden; */
    .container{
      max-width: var(--maxWidth);
      margin: 0 auto;
      width: 100%;
    }
  }

  header{
    position: sticky;
  }

  footer{
    margin-top: auto;
  }

  nav#menu-main{
    position: sticky;
    bottom: 0;
    top: 0px;
    /* height: 10em; */
  }

  main{
    flex-grow: 1;
    /* padding-top: 1em; */
  }

  

`