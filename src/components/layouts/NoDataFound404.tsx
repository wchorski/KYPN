import { ReactNode } from "react"
import { PageTMain } from "./PageTemplates"

type Props = {
  children?:ReactNode
}

export function NoDataFoundError404 ({ children }:Props) {
  return (
      <PageTMain main={Main(children)}/>
  )
}

function Main(children:ReactNode){

  return <>
    {children}
  </>
}