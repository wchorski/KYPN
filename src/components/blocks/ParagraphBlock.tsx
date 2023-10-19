import { ReactNode } from "react";

type Props = {
  textAlign:'start'|'center'|'end'|undefined,
  children:ReactNode
}

export function Paragraph (props:Props) {
  // console.log(props);
  const { textAlign, children } = props
  
  const pStyle:any = {
    gridColumn: '2/3',
    textAlign: textAlign,
  }


  switch (textAlign) {
    case 'start':
      pStyle.marginRight = "auto";
      break;

    case 'center':
      pStyle.marginInline = "auto";
      break;

    case 'end':
      pStyle.marginLeft = "auto";
      break;

    default:
      pStyle.marginRight = "auto";
      break;
  }

  


  return (
    <div 
      className="element-wrap"
      style={{
        // display: 'grid',
        // gridTemplateColumns: 'minmax(0, 1fr) minmax(0, var(--w-sitemax)) minmax(0, 1fr)',
        // gridGap: '1rem',
        // @ts-ignore
        // textAlign: getTextAlign(),
        
        // maxWidth: 'var(--w-sitemax)',
        // marginInline: 'auto',
      }}
    >
      <p
        style={pStyle}
      >
        {children}
      </p>
    </div>
  )
}