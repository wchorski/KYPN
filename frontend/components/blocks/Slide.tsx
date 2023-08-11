import Link from 'next/link'
import styled from 'styled-components'

function formatImgURL(url:string){
  // console.log('url img, ', url);
  if(url.match(/blob:/)) return url
  if( url.match(/data:/) || 
      url.match(/uploads\//)) return '/api' + url

  return url
}

export type tSlide = {
  id:number,
  template: number,
  color: string,
  title?: string,
  content?: any,
  bg?: string,
  excerpt?:string,
  buttonLink?: string,
  buttonText?: string,
}

export function Slide ({template, color, title, content, bg, excerpt, buttonLink, buttonText}:tSlide){


  return (
    <>  
      <StyledSlide 
        className={`styledSlide template--${String(template)}`}
        style={
          {  
            backgroundColor: color, 
            // backgroundImage: `url(${imgBG})`,
            // backgroundImage: `url(${media ? '/api' + media : ''})`,
            backgroundImage: `url(${bg ? formatImgURL(bg) : ''})`,
            imageRendering: 'pixelated',
            backgroundSize: "cover", 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }
          
        }
      >
        <div className={`template--${template}`}>
          
          <h3 className='title'>{title}</h3> 

          <p className='excerpt'>{excerpt}</p> 


          {buttonLink && (
            <Link href={buttonLink} className='button'>
              {buttonText}
            </Link>
          )}
  
        </div>

          {/* <ul className='meta-data'>
            <li>{author}</li>
            <li>{formatDate(dateMod)}</li>
            <li>{template}</li>
            <li>{category}</li>
          </ul> */}
      </StyledSlide>
    </>
  )
}

const StyledSlide = styled.div`

  background-color: grey;

  aspect-ratio: 16 / 9;
  /* display: flex; */
  width: 100%;
  /* // todo make this a variable that can be tweaked */
  height: 50em;
  position: relative;

  &:hover{
    box-shadow: black 2px 2px 12px;
  }

  /* .meta-data{
    font-size: 10px;
    color: rgba(255, 255, 255, 0.514);
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    list-style: none;
    padding: 1em;

    &:hover{
      background-color: black;
    }
  } */

  .template{

    /* standard */
    &--0{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: center;
      
      .title{
        margin: 0;
        padding: 0;
        color: white;
        text-shadow: 6px 6px 13px #000000;
        font-size: 3rem;
        text-align: center;
        margin-bottom: 2rem;
      }

      /* .slide-content{
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */

        p {
          background-color: #ffffffe4;
          color: black;
          /* font-size: 5rem; */
          width: 60ch;
          text-align: center;
          padding: 1em;
        }
        text-align: center;

        a.button{
          background-color: var(--c-primary);
          padding: 1em 2em;
          text-decoration: none;
          border-radius: 100px;
          /* margin-top: auto; */
          /* margin-bottom: 1em; */
          margin: 1em 0;
          text-align: center;
          max-width: 10em;
        }
      }
    /* } */
  }

`