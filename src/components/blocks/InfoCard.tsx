// cred - Kevin Powell - https://www.youtube.com/watch?v=Z-3tPXf9a7M&t=388s
// cred - Andy Merskin - https://codepen.io/andymerskin/details/XNMWvQ
import Link from "next/link"
import { ReactNode } from "react";
import styles from '@styles/blocs/infocard.module.css'

type InfoCard = {
  header:string,
  content?:string,
  children?:ReactNode,
  buttonLink:string,
  buttonText:string,
  imageSrc:string,
  color:string,
  verticleAlign:string,
  padding:number,
  fontSize:string,
  fitContent:boolean,
  width:'initial'|'fit-content',
}

type MousePosition = {
  x: number;
  y: number;
}

export function InfoCard({content, buttonLink, buttonText, header, imageSrc, color, verticleAlign, padding, fontSize, width, children}:InfoCard) {
  
  // const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  // const handleRotation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
  //   const x = event.clientX - left;
  //   const y = event.clientY - top;
    
    
  //   const relativeX = ((x / width) - 0.5) * 2;
  //   const relativeY = ((y / height) - 0.5) * -2;
  //   // console.log(relativeX,relativeY);

  //   const amplifiy = 10;
  //   const clampedX = parseFloat(relativeX.toFixed(1)) * amplifiy;
  //   const clampedY = parseFloat(relativeY.toFixed(1)) * amplifiy;

  //   setMousePosition({ x: clampedX, y: clampedY });
  // }

  // const  handleMouseLeave = () => {
  //   const mouseLeaveDelay = setTimeout(()=>{
  //     setMousePosition({x:0,y:0})
  //   }, 500);
  // }

  return (
    // @ts-ignore
    <article className={[styles.infocard, styles[`vAlign_${verticleAlign}`] ].join(' ')}  
      style={{
        paddingInline: padding + 'rem',
        background: color,
        fontSize: fontSize + 'rem',
        maxWidth: width,
      }}
      // imageSrc={imageSrc} 
      // color={color} 
      // mousePosition={mousePosition}
      // onMouseMove={handleRotation}
      // onMouseLeave={handleMouseLeave}
    >
      {/* <div className="imageSrc"></div> */}

      {header && <h4> {header} </h4>}

      <div className={styles.content_wrap} >
        {content && <>{content}</>}
        {children}
        {/* <p>x: {mousePosition.x}, y: {mousePosition.y}</p> */}
        <p>href::: {buttonLink}</p>
        {buttonLink && (
          <Link href={buttonLink} className="button"> {buttonText} </Link>
        )}
      </div>
      

    </article>
  )
}
