import { carousel, carouselImage, carouselItem, title } from '@styles/blocs/carousel.module.css';
import React from 'react';

type CarouselProps = {
  items: {
    title: string;
    imageSrc: string;
  }[];
};

export function Carousel({ items = [] }: CarouselProps) {
  return (
    <div className={carousel}>
      {items.map((item, i) => {
        return (
          <figure key={i} className={carouselItem}>
            <img role="presentation" src={item.imageSrc} className={carouselImage} alt={`${item.title} video thumbnail`} />
            <figcaption className={title}>{item.title}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

// const StyledCarousel = styled.div`
//   &.carousel {
//     overflow-y: scroll;
//     scroll-snap-type: y mandatory;
//     display: grid;
//     grid-gap: 8px;
//     grid-template-columns: repeat(4, minmax(min(100%, 640px), 100%));
//     grid-auto-flow: column;
//   }

//   .carouselItem {
//     scroll-snap-align: center;
//     scroll-snap-stop: always;
//     padding: 8px;
//     box-sizing: border-box;
//     border-radius: 6px;
//     background: #eff3f6;
//   }

//   .carouselImage {
//     object-fit: cover;
//     object-position: center center;
//     height: 320px;
//     width: 100%;
//     border-radius: 4px;
//   }

//   .title {
//     font-size: 1.25rem;
//     line-height: unset;
//     margin-top: 8px;
//   }
// `