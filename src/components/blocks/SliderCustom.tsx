// cred - https://github.com/monsterlessonsacademy/monsterlessonsacademy/blob/278-advanced-react-slider/src/ImageSlider.js
import styles from '@styles/blocs/slidercustom.module.scss'
import { useCallback, useEffect, useRef, useState } from "react";

const slideStyles = {
  width: "100%",
  // height: "500px",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
}

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
}

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
}

const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-out 0.3s",
}

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
}


type Props = {
  slides: Slide[]
  parentWidth: number,
}

type Slide = {
  title: string,
  text: string,
  url: string,
}

export function Slider({ slides, parentWidth }:Props){

  const timerRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    console.log('next slide');
    
    setCurrentIndex(newIndex);
  }, [currentIndex, slides])

  const goToSlide = (slideIndex:number) => {
    setCurrentIndex(slideIndex);
  }

  const getSlideStylesWithBackground = (slideIndex:number) => ({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex].url})`,
    width: `${parentWidth}px`,
  })

  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  })


  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div className={styles.slider}  >
      <div>

        <button onClick={goToPrevious} className={[styles.arrow, styles.left].join(' ')}>
          ❰
        </button>
        <button onClick={goToNext} className={[styles.arrow, styles.right].join(' ')}>
          ❱
        </button>
      </div>

      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              style={getSlideStylesWithBackground(slideIndex)}
            >
              <h3>{_.title}</h3>
              <p>{_.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <button
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </button>
        ))}
      </div>
    </div>
  );
}