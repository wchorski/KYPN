// @ts-nocheck
import styled from "styled-components"
import { useStyleTransitionControl } from "../../lib/useStyleTransition"

export function EmojiFade() {

  const [state, enter, exit, enterexit] = useStyleTransitionControl(2)


  return (
    <StyledEmoji >

      State: {state}

      <div className={`emoji-cont ${state}`}>
        <span role="img" aria-label="fading emoji"> 🐸 </span>
      </div>

      <button onClick={enter}>
        Enter
      </button>

      <button onClick={exit}>
        Exit
      </button>

      <button onClick={enterexit}>
        EnterExit
      </button>

    </StyledEmoji>
  )
}

const StyledEmoji = styled.div`
  .emoji-cont{

    transition: all .3s ease-in-out;

    &.ent{ 
      opacity: 1;
    }
    &.entd{ 
      opacity: 1;
    }
    &.exit{ 
      opacity: 0;
    }
    &.exitd{ 
      opacity: 0;
    }

  }
`
