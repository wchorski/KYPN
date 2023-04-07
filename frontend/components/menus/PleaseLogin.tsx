import { ReactNode } from "react"
import LoginForm from "./LoginForm"
import { useUser } from "./Session"

export default function PleaseLogin({ children }: { children: any }) {

  const session = useUser()

  if (!session) return <LoginForm />

  return children
}
