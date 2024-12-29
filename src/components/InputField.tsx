import { input_label } from "@styles/menus/form.module.scss"
import type { HTMLInputTypeAttribute, HTMLProps } from "react"

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
		<label
			htmlFor={name}
			className={input_label}
			title={required ? `${label || name} is required` : label || name}
		>
			<span>{label || name}</span>
			<input
				name={name}
				type={type}
				required={required}
				autoComplete={autoComplete}
				defaultValue={defaultValue}
				pattern={pattern}
				placeholder={placeholder || `${label || name}...`}
			/>
			<span className="error">{error}</span>
		</label>
	)
}
