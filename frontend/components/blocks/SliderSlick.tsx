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
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000 * 4,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnFocus: true,
  pauseOnHover: true,
  // arrows: true,
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
  settings:Settings,
  slides: tSlide[],
  items: {
    title: string,
    excerpt: string,
    color: string,
    imageSrc: string,
    template: number,
    buttonLink: string,
    buttonText: string,
  }[];
}

export default function SliderSlick({items = [], settings = sliderDefaults, slides}:Props) {
  

  return (
    <StyledSlickSlider>
    <Slider {...settings}>

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

    </Slider>
    </StyledSlickSlider>
  )
}

function PrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, 
        display: "block", 
        fontSize: '4em', 
        zIndex: '10' ,
        color: 'var(--c-accent)',
        // transform: 'translateY(-50%)',
      }}
    >
      <BiLeftArrow style={{
        position: 'absolute',
        left: '2rem',
      }}/>
    </div>
  );
}

function NextArrow(props:any) {
  const { className, styles, onClick } = props;
  return (
    <div
      className={className + ' nextArrw'}
      onClick={onClick}
      style={{ ...styles, 
        display: "block", 
        fontSize: '4em', 
        zIndex: '10' ,
        color: 'var(--c-accent)',
        // transform: 'translateY(-50%)',
      }}
    >
      <BiRightArrow style={{
        position: 'absolute',
        right: '2rem',
      }}/>
    </div>
  );
}

const StyledSlickSlider = styled.div`
  .slick-track{
    display: flex;


    .slick-slide{
      margin: auto 0;
    }

    .slick-arrow{
      box-shadow: black 2px 2px 3px;
      font-size: 2rem;
    }

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
`