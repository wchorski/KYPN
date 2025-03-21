
import type { ReactNode } from "react"
import { useFormStatus } from "react-dom"

type SubmitButtonsProps = {
	label?: string
	className?: string
	isDisabled?: boolean
}

export function SubmitButton({
	label,
	className,
	isDisabled = false,
}: SubmitButtonsProps) {
	const { pending } = useFormStatus()

	const btnText = label || "Submit"

	return (
		<button
			type={"submit"}
			disabled={isDisabled ? isDisabled : pending}
			className={[className, pending ? "anim_border_spin pending" : ""].join(
				" "
			)}
		>
			<div >
				<span>{pending ? 'pending...' : btnText}</span>{" "}
			</div>

			{/* <LoadingAnim isVisable={pending} /> */}
		</button>
	)
}

export type SubmitButtonState =
	| "loading"
	| "pending"
	| "error"
	| "out_of_stock"
	| "success"
	| undefined

type SubmitButtonsInlineIconsProps = {
	label?: string
	className?: string
	icon: ReactNode
	title?: string
	isPending: boolean
}

// TODO instead of manipulating dom via JS
// use css animations and hide/visible
// as to not use timeouts
// try doing a carosel and animate transform position
// cancel out of animation if error occurs?
export function SubmitButtonInlineIcons({
	label,
	className,
	icon,
	title = "submit",
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
				// stack_grid,
				className,
				isPending ? "anim_border_spin pending" : "",
			].join(" ")}
		>
			{label && <span>{label}</span>}
			{icon}
		</button>
	)
}
