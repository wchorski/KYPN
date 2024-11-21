'use client'
import { useNavControl } from "@components/hooks/useGlobalContext"
import { RiMenu3Line, RiMenu4Fill } from "react-icons/ri"
import {active, navwich, } from '@styles/nav.module.css'

export function NavWichButton() {

  const { isNavOpen, toggleNav } = useNavControl()

  function getStyles(){
    const stylesArray = [navwich, (isNavOpen) ? active : ''] 
    return stylesArray.join(' ')
  }

  return (
    <button
      onClick={e => toggleNav()}
      id='navwich'
      className={getStyles()}
    >
      {isNavOpen ? <RiMenu4Fill /> : <RiMenu3Line />}
    </button>
  )
}