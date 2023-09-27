import Link from 'next/link'
import styles from '@styles/blocs/slider.module.scss'

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
      <div className={[styles.slide, styles[`template_${template}`]].join(' ')}  
        // className={`styledSlide template--${String(template)}`}
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
      </div>
    </>
  )
}