import { ReactNode, useEffect, useRef, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import styled from "styled-components"

type Props = {
  data: any,
  setData: any,
  children:ReactNode|ReactNode[],
}

export function PopupModal({data, setData,  children}:Props) {

  const [dataState, setDataState] = useState<any>(data)

  const dialogRef = useRef<HTMLDialogElement>(null)

  function handleOnClick(e:React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    e.stopPropagation()
    const { left, right, top, bottom } = e.currentTarget.getBoundingClientRect();
    // if clicked outside of modal's rect
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
      setDataState(undefined)
    }
  }

  useEffect(() => {
    if(data) return dialogRef.current?.showModal()
    if(!data) return dialogRef.current?.close()

  }, [data]) 

  return (
    <StyledPopup 
      ref={dialogRef}
      onClick={handleOnClick}
    >
      <nav>
        <button onClick={() => setData(undefined)} data-tooltip={'close'} className='edit'> 
          <RiCloseFill />
        </button>
      </nav>

      {children}

    </StyledPopup>
  )
}

const StyledPopup = styled.dialog`

  position: relative;
  transition: all 1s;
  overflow: visible;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--c-txt);
  transition: all .3s;

  &[open]{
    opacity: 1;
    scale: 1;
  }

   /* nav{
    position: absolute;
    top: 0;
    right: 0;
   } */

  &::backdrop{
    transition: all 1s;
    background-color: #00000094;
  }
`