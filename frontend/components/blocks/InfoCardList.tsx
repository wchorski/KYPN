import Link from "next/link"
import { ReactNode } from "react"
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

export function InfoCardList({items}:Props) {
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
      <header>
        <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure>
        <h3>{item.header}</h3>
      </header>

      <div className="content">
        {item.content}
      </div>

      <Link href={item.buttonLink} className="button">{item.buttonLabel}</Link>
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
  padding: 0 1rem;
  list-style: none;

  li{
    min-width: 16rem;
    flex: 1;
  }
`

const StyledCard = styled.article`
  padding: 0;
  padding-bottom: 1em;
  border: solid 1px var(--c-desaturated);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all .3s;
  overflow: hidden;

  h3{
    padding: 0 1rem;
    margin-bottom: 0;
  }

  figure{
    background-position: 50% 50%;
    background-size: cover;
    min-height: 250px;
    background-size: cover;
    margin: 0;
    transition: all .3s;
  }

  .content{
    padding: 0 1rem 1rem 1rem;
    flex: 1;
  }

  a.button{
    margin: 0 auto;
    margin-top: auto;
    max-width: 10rem;
    padding: 0 2rem;
    text-align: center;
  }

  &:hover{
    border: solid 1px var(--c-accent) ;
    border-radius: var(--br-dull);

    h3{
      color: var(--c-accent);
    }
    figure{
      background-position: 20% 80%;
    }
  }
`