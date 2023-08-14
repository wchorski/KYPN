import Link from "next/link";

type Props = {
  color:string,
  label:string,
  link:string,
}

export function ButtonLink(props:Props) {

  let { label, color, link } = props

  return (
    <Link
      className={`button medium`}
      href={link}
      target="blank"
      style={{
        width: 'max-content',
      }}
    >
      {label}
    </Link>
  )
}