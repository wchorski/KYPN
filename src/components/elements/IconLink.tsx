import { IconEditPagePencile, IconSubRepeat, IconTicketOutlined } from "@lib/useIcons"
import { linkWicon } from "@styles/nav.module.css"
import Link from "next/link"
import type { HTMLAttributeAnchorTarget, ReactNode } from "react"

type Props = {
	label?: string
	title?: string
	icon: "edit" | "ticket" | "subscription" | "none"
	href: string
	target?: HTMLAttributeAnchorTarget
	children?: ReactNode
	className?: string
}

export function IconLink({
	icon,
	label,
  title,
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
			case "subscription":
				return <IconSubRepeat />
			default:
				return <></>
		}
	})()

	return (
		<Link
      title={title || label}
			href={href}
			target={target}
			className={[className, linkWicon].join(" ")}
		>
			{iconSVG}
			{label ? <span>{label}</span> : children}
		</Link>
	)
}
