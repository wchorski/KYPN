
import Link from "next/link";
import { ReactNode } from "react";
import { FaFacebook, FaInstagram, FaBandcamp, FaTwitch, FaTwitter, FaYoutube, FaGithub, FaLinkedin, FaLink } from "react-icons/fa";
import { SiBandlab } from "react-icons/si";

type Props = {
  color:string,
  facebook?:string,
  instagram?:string,
  bandcamp?:string,
  bandlab?:string,
  twitch?:string,
  twitter?:string,
  youtube?:string,
  github?:string,
  linkedin?:string,
  custom1?:string,
  
}

export function SocialLinkNav({color, facebook, instagram, bandcamp, bandlab, twitch, twitter, youtube, github, linkedin, custom1}:Props) {

  console.log(bandcamp);
  
  function handleRender(type:string = ''){

    let icon:ReactNode

    console.log(type);
    
    switch (true) {
      case type.includes('facebook'):
        icon = <FaFacebook />
        break;
      case type.includes('instagram'):
        icon = <FaInstagram />
        break;
      case type.includes('bandcamp'):
        icon = <FaBandcamp />
        break;
      case type.includes('bandlab'):
        icon = <SiBandlab />
        break;
      case type.includes('twitch'):
        icon = <FaTwitch />
        break;
      case type.includes('twitter'):
        icon = <FaTwitter />
        break;
      case type.includes('youtube'):
        icon = <FaYoutube />
        break;
      case type.includes('github'):
        icon = <FaGithub />
        break;
      case type.includes('linkedin'):
        icon = <FaLinkedin />
        break;
      default:
        icon = <FaLink />
        break;
    } 

    return type 
      ? <Link href={type} target="#" aria-label={`${type} link`} data-tooltip={type}>
          {icon}
        </Link>

      : null


  }

  return (
    <nav style={{
      display: 'flex',
      gap: '1em',
      padding: '1em',
    }}>

      {handleRender(facebook)}
      {handleRender(instagram)}
      {handleRender(bandcamp)}
      {handleRender(bandlab)}
      {handleRender(twitch)}
      {handleRender(twitter)}
      {handleRender(youtube)}
      {handleRender(github)}
      {handleRender(linkedin)}
      {handleRender(custom1)}

    </nav>
  )
}