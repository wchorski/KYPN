// cred - Kevin Powell - https://www.youtube.com/watch?v=Z-3tPXf9a7M&t=388s
// cred - Andy Merskin - https://codepen.io/andymerskin/details/XNMWvQ
import Link from "next/link"
import { useState } from "react";
import styled from "styled-components"

type InfoCard = {
  title:string,
  content:string,
  link:string,
  bg:string,
  color:string,
}

type MousePosition = {
  x: number;
  y: number;
}

export function InfoCard({content, link, title, bg, color}:InfoCard) {

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleRotation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    
    
    const relativeX = ((x / width) - 0.5) * 2;
    const relativeY = ((y / height) - 0.5) * -2;
    // console.log(relativeX,relativeY);

    const amplifiy = 10;
    const clampedX = parseFloat(relativeX.toFixed(1)) * amplifiy;
    const clampedY = parseFloat(relativeY.toFixed(1)) * amplifiy;

    setMousePosition({ x: clampedX, y: clampedY });
  }

  const  handleMouseLeave = () => {
    const mouseLeaveDelay = setTimeout(()=>{
      setMousePosition({x:0,y:0})
    }, 500);
  }

  return (
    <StyledInfoCard 
      bg={bg} 
      color={color} 
      mousePosition={mousePosition}
      onMouseMove={handleRotation}
      onMouseLeave={handleMouseLeave}
    >
      {/* <div className="bg"></div> */}

      <h4> {title} </h4>

      <div className="container">
        <p>{content}</p>
        {/* <p>x: {mousePosition.x}, y: {mousePosition.y}</p> */}
        <Link href={link} className="button"> view more </Link>
      </div>
      

    </StyledInfoCard>
  )
}

const StyledInfoCard = styled.article<{bg:string, color:string, mousePosition:{x:number,y:number}}>`


  --rot-x: ${p => p.mousePosition.x}deg;
  --rot-y: ${p => p.mousePosition.y}deg;
  /* --rot-xoff: ${p => p.mousePosition.x * -.5}deg; */
  /* --rot-yoff: ${p => p.mousePosition.y * -.5}deg; */

  border-radius: 1em;
  margin: 1em;
  padding: 1em 1em;

  max-width: 25em;
  position: relative;
  
  /* overflow: hidden; */
  transition: transform .1s ease-in-out;
  transform-style: preserve-3d;
  transform: 
    perspective(5000px) 
    rotateY(var(--rot-x)) 
    rotateX(var(--rot-y));
  
  
  .container{
    background-color: ${p => p.color};
    padding: 1em;
    border-radius: 1em;
  }

  h4{
    color: var(--c-txt-rev);
    font-size: 2rem;
    text-align: center;
    text-shadow: 4px 2px 20px white;
  }

  a.button{
    box-shadow: #9c9c9c -4px 3px 9px 3px;
  }

  /* .bg{
    background-color: ${p => p.color};
    background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
    background-position: center;
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    transform: translateZ(-40px) rotateX(var(--rot-xoff)) rotateY(var(--rot-yoff)) scale(1.4);
  } */

  &::before, &::after{
    content: '';
    position: absolute;
    border-radius: inherit;
  }

  &::before{
    inset: 0.75rem;
    background: #343434;
    transform: translateZ(-49px);
    filter: blur(5px);
    opacity: .7;
  }

  &::after{
    inset: -1rem;
    background-color: ${p => p.color};
    background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
    background-position: center;
    background-size: cover;
    transform: translateZ(-50px);
    box-shadow: #00000070 7px 9px 16px 7px;
  }

  @media (max-width: 500px){
    padding: 1em 0;
  }
`