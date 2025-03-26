import { useIcons } from "@lib/useIcons"
import type { CSSProperties } from "react"



type Props = {
	color: string
	facebook?: string
	instagram?: string
	bandcamp?: string
	bandlab?: string
	twitch?: string
	twitter?: string
	youtube?: string
	github?: string
	linkedin?: string
	custom1?: string
	style?: CSSProperties
}

export function SocialLinkNav({
	color,
	facebook,
	instagram,
	bandcamp,
	bandlab,
	twitch,
	twitter,
	youtube,
	github,
	linkedin,
	custom1,
	style,
}: Props) {
	// function iconPicker(type: string = "") {
	// 	let icon: ReactNode

	// 	switch (true) {
	// 		case type.includes("facebook"):
	// 			icon = <FaFacebook />
	// 			break
	// 		case type.includes("instagram"):
	// 			icon = <FaInstagram />
	// 			break
	// 		case type.includes("bandcamp"):
	// 			icon = <FaBandcamp />
	// 			break
	// 		case type.includes("bandlab"):
	// 			icon = <SiBandlab />
	// 			break
	// 		case type.includes("twitch"):
	// 			icon = <FaTwitch />
	// 			break
	// 		case type.includes("twitter"):
	// 			icon = <FaTwitter />
	// 			break
	// 		case type.includes("youtube"):
	// 			icon = <FaYoutube />
	// 			break
	// 		case type.includes("github"):
	// 			icon = <FaGithub />
	// 			break
	// 		case type.includes("linkedin"):
	// 			icon = <FaLinkedin />
	// 			break
	// 		default:
	// 			icon = <FaLink />
	// 			break
	// 	}

	// 	return type ? (
	// 		<a
	// 			href={type}
	// 			target="#"
	// 			aria-label={`${type} link`}
	// 			data-tooltip={type}
	// 			title={type}
	// 		>
	// 			{icon}
	// 		</a>
	// 	) : null
	// }

	return (
		<nav
			aria-label="social link menu"
			className={"flex"}
			style={{
				display: "flex",
				// gap: '1em',
				// padding: '.5em 0',
				fontSize: "var(--space-l)",
				...style,
			}}
		>
			{useIcons(facebook)}
			{useIcons(instagram)}
			{useIcons(bandcamp)}
			{useIcons(bandlab)}
			{useIcons(twitch)}
			{useIcons(twitter)}
			{useIcons(youtube)}
			{useIcons(github)}
			{useIcons(linkedin)}
			{useIcons(custom1)}
		</nav>
	)
}
