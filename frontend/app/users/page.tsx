import { ReactNode } from 'react'
  
type Props = {
  children:ReactNode
}

export default function UsersPage ({ children }:Props) {
  return (
    <div>
      <h1> UsersPage </h1>
    </div>
  )
}