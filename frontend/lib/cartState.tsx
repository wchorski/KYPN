'use client'
import { createContext, useContext, useState } from "react";

const defaultCtx= {
  isOpen: false,
  setIsOpen: (isOpen:boolean) => {},
  toggleCart: () => {},
  closeCart: () => {},
  openCart: () => {},

}

const LocalStateContext = createContext(defaultCtx)

function CartStateProvider ({children}:{children: React.ReactNode}){

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleCart() {
    setIsOpen(!isOpen)
  }
  function closeCart() {
    setIsOpen(false)
  }
  function openCart() {
    setIsOpen(true)
  }

  return(
    <LocalStateContext.Provider 
      value={{isOpen, setIsOpen, toggleCart, closeCart, openCart}}
    >
      {children}
    </LocalStateContext.Provider>
  )
} 

function useCart(){
  const all = useContext(LocalStateContext)
  return all
}
export {CartStateProvider, useCart}