import { LoadingAnim } from "@components/elements/LoadingAnim"
import {
	IconCheckMark,
	IconExclamationCircle,
	IconShoppingBag,
	IconSpinnerLines,
} from "@lib/useIcons"
import { stack_el } from "@styles/elements/button.module.css"
import { hidden } from "@styles/menus/form.module.scss"
import { ReactNode, useEffect } from "react"
import { useFormStatus } from "react-dom"

type SubmitButtonsProps = {
	label?: string
	className?: string
}

export function SubmitButton({ label, className }: SubmitButtonsProps) {
	const { pending } = useFormStatus()

	const btnText = label || "Submit"

	return (
		<button
			type={"submit"}
			disabled={pending}
			className={[
				stack_el,
				className,
				pending ? "anim_border_spin pending" : "",
			].join(" ")}
		>
			<span className={pending ? hidden : ""}>{btnText}</span>
			{/* {pending && <LoadingAnim /> } */}
			<LoadingAnim isVisable={pending} />
		</button>
	)
}

export type SubmitButtonState = "loading" | "pending" | "error" | "out_of_stock" | "success" | undefined


type SubmitButtonsInlineIconsProps = {
	label?: string
	className?: string
	icon:ReactNode
  title?:string
  isPending:boolean
}

export function SubmitButtonInlineIcons({
	label,
	className,
  icon,
  title = 'submit',
  isPending,
}: SubmitButtonsInlineIconsProps) {
	const { pending } = useFormStatus()

	// const renderIcon = () => {
	// 	switch (buttonState) {
	// 		case 'pending':
	// 			return <IconSpinnerLines />

	// 		case 'success':
	// 			return <IconCheckMark />

	// 		case 'error':
	// 			return <IconExclamationCircle />

	// 		default:
	// 			return <IconShoppingBag />
	// 	}
	// }

	const btnText = label || "Submit"

  // useEffect(() => {
  //   renderIcon()
  
  //   // return () => 
  // }, [buttonState])
  

	return (
		<button
      title={title}
			type={"submit"}
			disabled={isPending}
			className={[
				// stack_el,
				className,
				isPending ? "anim_border_spin pending" : "",
			].join(" ")}
		>
      {label && <span>{label}</span>}
			{icon}
		</button>
	)
}
