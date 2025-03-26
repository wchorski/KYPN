import Link from "next/link"

type Props = {
	color?: string
	label?: string
  // todo turn this to href
	link: string
  size?: 'small'|'medium'|'large'
}

export function ButtonLink({ label = 'link', color, link, size = 'medium' }:Props) {

	return (
		<Link
			className={`button ${size}`}
			href={link}
			target="blank"
			style={{
				width: "max-content",
			}}
		>
			<span>{label}</span>
		</Link>
	)
}
