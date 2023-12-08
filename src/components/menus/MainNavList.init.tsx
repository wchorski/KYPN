'use client'
import { ReactNode } from 'react'
import { NavLink } from './NavLink'
import styles from '@styles/nav.module.scss'
import { useNavControl } from '@components/hooks/useGlobalContext'
import Image from 'next/image'

export function MainNavList () {

  const { isNavOpen } = useNavControl()

  function getStyles(){
    const stylesArray = [styles.menu_main, (isNavOpen) ? styles.open : ''] 
    return stylesArray.join(' ')
  }
  
  return (
    <ul className={getStyles()}>
      <li> <NavLink href={`/home`}> Home </NavLink> </li>
      <li> <NavLink href={`/shop`}> Shop </NavLink> </li>
      <li> <NavLink href={`/pricing`}> Pricing </NavLink> </li>
      <li> <NavLink href={`/blog`}> Blog </NavLink> </li>
      <li> <NavLink href={`/events`}> Events </NavLink> </li>
      <li> <NavLink href={`/bookings`}> Bookings </NavLink> </li>
    </ul>
  )
}