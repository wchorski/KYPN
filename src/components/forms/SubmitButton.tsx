import { LoadingAnim } from "@components/elements/LoadingAnim"
import { stack_el } from "@styles/elements/button.module.css"
import { hidden } from "@styles/menus/form.module.scss"
import { useFormStatus } from "react-dom"

type SubmitButtonsProps = {
  label?:string
  className?:string
}

export function SubmitButton({label, className}:SubmitButtonsProps) {
  const { pending } = useFormStatus()

  const btnText = label || "Submit"

  return (
    <button
      type={"submit"}
      disabled={pending}
      className={[stack_el, className, pending ? "anim_border_spin pending" : ""].join(' ')}
    >
      <span className={pending ? hidden : ''}>{btnText}</span>
      {/* {pending && <LoadingAnim /> } */}
      <LoadingAnim isVisable={pending}/> 
    </button>
  )
}