import Link from "next/link"
import { ReactNode } from "react"
import { LuExternalLink } from "react-icons/lu";
import styled from "styled-components"

type InfoCard = {
  header:string,
  content?:string,
  children?:ReactNode,
  buttonLink:string,
  buttonLabel:string,
  imageSrc:string,
  color:string,
}

type Props = {
  items:InfoCard[]
}

export function ImageLinkList({items}:Props) {
  return (
    <StyledList>
      {items.map((item, i) => (
        <li key={i}>
          <Card item={item}/>
        </li>
      ))}
    </StyledList>
  )
}


function Card({item}:{item:InfoCard}){

  return (
    <StyledCard>

      {item.header && <h6>{item.header}</h6> }
      

      {item.buttonLink ? (
        <Link href={item.buttonLink} target="#" className="image-cont">
          <figure 
          // todo maybe do a blur?
            // style={{backgroundImage: `url(${item.imageSrc})`}}
          >
            <img src={item.imageSrc}/>
          </figure>
        </Link>
      ) : (
        <div className="image-cont">
          <figure 
          // todo maybe do a blur?
            // style={{backgroundImage: `url(${item.imageSrc})`}}
          >
            <img src={item.imageSrc}/>
          </figure>
        </div>
      )}

      {/* <div className="content">
        {item.content}
      </div> */}
      {item.buttonLink && (
        <Link href={item.buttonLink} target="#" className="button">
          {item.buttonLabel}
          <LuExternalLink />
        </Link>
      )}

    </StyledCard>
  )
}

const StyledList = styled.ul`
  display: flex;
  /* grid-template-columns: repeat(auto-fit,  minmax(450px, 1fr)); */
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
  list-style: none;
  padding: 0 1rem;

  li{
    min-width: 16rem;
    margin-bottom: 2rem;
    flex: 1;
  }
`

const StyledCard = styled.div`
  padding: 0;
  padding-bottom: 1em;
  
  /* border: solid 1px var(--c-desaturated); */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  /* overflow: hidden; */
  position: relative;

  h6{
    padding: 0 1rem;
    text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--c-txt-rev);
    border-radius: var(--br-soft);
    z-index: 1;
    margin: 0;
    border: solid 1px var(--c-txt);
    transition: all .5s;
  }

  figure{
    background-position: 50% 50%;
    background-size: cover;
    min-height: 250px;
    background-size: cover;
    margin: 0;
    transition: all .3s;
    padding-bottom: 1rem;
    /* filter: drop-shadow(1px 1px 3px white); */

    img{
      width: 250px;
    }
  }

  .content{
    padding: 0 1rem 1rem 1rem;
    flex: 1;
  }

  .image-cont{
    transition: all .3s;

    &:hover, &:focus{
      outline: none;
      /* opacity: .7; */
    }
  }

  a.button{
    margin: 0 auto;
    margin-top: auto;
    max-width: 10rem;
    /* padding: 0 1rem; */
    text-align: center;
    position: absolute;
    bottom: 5px;

    svg{
      margin-left: .7rem;
    }
  }



  &:hover{
    /* border: solid 1px var(--c-accent) ; */
    border-radius: var(--br-dull);

    h6{
      color: var(--c-accent);
      top: -5px;
    }
    figure{
      background-position: 20% 80%;
      transform: scale(1.03);
    }
  }
`