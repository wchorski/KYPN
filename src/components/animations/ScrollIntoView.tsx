import type { ReactNode } from "react"
import { scroll_into_view } from "@styles/animations/scrollIntoView.module.css"

type Props = {
	children: ReactNode
	delay?: number
}

export function ScrollIntoView({ children, delay = 0 }: Props) {
	return (
		<div className={scroll_into_view} style={{ animationDelay: `${delay}s` }}>
			{children}
		</div>
	)
}

//? old with JS observer
// import { ReactNode, useEffect, useRef } from "react";
// import styled from "styled-components";

// type Props = {
//   delay?: number,
//   children?:ReactNode|ReactNode[],
// }

// export function ScrollAnim({ delay = 0, children}:Props) {
//   const animateBoxRef = useRef(null);

//   useEffect(() => {
//     const options = {
//       root: null,
//       threshold: 0.5,
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           // @ts-ignore
//           animateBoxRef.current.classList.add('reveal');
//           observer.unobserve(entry.target);
//         }
//       });
//     }, options);

//     if (animateBoxRef.current) {
//       observer.observe(animateBoxRef.current);
//     }

//     return () => {
//       if (animateBoxRef.current) {
//         observer.unobserve(animateBoxRef.current);
//       }
//     };
//   }, []);

//   return (
//     <StyledScrollAnim
//       ref={animateBoxRef}
//       className="scroll-anim"
//       style={{
//         transitionDelay: String(delay) + 'ms'
//       }}
//     >
//       {children}
//     </StyledScrollAnim>
//   );
// }

// const StyledScrollAnim = styled.div`

//   transform: translateX(-3%);
//   opacity: 0;
//   transition: all 1s;

//   &.reveal {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `
