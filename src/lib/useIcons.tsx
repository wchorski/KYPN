import { ReactNode } from "react"
import {
	FaFacebook,
	FaInstagram,
	FaBandcamp,
	FaTwitch,
	FaTwitter,
	FaYoutube,
	FaGithub,
	FaLinkedin,
	FaLink,
} from "react-icons/fa"
import { SiBandlab } from "react-icons/si"
import { BsFillBookmarkFill, BsFillTicketPerforatedFill } from "react-icons/bs"
import { MdAccountCircle, MdOutlineAccountBox, MdShop } from "react-icons/md"
import { HiCalendar, HiOutlineCalendar, HiOutlineTicket } from "react-icons/hi"
import { RiFileEditFill } from "react-icons/ri"
import { PiSpinnerThin } from "react-icons/pi";

export const IconBookmark = () => <BsFillBookmarkFill />

export const IconEventTicket = () =>  <BsFillTicketPerforatedFill />


export const IconTicketOutlined = () =>  <HiOutlineTicket />
export const IconAccountBox = () =>  <MdOutlineAccountBox />

export const IconUserAccountAvatar = () =>  <MdAccountCircle />


export const IconCalendarOutlined = () =>  <HiOutlineCalendar/>
export const IconCalendar = () =>  <HiCalendar/>

export const IconShoppingBag = () => <MdShop />

export const IconEditPagePencile = () => <RiFileEditFill />

export const IconSpinnerLines = () => <PiSpinnerThin className="anim-spin-circle"/>
 

export const IconItem = ({type}:{type: "booking" | "event" | "user" | string}) => {
	switch (type) {
		case "booking":
			return <IconBookmark />
		case "event":
			return <IconEventTicket />
		case "user":
			return <IconUserAccountAvatar />

		default:
			return null
	}
}

// TODO rename to IconSocial
export function useIcons(type: string = "") {
	let icon: ReactNode

	switch (true) {
		case type.includes("facebook"):
			icon = <FaFacebook />
			break
		case type.includes("instagram"):
			icon = <FaInstagram />
			break
		case type.includes("bandcamp"):
			icon = <FaBandcamp />
			break
		case type.includes("bandlab"):
			icon = <SiBandlab />
			break
		case type.includes("twitch"):
			icon = <FaTwitch />
			break
		case type.includes("twitter"):
			icon = <FaTwitter />
			break
		case type.includes("youtube"):
			icon = <FaYoutube />
			break
		case type.includes("github"):
			icon = <FaGithub />
			break
		case type.includes("linkedin"):
			icon = <FaLinkedin />
			break
		default:
			icon = <FaLink />
			break
	}

	return type ? (
		<a
			href={type}
			target="#"
			aria-label={`${type} link`}
			data-tooltip={type}
			title={type}
		>
			{icon}
		</a>
	) : null
}
