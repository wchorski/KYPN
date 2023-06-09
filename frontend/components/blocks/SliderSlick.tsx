// docs - https://react-slick.neostack.com/docs/api

import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide, tSlide } from "./Slide";
import styled from 'styled-components';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

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
  items: {
    title?: string,
    excerpt?: string,
    color: string,
    imageSrc?: string,
    template?: number,
    buttonLink?: string,
    buttonText?: string,
  }[];
}

export default function SliderSlick({items = [], settings = sliderDefaults}:Props) {
  

  return (
    <StyledSlickSlider {...settings}>

    {/* <Slider {...settings}> */}

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

    {/* </Slider> */}

    </StyledSlickSlider>
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
        
      }}
      >
      <BiLeftArrow style={{
        position: 'absolute',
        left: '2rem',
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
      }}
      >
      <BiRightArrow style={{
        position: 'absolute',
        right: '2rem',
        transform: 'translateY(-50%)',
      }}/>
    </button>
  );
}

const StyledSlickSlider = styled(Slider)`
  .slick-track{
    display: flex;
    

    /* .slick-prev, .slick-next{
      z-index: 10;
      color: var(--c-accent);
    } */

    /* .slick-prev svg{
      color: limegreen;
    }

    .slick-prev:before{
      content: '<';
      left: 1em;
      font-size: 4rem;
      color: blue !important;
    }
    .nextArrw:before{
      content: '<<<<<';
      right: 1em;
      color: red !important;
    } */
  }

  .slick-slide{
    margin: auto 0;
  }

  .slick-arrow{
    box-shadow: black 2px 2px 3px;
    color: white;
    font-size: 2rem;
  }

  .slick-arrow::before{
    content: '';
  }

  .slick-dots{
    bottom: 10px;

    button::before{
      /* color: red; */
      font-size: 15px;
    }

    li.slick-active button::before{
      color: white;
    }
  }
`