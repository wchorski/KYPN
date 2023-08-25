import Link from "next/link";

type Props = {
  color:string,
  imageSrc:string,
}

export function ImageBlock({color, imageSrc}:Props) {

  return (
    <figure style={{
      margin: '0',
      width: '100%',
    }}>
      <img
        src={imageSrc}
        className={`image block`}
        style={{
          width: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

    </figure>
  )
}