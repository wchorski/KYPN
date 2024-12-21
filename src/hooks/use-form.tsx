// cred = https://medium.com/@omril_15649/replacing-react-hook-form-in-react-19-dd069f29d505
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

type FormProps<T> ={
	action: () => void
	pending: boolean
	state: T
	submitCount: number
}

export function useForm<T>(
	handleAction: (data: T) => void,
	initialState: T
): FormProps<T> {
	// @ts-ignore
	// const [state, action] = useFormState<T, FormData>(onSubmit, initialState)
	const [state, action] = useFormState<T, FormData>(onSubmit, initialState)
	const { pending } = useFormStatus()
	const [submitCount, setSubmitCount] = useState(0)

	async function onSubmit(previousState: T, formData: FormData): Promise<T> {
		setSubmitCount((count) => count + 1)
		const fieldValues = Object.fromEntries(formData) as T
		await handleAction(fieldValues)
		return fieldValues
	}

  // useEffect(() => {
  //   onSubmit()
  
  //   // return () => 
  // }, [state])
  

	return {
		action,
		pending,
		state,
		submitCount,
	}
}
