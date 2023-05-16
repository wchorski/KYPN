import Image from "next/image";
import styled from "styled-components";

const bg = `https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg`

export default function MediaText() {

  
  return (
    <StyledMediaText bg={bg}>
      <div className="text-cont">
        <h3>Whats the Pitch?</h3>
        <p>{"Pitch!? Please… we don’t hire salespeople, we don’t use gimmicks and we don’t have a ‘sales pitch’. We hire real DJs, we shoot straight and we let our work speak for itself (see our raves). Weddings, clubs, bars and more… we’ve ‘been there, DJ’d that’. Be it a graceful and traditional dinner reception, an all-out floor-shaking dance party or both, we’ve got a performer that will bring the vibe that’s right for you!"}</p>
      </div>

      <div>
        <figure>
          <Image 
            src={bg}
            width={100}
            height={100}
            alt="accompaning image"
          />
        </figure>
      </div>
    </StyledMediaText>
  )
}


const StyledMediaText = styled.div<{bg:string}>`
  display: flex;

  > * {
    width: 50%;
  }

  .text-cont{

    > * {
      margin: 0;
      padding: 2em;
    }

    > *:nth-child(odd){
      background-color: var(--c-2);
    }
    > *:nth-child(even){
      background-color: var(--c-3);
    }

    h3{
      text-align: center;
      /* padding: 3em 0; */
    }
  }

  figure{
    background: blue;
    margin: 0;
    /* background-image: url('https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg'); */
    background-image: ${p => (p.bg ? `url(${bg})` : '')};
    background-position: 50% 50%;
    background-size: cover;
    height: 100%;
    min-height: 250px;
  }

  img{
    /* width: 100%; */
    /* height: 100%; */
    width: 1px;
    height: 1px;
  }

  /* // todo media query column */
  /* // todo property that flips text-media media-text */

`