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
import { BsFillBookmarkFill } from "react-icons/bs"
import { MdAccountCircle } from "react-icons/md"

export const IconBookmark = () => {
  return <BsFillBookmarkFill />
}
export const IconUserAccountAvatar = () => {
  return <MdAccountCircle />
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