// docs - https://react-slick.neostack.com/docs/api
// cred - https://stackoverflow.com/questions/49028877/slick-carousel-force-slides-to-have-the-same-height
import * as React from 'react';
// todo add back when slick slider is `yarn add`
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import styles from '@styles/blocs/slider.module.scss'
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { ReactNode } from 'react';

const sliderDefaults = {
  accessibility: true,
  fade: false,
  dots: true,
  appendDots: (dots:any) => <ul className='dot-cont'>{dots}</ul>,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000 * 4,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnFocus: true,
  pauseOnHover: true,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  // centerMode: true,
  pauseOnDotsHover: true,
  adaptiveHeight: false,
  // appendDots: () => <ul>{'o'}</ul>,
}

type Settings = {
  fade: boolean,
  dots: boolean,
  // appendDots: '#dot-cont',
  infinite: boolean,
  autoplay: boolean,
  autoplaySpeed: number,
  speed: number,
  slidesToShow: number,
  slidesToScroll: number,
  pauseOnFocus: boolean,
  pauseOnHover: boolean,
}

type Props = {
  settings?:Settings,
  // slides: tSlide[],
  children?: ReactNode,
  items?: {
    title?: string,
    excerpt?: string,
    color: string,
    imageSrc?: string,
    template?: number,
    buttonLink?: string,
    buttonText?: string,
    
  }[];
}

export default function SliderSlick({items = [], settings = sliderDefaults, children}:Props) {
  
  const settingsCat = {...sliderDefaults, ...settings}

  return (
    <div className={styles.slider_wrap} >
      {/* <Slider {...settingsCat}>

        {items.map( (s, i) => (
          <Slide 
            id={i}
            key={i}
            bg={s.imageSrc}
            content={null}
            color={s.color}
            excerpt={s.excerpt}
            buttonLink={s.buttonLink}
            buttonText={s.buttonText}
            template={s.template || 0}
            title={s.title}
            
          />
        ))}
        {children}

      </Slider> */}
    </div>
  )
}

function PrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className + ' arrow-cont'}
      onClick={onClick}
      style={{ ...style, 
        display: "block", 
        fontSize: '4em', 
        zIndex: '10' ,
        left: '0',
      }}
      >
      <BiLeftArrow style={{
        position: 'absolute',
        left: '0rem',
        transform: 'translateY(-50%)',
      }}/>
    </button>
  );
}

function NextArrow(props:any) {
  const { className, styles, onClick } = props;
  return (
    <button
      className={className + ' nextArrw'}
      onClick={onClick}
      style={{ ...styles, 
        display: "block", 
        fontSize: '4em', 
        zIndex: '10' ,
        right: '0',
      }}
      >
      <BiRightArrow style={{
        position: 'absolute',
        right: '0rem',
        transform: 'translateY(-50%)',
      }}/>
    </button>
  );
}
