'use client'
import { useNavControl } from "@hooks/useGlobalContext"
import { RiMenu3Line, RiMenu4Fill } from "react-icons/ri"
import styles from '@styles/nav.module.css'

export function NavWichButton() {

  const { isNavOpen, toggleNav } = useNavControl()

  function getStyles(){
    const stylesArray = [styles.navwich, (isNavOpen) ? styles.active : ''] 
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