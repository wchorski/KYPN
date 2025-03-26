// TODO - how to reset form
import type { FormHTMLAttributes, ReactNode } from "react"

type Props = {
  children:ReactNode
  resetKey?:any
  debugKey?:number
  resetForm?: () => any
} & FormHTMLAttributes<HTMLFormElement>

export function Form ({ action, className, children, resetKey, debugKey, resetForm }:Props) {
  return (
    <form action={action} className={className} key={resetKey}>
      {...[children]}
      <p>{`key=${debugKey}`}</p>
      <time> {Date.now()}</time>
      <button type={"button"} onClick={resetForm}> reset </button>
    </form>
  )
}