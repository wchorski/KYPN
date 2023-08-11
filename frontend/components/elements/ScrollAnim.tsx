import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
  children?:ReactNode|ReactNode[]
}

export function ScrollAnim({children}:Props) {
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
    <StyledScrollAnim className="scroll-anim" ref={animateBoxRef}>
      {children}
    </StyledScrollAnim>
  );
}

const StyledScrollAnim = styled.div`

  transform: translateX(-3%);
  opacity: 0;
  transition: opacity, transform, 1s;
  

  &.reveal {
    opacity: 1;
    transform: translateX(0);
  }
`