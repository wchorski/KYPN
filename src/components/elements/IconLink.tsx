import Link from "next/link"
import type { HTMLAttributeAnchorTarget } from "react"
import { BiEdit } from "react-icons/bi"

type Props = {
	label?: string
	icon: "edit" | "none"
	href: string
	target?: HTMLAttributeAnchorTarget
}

export function IconLink({ icon, label, href, target = undefined }: Props) {
	const iconSVG = (() => {
		switch (icon) {
			case "edit":
				return <BiEdit />
			default:
				return <></>
		}
	})()

	return (
		<Link href={href} target={target}>
			{iconSVG}
			<span>{label}</span>
		</Link>
	)
}
