import Link from "next/link";

type Props = {
  color:string,
  padding:number,
  border:number,
  imageSrc:string,
  width:number,
}

export function ImageBlock({color, imageSrc, padding = 0, border = 0, width = 500}:Props) {

  return (
    // <figure style={{
    //   margin: '0',
    //   width: width + 'px',
    //   padding: padding + 'px',
    //   border: `solid lightgrey ${String(border)}px`,
    //   marginInline: 'auto',
    // }}>
      <img
        src={imageSrc}
        className={`image block`}
        style={{
          width: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

    // </figure>
  )
}