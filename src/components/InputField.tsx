import { input_label } from "@styles/menus/form.module.scss"
import {
	forwardRef,
	type Ref,
	type HTMLInputTypeAttribute,
	type HTMLProps,
} from "react"

type Props = {
	type: HTMLInputTypeAttribute | undefined
	name: string
	error: string | undefined
	label?: string
} & HTMLProps<HTMLInputElement>

function InputFieldComponent(props: Props, ref: Ref<HTMLInputElement>) {
	const {
		type = "text",
		name,
		error,
		label,
		required = false,
		defaultValue,
		autoComplete,
		pattern,
		placeholder,
	} = props
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
				// autocomplete - https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
				autoComplete={autoComplete}
				defaultValue={defaultValue}
				pattern={pattern}
				placeholder={placeholder || `${label || name}...`}
				ref={ref}
			/>
			<span className="error">{error}</span>
		</label>
	)
}
//? allows ref to be passed down
export const InputField = forwardRef(InputFieldComponent)
