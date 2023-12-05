// import { useStyleTransitionControl } from "../../lib/useStyleTransition"

// TODO could be useful for no library automation
export function EmojiFade() {

  // const [state, enter, exit, enterexit] = useStyleTransitionControl(2)

  return <p> animation debug </p>
  // return (
  //   <div className={'styledEmoji_wrap'} >

  //     State: {state}

  //     <div className={`emoji-cont ${state}`}>
  //       <span role="img" aria-label="fading emoji"> 🐸 </span>
  //     </div>

  //     <button onClick={enter}>
  //       Enter
  //     </button>

  //     <button onClick={exit}>
  //       Exit
  //     </button>

  //     <button onClick={enterexit}>
  //       EnterExit
  //     </button>

  //   </div>
  // )
}

// const StyledEmoji = styled.div`
//   .emoji-cont{

//     transition: all .3s ease-in-out;

//     &.ent{ 
//       opacity: 1;
//     }
//     &.entd{ 
//       opacity: 1;
//     }
//     &.exit{ 
//       opacity: 0;
//     }
//     &.exitd{ 
//       opacity: 0;
//     }

//   }
// `
