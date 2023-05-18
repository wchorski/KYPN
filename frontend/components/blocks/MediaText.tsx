import Image from "next/image";
import styled from "styled-components";
import { BlockRenderer } from '../../components/blocks/BlocksRenderer';

// const bg = `https://i.pinimg.com/originals/13/3b/75/133b756e50d32b13e227cdf62bad3cb7.jpg`

type Props = {
  mediatext: tMediaText
}

type tMediaText = {
  bg: string,
  mediaWidth: string,
  rowReverse: boolean,
  content: {
    document: any[]
  },
}

export function MediaText({mediatext}:Props) {

  function handleContentRender(content:any){
    return <BlockRenderer document={content.document} />
  }
  
  return (
    <StyledMediaText bg={mediatext.bg} rowReverse={mediatext.rowReverse}>
      <div className="text-cont">

        {handleContentRender(mediatext.content)}

      </div>

      <div>
        <figure>
          <Image 
            src={mediatext.bg}
            width={100}
            height={100}
            alt="accompaning image"
          />
        </figure>
      </div>
    </StyledMediaText>
  )
}


const StyledMediaText = styled.div<{bg:string, rowReverse:boolean}>`
  display: flex;
  flex-direction: ${p => (p.rowReverse ? 'row-reverse' : 'row')};
  flex-wrap: wrap;

  > * {
    width: 50%;
    min-width: 20em;
  }

  .text-cont{

    article > * {
      margin: 0;
      padding: 2em;
    }

    article > *:nth-child(odd){
      background-color: var(--c-2);
    }
    article > *:nth-child(even){
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
    background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
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