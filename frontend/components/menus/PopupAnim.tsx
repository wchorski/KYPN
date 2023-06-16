import React, { ReactNode, useEffect, useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import styled from "styled-components";

type Props = {
  children?:ReactNode,
  popupData?:any,
}

export const PopupAnim = ({children, popupData}:Props) => {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if(!dialogRef.current) return
    // @ts-ignore
    dialogRef.current.showModal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      if(!dialogRef.current) return
      // @ts-ignore
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    if(!dialogRef.current) return
    if(popupData) return openModal()
    if(!popupData) return closeModal()
    

  }, [popupData])  
  

  return (
    <StyledPopup>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <dialog
        ref={dialogRef}
        className={`modal ${isOpen ? "open" : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="modal-content">
          
        {children}
          
        </div>

        <nav>
          <button 
            onClick={closeModal}
            data-tooltip={'close'} 
            className='edit'
          > 
            <RiCloseFill />
          </button>
        </nav>
      </dialog>
    </StyledPopup>
  );
};


const StyledPopup = styled.div`

  dialog.modal {
    position: fixed;
    left: 0;
    top: 0;
    /* width: 100%; */
    /* height: 100%; */
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
    transform: translateY(20px) skew(1deg, -3deg);
    transition: all .2s ease;
    overflow: visible;

    pointer-events: none;
    &::backdrop {
      background: rgba(0, 0, 0, 0.0);
      transition: all .2s;
    }
  }


  dialog.modal.open {
    background-color: var(--c-desaturated);
    opacity: 1;
    transform: translateY(0px) skew(0, 0);
    pointer-events: auto;

    &::backdrop {
      background: rgba(0, 0, 0, 0.7);
      transition: all .5s;
    }
  }

  .dialog-content {
    background-color: white;
    padding: 20px;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    position: relative;
  }

  overflow: visible;

  nav{
    position: absolute;
    top: -1rem;
    right: 1rem;

    svg{
      font-size: 2rem;
    }

    button:hover, button:focus{
      color: white;
    }
  }

`