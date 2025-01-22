import { IconEditPagePencile, IconTicketOutlined } from "@lib/useIcons"
import { linkWicon } from "@styles/nav.module.css"
import Link from "next/link"
import type { CSSProperties, HTMLAttributeAnchorTarget, ReactNode } from "react"

type Props = {
	label?: string
	icon: "edit" | "ticket" |"none"
	href: string
	target?: HTMLAttributeAnchorTarget
	children?: ReactNode
	className?: string
}

export function IconLink({
	icon,
	label,
	href,
	target = undefined,
	children,
	className,
}: Props) {
	const iconSVG = (() => {
		switch (icon) {
			case "edit":
				return <IconEditPagePencile />
			case "ticket":
				return <IconTicketOutlined />
			default:
				return <></>
		}
	})()

	return (
		<Link href={href} target={target} className={[className, linkWicon].join(' ')} >
			{iconSVG}
			{label ? <span>{label}</span> : children}
		</Link>
	)
}
