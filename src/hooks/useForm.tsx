// cred = https://medium.com/@omril_15649/replacing-react-hook-form-in-react-19-dd069f29d505
// cred - https://aurorascharff.no/posts/handling-form-validation-errors-and-resets-with-useactionstate/

import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

type FormProps<T> = {
	action: () => void
	state: T
	submitCount: number
  // inlineIcon:ReactNode
}

export function useForm<T>(
	submitAction: (prevState: T, formData: FormData) => Promise<T>,
	initState: T
): FormProps<T> {
	// @ts-ignore
	// const [state, action] = useFormState<T, FormData>(submitAction, initState)
	// const [state, action] = useFormState<T, FormData>(submitAction, initState)
	const [state, action] = useFormState<T, FormData>(submitAction, initState)
	const [submitCount, setSubmitCount] = useState(0)
  
  //TODO doesn't update properly 
	// const [inlineIcon, setInlineIcon] = useState(<IconShoppingBag />)

	// async function submitAction(previousState: T, formData: FormData): Promise<T> {
	// 	setSubmitCount((count) => count + 1)
	// 	const fieldValues = Object.fromEntries(formData) as T
	// 	await handleAction(fieldValues)
	// 	return fieldValues
	// }

	// async function handleInlineIcon() {
  //   console.log("handleInlineIcon");
	// 	setInlineIcon(<IconSpinnerLines />)
	// 	await delay(500)
	// 	setInlineIcon(<IconCheckMark />)
	// 	await delay(500)
	// 	setInlineIcon(<IconShoppingBag />)
	// }

	useEffect(() => {
    // handleInlineIcon()
		setSubmitCount((prev) => prev + 1)

		// return () =>
	}, [state])

	return {
		action,
		state,
		submitCount,
    // inlineIcon,
	}
}

// type SubmitButtonsProps = {
//   label?:string
// }

// export function SubmitButton({label}:SubmitButtonsProps) {
// 	const { pending } = useFormStatus()

//   const btnText = label || "Submit"

// 	return (
// 		<button
// 			type={"submit"}
// 			disabled={pending}
// 			className={pending ? "anim_border_spin pending" : ""}
// 		>
// 			{pending ? <LoadingAnim /> : btnText}
// 		</button>
// 	)
// }
