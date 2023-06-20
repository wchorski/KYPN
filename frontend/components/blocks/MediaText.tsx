import Image from "next/image";
import styled from "styled-components";
import { ReactNode } from "react";

// const bg = `https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg`

type Props = {
  mediatext: tMediaText
}

export type tMediaText = {
  imageSrc?: string,
  imageAlt?:string,
  mediaWidth?: string,
  rowReverse?: boolean,
  content?: ReactNode,
  children?: ReactNode,
}
// type tMediaText = {
//   bg: string,
//   mediaWidth: string,
//   rowReverse: boolean,
//   content: {
//     document: any[]
//   },
// }

export function MediaText({imageSrc, imageAlt, content, rowReverse = false, children}:tMediaText) {
  
  // console.log(rowReverse);
  
  
  return (
    <StyledMediaText bg={imageSrc} rowReverse={rowReverse}>
      <div className="content-cont">
        <article>
          {content}
          {children}
        </article>

      </div>

      <div className="media-cont">
        <figure>
          <Image 
            src={imageSrc || ''}
            width={100}
            height={100}
            alt={imageAlt || 'no alt caption'}
          />
        </figure>
      </div>
    </StyledMediaText>
  )
}


const StyledMediaText = styled.div<{bg?:string, rowReverse:boolean}>`
  display: flex;
  flex-direction: ${p => (p.rowReverse ? 'row-reverse' : 'row')};
  /* flex-wrap: wrap; */

  > * {
    /* flex-grow: 0; */
    flex: 1;
  }
  
  .media-cont{
    /* container-type: inline-size; */
    /* width: 50%; */
  }
  
  .content-cont{
    /* container-type: inline-size; */
    /* width: 50%; */
  }

  .content-cont{

    article{
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    article > * {
      margin: 0;
      padding: 2em ;
    }

    article > *:nth-child(odd){
      background-color: var(--c-light);
    }
    article > *:nth-child(even){
      background-color: var(--c-3);
    }

    h2, h3{
      text-align: center;
      /* font-size: 4rem; */
      text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* p{
      max-width: 60ch;
      min-width: 20ch;
    } */
  }

  figure{
    background: blue;
    margin: 0;
    /* background-image: url('https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg'); */
    background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
    background-position: 50% 50%;
    background-size: cover;
    height: 100%;
    min-height: 20rem;
  }

  img{
    /* width: 100%; */
    /* height: 100%; */
    width: 1px;
    height: 1px;
  }

  /* // todo media query column */
  @media screen and (max-width: 500px){
    flex-direction: column;

    .content-cont, .media-cont{
      width: 100%;
    }
  }

`