import { Section } from "@components/layouts/Section"
import Link from "next/link"
import { ReactNode } from "react"
import { BiLock } from "react-icons/bi"

type Props = {
  children?:ReactNode|ReactNode[]
}

export function LoginToView ({ children }:Props) {
  return<main> 
    <header>
      
    </header>
    <Section layout={'1'}>

      <p style={{fontSize: '2rem'}}> 
        <BiLock /> 
      </p>
      
      <p> 
        <Link href={`/api/auth/signin`}> Login </Link> to view account 
      </p>
      {children}
    </Section>
  </main>
}