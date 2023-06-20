import Link from "next/link"
import styled from "styled-components"
import { SocialLinkNav } from "../blocks/SocialLinkNav"

// col 1
// contact
// social

// col 2
// Packages

// col3
// repeate navigation

// bottom
// privacy policy
// terms
// copy write

export function Footer() {
  return (
    <StyledFooter>

      <div className="top">

        <div className="col">
          <h3>Contact</h3>
          <ul>
            <li><Link href={`tel:1234567890`}> (123) 456-7890) </Link></li>
            <li><Link href={`mailto:info@partyvibeonline.com`}> info@partyvibeonline.com </Link></li>
            <li>
              <SocialLinkNav 
                color="var(--c-accent)" 
                instagram="https://instagram.com/partyvibeonline"
                facebook="https://facebook.com/partyvibeonline"
                bandlab="https://bandlab.com/partyvibeonline"
              />
            </li>
          </ul>
        </div>
        
        <div className="col">
          <h3>Packages</h3>
          <ul>
            <li><Link href={`/mitzvah`}> Bar / Bat Mitzvah </Link></li>
            <li><Link href={`/weddings`}> Weddings </Link></li>
            <li><Link href={`/quinces`}> Quincenera </Link></li>
          </ul>
        </div>

        <div className="col">
          <h3>Pages</h3>
          <ul>
            <li><Link href={`/contact`}> Contact Us </Link></li>
            <li><Link href={`/booking`}> Book a Service </Link></li>
            <li><Link href={`/mixes`}> DJ Mixes </Link></li>
            <li><Link href={`/events`}> Events </Link></li>
          </ul>
        </div>

      </div>

      <div className="bot">

        <div className="col">
          <ul>
            <li>© 2023 PartyVibeOnline All Rights Reserved</li>
          </ul>
        </div>

        <div className="col">
          <ul>
            <li><Link href={`/terms`}> Terms & Conditions </Link></li>
            <li><Link href={`/privacy`}> Privacy Policy </Link></li>
          </ul>
        </div>

      </div>

      <div className="poweredby">
        <ul>
          <li>powered by <Link href={`https://www.tawtaw.site`}> {"There's a Will There's a Website"}</Link> </li>
        </ul>
      </div>


    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  /* background-color: green; */
  max-width: var(--maxWidth);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;
  color: var(--c-txt-rev);

  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .top{
    background-color: var(--c-dark);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding:  1rem;

    h3{
      margin-bottom: 0;
    }
  }

  .bot{
    padding:  1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul{
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;

      li::after{
        content: '•';
        color: var(--c-dark);
        margin-left: .5rem;
      }
      li:last-child::after{
        content: '';
      }
    }
  }

  .poweredby{
    padding: .5rem;
    background-color: #303030;
    text-align: center;

    li{
      opacity: .7;
      color: white;
    }

    a{
      color: #57b895;
    }
  }

  /* &::before{
    content: 'before';
  } */
  &::after{
    content: '';
    background-color: var(--c-desaturated);
    /* background: 
      linear-gradient(90deg, 
        var(--c-bg) 0%, 
        var(--c-3) 25%, 
        var(--c-3) 75%, 
        var(--c-bg) 100%); */
    position: absolute;
    z-index: -1;
    inset: 0px;
    /* transform: scaleX(3); */
  }
`