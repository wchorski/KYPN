

import Link from "next/link"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"
import styled from "styled-components"

export function AnnouncementsMarquee({ message, url }: { message: string, url: string }) {

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isClosed, setisClosed] = useState<boolean>(false)

  function handleClose() {
    setisClosed(true)
  }

  return (
    <StyledMarquee
      onMouseOver={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      className={isClosed ? 'closed' : ''}
    >
      <span className="msg">
        {message}
      </span>

      <Link href={url} onClick={e => setisClosed(true)}
        className={isFocused ? 'focused' : ''}
      >
        <FiExternalLink />
      </Link>

      <button
        onClick={e => setisClosed(true)}
      >
        <MdClose />
      </button>

    </StyledMarquee>
  )
}


const StyledMarquee = styled.div`

  --c-banner: #dbdbdb;
  width: 100%;
  border: 1px solid var(--c-1);
  /* border-radius: 10% 0 0 0 ; */
  border-radius:10px/40%;

  &.closed{
    height: 0;
    pointer-events: none;
  }

  background-color: var(--c-banner);
  
  position: relative;

  z-index: 9003;
  height: 300px;
  /* overflow: hidden; */
  display: flex;
  transition: all .5s;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  a{
    font-size: 3rem;

    border-bottom: 10px dashed var(--c-1);
    padding: 1em;
    height: 100%;
    display: flex;
    align-items: center;
    transform: scale(1);
    transition: all .3s;

    &:hover{
      background-color: var(--c-1);
      color: var(--c-txt-rev);
    }

    &.focused{
      transform: scale(1.2);
    }
  }


  button{
    /* position: absolute; */
    top: 0;
    right: 0;
    /* margin: 1em; */
    padding: 1em;
    font-size: 20px;
    border: none;
    background-color: transparent;
    transition: all .3s;
    
    &:hover{
      background-color: #00000064;
      color: white;
    }
  }


  span.msg {
    flex-grow: 1;
    padding: 1em;
    font-size: 3em;
    color: var(--c-txt);
    /* position: absolute; */
    width: 100%;
    height: 100%;
    margin: 0;
    line-height: 50px;
    text-align: center;
    
    /* transform:translateX(100%); */
    
    /* animation: example1 15s linear infinite; */
  }

  @keyframes example1 {
    0%   { 
    
      transform: translateX(100%); 		
    }
    100% { 
    
      transform: translateX(-100%); 
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    width: 0px;
    height: 0px;
    border-bottom: 70px solid var(--c-1);
    border-left: 70px solid transparent;
    box-shadow: 7px 2px 7px rgba(0,0,0,0.3);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    width: 0px;
    height: 0px;
    border-top: 69px solid var(--c-bg); 
    border-right: 69px solid transparent;
  }
`