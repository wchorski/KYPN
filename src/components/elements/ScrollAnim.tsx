'use client'
import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import styles from '@styles/blocs/scrollreveal.module.scss'

type Props = {
  delay?: number,
  children?:ReactNode|ReactNode[],
}

export function ScrollAnim({ delay = 0, children}:Props) {
  const animateBoxRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // @ts-ignore
          animateBoxRef.current.classList.add('reveal');
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
      className={styles.wrapper} 
      style={{
        transitionDelay: String(delay) + 'ms'
      }}
    >
      {children}
    </div>
  );
}