import { LoadingAnim } from "@components/elements/LoadingAnim"
import { stack_el } from "@styles/elements/button.module.css"
import { hidden } from "@styles/menus/form.module.scss"
import { useFormStatus } from "react-dom"

type SubmitButtonsProps = {
  label?:string
}

export function SubmitButton({label}:SubmitButtonsProps) {
  const { pending } = useFormStatus()

  const btnText = label || "Submit"

  return (
    <button
      type={"submit"}
      disabled={pending}
      className={[stack_el, pending ? "anim_border_spin pending" : ""].join(' ')}
    >
      <span className={pending ? hidden : ''}>{btnText}</span>
      {pending && <LoadingAnim /> }
    </button>
  )
}