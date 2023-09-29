import { ReactNode } from "react";

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6; 
  children: ReactNode; 
  textAlign: "center" | "end" | undefined;
}

export function HeadingBlock ({level, children, textAlign}:Props) {


  return (
    <div 
      className="element-wrap"
    >
      <Element 
        level={level}
        textAlign={textAlign}
      >
        {children}
      </Element>
    </div>
  )
}



function Element({level, textAlign, children}:Props){

  console.log(level);
  
  const style:any = {
    textAlign: textAlign,
  }
  
  switch (textAlign) {
    case 'center':
      style.marginInline = "auto";
      break;

    case 'end':
      style.marginLeft = "auto";
      break;

    default:
      style.marginRight = "auto";
      break;
  }

  if(level === 1) return (
    <h1 style={style}>
      {children}
    </h1>
  )

  if(level === 2) return (
    <h2 style={style}>
      {children}
    </h2>
  )

  if(level === 3) return (
    <h3 style={style}>
      {children}
    </h3>
  )
  
  if(level === 4) return (
    <h4 style={style}>
      {children}
    </h4>
  )

  if(level === 5) return (
    <h5 style={style}>
      {children}
    </h5>
  )

  if(level === 6) return (
    <h6 style={style}>
      {children}
    </h6>
  )

  return <p className="error"> error: no level {level}</p>
}