// cred = https://medium.com/@omril_15649/replacing-react-hook-form-in-react-19-dd069f29d505
// cred - https://aurorascharff.no/posts/handling-form-validation-errors-and-resets-with-useactionstate/
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { HTMLInputTypeAttribute, HTMLProps, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

type FormProps<T> = {
	action: () => void
	state: T
	submitCount: number
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

	// async function submitAction(previousState: T, formData: FormData): Promise<T> {
	// 	setSubmitCount((count) => count + 1)
	// 	const fieldValues = Object.fromEntries(formData) as T
	// 	await handleAction(fieldValues)
	// 	return fieldValues
	// }

	useEffect(() => {
    setSubmitCount(prev => prev + 1)
    console.log('useForm submitCount: ', submitCount);
    

		// return () =>
	}, [state])

	return {
		action,
		state,
		submitCount,
	}
}

export function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<button
			type={"submit"}
			disabled={pending}
			className={pending ? "anim_border_spin pending" : ""}
		>
			{pending ? <LoadingAnim /> : "Submit"}
		</button>
	)
}


