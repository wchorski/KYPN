import Link from "next/link"
import { ReactNode } from "react"
import styled from "styled-components"
import moneyFormatter from "../../lib/moneyFormatter"
import { formatHours } from "../../lib/dateFormatter"

type Props = {
  items: {
    title:string,
    imageSrc:string,
    buttonLink:string,
    buttonLabel:string,
    content:ReactNode,
    price:number,
    service: { data:{
      id:string,
      name:string,
      price:number,
      durationInHours:string,
    }}
  }[]
}

export function PriceTable({items = []}:Props) {
  console.log(items[0].service.data.name);
  
  return (<>
    <StyledPriceTable>
      <thead>
        <tr>
          {items.map((item, i) => (
            <th key={i}>
              <StyledHeader>
                <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure>
                <h3>{ item.title || item.service.data.name}</h3>
              </StyledHeader>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          {items.map((item,i) => (
            <td 
              key={i}
              data-title={item.service.data.name} 
              data-price={moneyFormatter(item.service.data.price)} 
              data-button={item.buttonLabel}
            > 
              <StyledHeader className="mobile-only">
                <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure>
                <h3>{item.title || item.service.data.name}</h3>
                <div className="meta">
                  <h6 className="price"> {moneyFormatter(item.service.data.price)} </h6> 
                  <span>{formatHours(item.service.data.durationInHours) } <small>hours</small></span>
                </div>
                <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link>
              </StyledHeader>

              <StyledContent>
                {item.content}
              </StyledContent>
            </td>
          ))}
        </tr>
      </tbody>

      <tfoot>
        <tr>
          {items.map((item,i) => (
            <td key={i}>
              <StyledFooter>
                <div className="meta">
                  <span> <strong>{formatHours(item.service.data.durationInHours)}</strong>  <small>hours</small></span>
                  <h6 className="price"> {moneyFormatter(item.service.data.price)} </h6> 
                </div>
   
                {/* <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link> */}
                <Link href={`/booking?serviceId=${item.service.data.id}`} className="button"> {item.buttonLabel}  </Link>
              </StyledFooter>
            </td>
          ))}
        </tr>
      </tfoot>
    </StyledPriceTable>

    {/* <StyledPriceList>
      {items.map(item => (
        <StyledPriceItem imageSrc={item.imageSrc}>
          <header>
            <figure></figure>
            <h3>{item.title}</h3>
          </header>

          <div className="content">
            {item.content}
          </div>
          
          <footer>
            <h6 className="price"> {moneyFormatter(2034000)} </h6>
            <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link>
          </footer>
        </StyledPriceItem>
      ))}
    </StyledPriceList> */}
  </>)
}

const StyledPriceTable = styled.table`

  --border: solid 1px var(--c-3);
  border-collapse: separate;
  overflow: hidden;
  position: relative;
  margin: 1rem auto;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: rgba(255, 255, 255, 0.03);
    z-index: 1;
    transform: skewY(-5deg) scale(1.5);
    pointer-events: none;
  }

  th, td{
    vertical-align: top;
  }

  th{
    border-top: var(--border);
    border-radius: var(--br-dull) var(--br-dull) 0 0 ;
  }
  tfoot td{
    border-bottom: var(--border);
    border-radius: 0 0 var(--br-dull) var(--br-dull);
  }
  td, th{
    border-left: var(--border);
    border-right: var(--border);
    padding: 0;
    /* border-bottom: var(--border); */
    /* border-radius: var(--br-dull); */
  }

  .mobile-only{display: none; }

  @media (max-width: 650px) {

    thead, tfoot{
      display: none;
    }

    td{
      display: grid;
      color: var(--c-txt);
      /* grid-template-columns: 15ch auto; */
      gap: .5rem;
      padding: 0.5rem 1rem;
    }

    td:first-child{
      padding-top: 2rem;
    }
    td:last-child{
      padding-bottom: 2rem;
    }
    

    td{
      border-bottom: var(--border);
      border-top: var(--border);
      border-radius: var(--br-dull);
      margin-bottom: 4em;
    }

    a.button{
      padding: 1rem;
    }

    .price{
      font-size: 2rem;
      margin: 1rem;
      text-align: center;
      display: inline-block;
    }

    .mobile-only{display: block; }

    /* td::before {
      content: attr(data-title);
      background-color: var(--c-3);
      text-align: center;
      border-radius: var(--br-dull);
      font-weight: 700;
      text-transform: capitalize;
    }
    td::after {
      content: attr(data-price);
      background-color: var(--c-3);
      text-align: center;
      border-radius: var(--br-dull);
      font-weight: 700;
      text-transform: capitalize;
    } */
  }
`

const StyledHeader = styled.header`
  /* display: block !important; */
  /* background: transparent !important; */
  .meta{
    text-align: center;
  }

  figure{
    /* width: 100%; */
    height: 10rem;
    margin: 0;
    background-color: red;
    border-bottom: solid 5px var(--c-3);
    background-size: cover;
  }

  h3{
    background-color: var(--c-3);
    box-shadow: 1px 1px 1px black;
    text-align: center;
    margin: 0 1rem;
    margin-top: -1rem;
    margin-bottom: 1em;
    padding: .6rem;
    border-radius: var(--br-dull);
    font-size: 1rem;
  }
`

const StyledFooter = styled.footer`
  padding: 1rem;
  margin-top: auto;

  .meta{
    color: var(--c-txt);
    text-align: right;
  }
  .price{
    font-size: 1.5rem;
    margin: 0;
  }
`

const StyledContent = styled.div`
  padding: 1rem;
  padding-top: 0;
  color: var(--c-txt);

  ul{
    list-style-image: url('/assets/bullet.svg');
  }
  ol{
    list-style-image: initial;
    list-style-type: lower-alpha;

    li{
      margin-bottom: 1rem;
    }
    li::marker{
      color: var(--c-accent);
    }
  }
  
  p, li{
    /* font-size: .7em; */
  }

  li{
    margin-bottom: .5rem;
    line-height: 1rem;
  }
  
  ul, ol{
    margin: 0;
    padding: .7rem;
  }
`

const StyledPriceList = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit,  minmax(250px, 1fr));
  padding: 0;
  /* font-size: 10px; */


`

const StyledPriceItem = styled.li<{imageSrc:string}>`
  background-color: var(--c-bg);
  border: solid 1px var(--c-3);
  border-radius: var(--br-sharp);
  display: flex;
  flex-direction: column;

  header{
    display: block !important;
    background: transparent !important;
    /* min-height: 30em; */
  }

  figure{
    /* width: 100%; */
    height: 10rem;
    margin: 0;
    background-color: red;
    border-bottom: solid 5px var(--c-3);
    background-image: ${p => `url( ${p.imageSrc} )`};
    background-size: cover;
  }

  h3{
    background-color: var(--c-3);
    box-shadow: 1px 1px 1px black;
    text-align: center;
    margin: 0 1rem;
    margin-top: -1rem;
    margin-bottom: 1em;
    padding: .6rem;
    border-radius: var(--br-dull);
    font-size: 1rem;
  }

  .content{
    padding: 1rem;
    color: var(--c-txt);
    
    p, li{
      /* font-size: .7em; */
    }

    li{
      margin-bottom: 1rem;
    }
    
    ul, ol{
      padding: .7rem;
    }
  }


  
  footer{
    padding: 1rem;
    margin-top: auto;

    .price{
      text-align: right;
      font-size: 1.5rem;
      margin: 1rem 0;
    }
  }

  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: rgba(255, 255, 255, 0.03);
    z-index: 1;
    transform: skewY(-5deg) scale(1.5);
  }
`