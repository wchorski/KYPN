import Link from "next/link"
import { BiEdit } from "react-icons/bi"

type Props = {
	label?: string
	icon: "edit" | "none"
	href: string
}

export function IconLink({ icon, label, href }: Props) {
	const iconSVG = (() => {
		switch (icon) {
			case "edit":
				return <BiEdit />
			default:
				return <></>
		}
	})()

	return (
		<Link href={href}>
			{iconSVG}
			<span>{label}</span>
		</Link>
	)
}
