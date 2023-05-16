// docs - https://react-slick.neostack.com/docs/api

import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide, tSlide } from "./Slide";
import styled from 'styled-components';


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
}

export default function SliderSlick({settings, slides}:Props) {

  return (
    <StyledSlickSlider>
    <Slider {...settings}>

      {slides.map( s => (
        <Slide 
          bg={s.bg}
          color={s.color}
          content={null}
          excerpt={s.excerpt}
          button={s.button}
          id={s.id}
          template={s.template}
          title={s.title}
          key={s.id}
        />
      ))}

    </Slider>
    </StyledSlickSlider>
  )
}

const StyledSlickSlider = styled.div`
  .slick-track{
    display: flex;


    .slick-slide{
      margin: auto 0;
    }
  }
`