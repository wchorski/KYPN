import styled from "styled-components"
import { useStyleTransitionControl } from "../../lib/useStyleTransition"
import { useState } from "react"

export function EmojiFade() {

  const [state, enter, exit] = useStyleTransitionControl()
  const [isOpen, setIsOpen] = useState(false)


  return (
    <StyledEmoji open={isOpen}>
      State: {state}

      <div className="emoji-cont">
        <span role="img" aria-label="fading emoji"> 🐸 </span>
      </div>

      <button onClick={e => setIsOpen(true)}>
        Enter
      </button>

      <button onClick={e => setIsOpen(false)}>
        Exit
      </button>
    </StyledEmoji>
  )
}

const StyledEmoji = styled.div`
  .emoji-cont{

    opacity: ${props => props.open ? '1' : '0'};
    transition: all 1000ms ease-in-out;

  }
`
