'use client'
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from '@styles/blocs/scrollreveal.module.scss'

type Props = {
  delay?: number,
  children?:ReactNode|ReactNode[],
}

export function ScrollAnim({ delay = 0, children}:Props) {
  const animateBoxRef = useRef(null);
  const [stylesState, setStylesState] = useState<string>([styles.wrapper].join(' '))

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // @ts-ignore
          // animateBoxRef.current.classList.add('reveal');
          setStylesState([styles.wrapper, styles.reveal].join(' '))

          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (animateBoxRef.current) {
      observer.observe(animateBoxRef.current);
    }

    return () => {
      if (animateBoxRef.current) {
        observer.unobserve(animateBoxRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={animateBoxRef} 
      className={stylesState} 
      style={{
        transitionDelay: String(delay) + 'ms'
      }}
    >
      {children}
    </div>
  );
}