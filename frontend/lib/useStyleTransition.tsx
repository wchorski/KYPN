// @ts-nocheck
// cred Kaylie Kwon - https://javascript.plainenglish.io/applying-css-transitions-with-react-hooks-7bd84671bc6b
import { waitFor } from "@testing-library/react"
import { useEffect, useState } from "react"

const STATE = {
  ENTERING: 'ent',
  ENTERED: 'entd',
  EXITING: 'exit',
  EXITED: 'exitd',
}

function useTransitionState(duration = 1) {

  const inSeconds = duration * 1000

  const [state, setState] = useState<string>('')

  useEffect(() => {
    let timerId: any

    if (state === STATE.ENTERING) {
      timerId = setTimeout(() => setState(STATE.ENTERED), inSeconds)
    } else if (state === STATE.EXITING) {
      timerId = setTimeout(() => setState(STATE.EXITED), inSeconds)
    }

    return () => timerId && clearTimeout(timerId)

  }, [state, setState])


  return [state, setState]
}

export function useStyleTransitionControl(seconds: number) {
  const [state, setState] = useTransitionState(seconds)


  function enterexit() {
    console.log('enter enterexit')

    if (state !== STATE.EXITING) setState(STATE.ENTERING)

    setTimeout(function () {

      if (state !== STATE.ENTERING) setState(STATE.EXITING)
      console.log('exit enterexit after wait')
    }, 5000);


  }

  function enter() {
    if (state !== STATE.EXITING) {
      setState(STATE.ENTERING)
    }
  }

  function exit() {
    if (state !== STATE.ENTERING) {
      setState(STATE.EXITING)
    }
  }

  return [state, enter, exit, enterexit]
}
