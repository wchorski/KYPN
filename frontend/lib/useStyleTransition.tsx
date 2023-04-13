// cred Kaylie Kwon - https://javascript.plainenglish.io/applying-css-transitions-with-react-hooks-7bd84671bc6b
import { useEffect, useState } from "react"

const STATE = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exit',
}

function useTransitionState(duration = 1000) {

  const [state, setState] = useState<string>()

  useEffect(() => {
    let timerId: any

    if (state === STATE.ENTERING) {
      timerId = setTimeout(() => setState(STATE.ENTERED), duration)
    } else if (state === STATE.EXITING) {
      timerId = setTimeout(() => setState(STATE.EXITED), duration)
    }

    return () => timerId && clearTimeout(timerId)

  }, [state, setState])


  return [state, setState]
}

export function useStyleTransitionControl(duration: number) {
  const [state, setState] = useTransitionState(duration)

  const enter = () => {
    if (state !== STATE.EXITING) {
      setState(STATE.ENTERING)
    }
  }

  const exit = () => {
    if (state !== STATE.ENTERING) {
      setState(STATE.EXITING)
    }
  }

  return [state, enter, exit]
}
