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
			{type !== "checkbox" && <span>{label || name}</span>}

			{/* //TODO prob can remove all `input` props that dont have custom logic */}
			<input
				{...props}
				dir={type === "number" ? "rtl" : ""}
				// max={props.max || 9999}
				maxLength={props.maxLength || 200}
				placeholder={placeholder || `${label || name}...`}
				ref={ref}
			/>

			{type === "checkbox" && <span>{label || name}</span>}
			<span className="error">{error}</span>
		</label>
	)
}
//? allows ref to be passed down
export const InputField = forwardRef(InputFieldComponent)
