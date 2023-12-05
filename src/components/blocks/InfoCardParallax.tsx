// cred - Andy Merskin - https://codepen.io/andymerskin/details/XNMWvQ

import { useRef, useState } from "react"


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

export function InfoCardParallax({content, link, title, bg, color}:InfoCard) {

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  // const [size, setSize] = useState({w: cardRef.current.offsetWidth, h: cardRef.current.offsetHeight})

  const cardRef = useRef<any>(null)
  const leaveDelayRef = useRef<any>(null)
  const enterDebounce = useRef<any>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  const handleMouseEnter = () => {
    clearTimeout(leaveDelayRef.current);
  }

  // const debounceMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   clearTimeout(enterDebounce.current);
    
  //   enterDebounce.current = setTimeout(function() {
  //     handleMouseMove(event);
  //   }, 100);
  // }

  const handleMouseLeave = () => {
    leaveDelayRef.current = setTimeout(()=>{
      setMousePosition({x:0,y:0})
    }, 500);
  }

  return (
    <div 
      className="card-wrap"
      // bg={bg} 
      color={color} 
      // mousePosition={mousePosition}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="card cardStyle" >
        <div className="card-bg cardBgTransform cardBgImage"></div>

        <div className="card-info">
          <h4 className="header"> {title} </h4>
          <p className="content"> {content} </p>
        </div>
      </div>
    </div>
  )
}


// const StyledCard = styled.div<{bg:string, color:string, mousePosition:{x:number,y:number}}>`

//   --rot-x: ${p => p.mousePosition.x}deg;
//   --rot-y: ${p => p.mousePosition.y}deg;
//   --rot-xoff: ${p => p.mousePosition.x * 3}deg;
//   --rot-yoff: ${p => p.mousePosition.y * 3}deg;

 
//   margin: 10px;
//   transform: perspective(800px);
//   transform-style: preserve-3d;
//   cursor: pointer;
//   // background-color: #fff;
  
//   &:hover {
//     .card-info {
//       transform: translateY(0);
//     }
//     .card-info p {
//       opacity: 1;
//     }
//     .card-info, .card-info p {
//       transition: 0.6s $hoverEasing;
//     }
//     .card-info:after {
//       transition: 5s $hoverEasing;
//       opacity: 1;
//       transform: translateY(0);
//     }
//     .card-bg {
//       transition: 
//         0.6s $hoverEasing,
//         opacity 5s $hoverEasing;
//       opacity: 0.8;
//     }
//     .card {
//       transition:
//         0.6s $hoverEasing,
//         box-shadow 2s $hoverEasing;
//       box-shadow:
//         rgba(white, 0.2) 0 0 40px 5px,
//         rgba(white, 1) 0 0 0 1px,
//         rgba(black, 0.66) 0 30px 60px 0,
//         inset #333 0 0 0 5px,
//         inset white 0 0 0 6px;
//     }
//   }
  

//   .card {
//     transform: rotateY(var(--rot-y)) rotateX(var(--rot-x));
//     position: relative;
//     flex: 0 0 240px;
//     width: 240px;
//     height: 320px;
//     background-color: #333;
//     overflow: hidden;
//     border-radius: 10px;
//     box-shadow:
//       rgba(black, 0.66) 0 30px 60px 0,
//       inset #333 0 0 0 5px,
//       inset rgba(white, 0.5) 0 0 0 6px;
//     transition: 1s $returnEasing;
//   }

//   .card-bg {
//     transform: rotateY(var(--rot-yoff)) rotateX(var(--rot-xoff)) scale(1.5);
//     background-color: ${p => p.color};
//     background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
//     background-position: center;
//     background-size: cover;
//     opacity: 0.5;
//     position: absolute;
//     /* top: -20px; left: -20px; */
//     width: 100%;
//     height: 100%;
//     padding: 20px;
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: cover;
//     transition:
//       1s $returnEasing,
//       opacity 5s 1s $returnEasing;
//     pointer-events: none;
//   }

//   .card-info {
//     padding: 20px;
//     position: absolute;
//     bottom: 0;
//     color: #fff;
//     transform: translateY(40%);
//     transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    
//     p {
//       opacity: 0;
//       text-shadow: rgba(black, 1) 0 2px 3px;
//       transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
//     }
    
//     * {
//       position: relative;
//       z-index: 1;
//     }
    
//     &:after {
//       content: '';
//       position: absolute;
//       top: 0; left: 0;
//       z-index: 0;
//       width: 100%;
//       height: 100%;
//       background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
//       background-blend-mode: overlay;
//       opacity: 0;
//       transform: translateY(100%);
//       transition: 5s 1s $returnEasing;
//     }
//   }

//   .card-info h4 {
//     font-family: "Playfair Display";
//     font-size: 36px;
//     font-weight: 700;
//     text-shadow: rgba(black, 0.5) 0 10px 10px;
//   }

// `