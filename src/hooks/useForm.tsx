// cred = https://medium.com/@omril_15649/replacing-react-hook-form-in-react-19-dd069f29d505
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
			Submit
		</button>
	)
}

type InputFieldProps = {
	type: HTMLInputTypeAttribute
	name: string
	error: string | undefined
	label?: string
} & HTMLProps<HTMLInputElement>

export function InputField({
	type,
	name,
	error,
	label,
	required = false,
	defaultValue,
	autoComplete,
	pattern,
	placeholder,
}: InputFieldProps) {
	return (
		<label htmlFor={name}>
			<span>{label || name}</span>
			<input
				name={name}
				type={type}
				required={required}
				autoComplete={autoComplete}
				defaultValue={defaultValue}
				pattern={pattern}
				placeholder={placeholder || name}
			/>
			<span className="error">{error}</span>
		</label>
	)
}
