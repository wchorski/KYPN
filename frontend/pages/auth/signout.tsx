import Link from "next/link";
import { MdWavingHand } from "react-icons/md";
import styled from "styled-components";


export default function SignoutPage() {
  return (
    <StyledSignout>
      <center>
        <h2>See You Next Time</h2>
        <MdWavingHand style={{margin: '1em auto', fontSize: '5rem', width: '100%'}}/>
        <Link href={`/home`} className="button"> Return Home </Link>
      </center>
    </StyledSignout>
  )
}


const StyledSignout = styled.div`

  position: relative;
  overflow: hidden;

  svg{
    /* position: absolute; */
    top: 0;
    left: 0;

    animation: animgoodbye .7s ease-out infinite alternate;
  }

  @keyframes animgoodbye {
    0%{
      transform: 
        translateX(0px)
        rotateZ(0deg)
        scale(1)
        ;
      }
      50%{
        transform: 
        translateX(10px)
        rotateZ(10deg)
        scale(1.1)
        ;
      }
      100%{
        transform: 
        translateX(0px)
        rotateZ(0deg)
        scale(1)
      ;
    }
  }
`