import { input_label } from "@styles/menus/form.module.scss"
import type { HTMLProps } from "react"

type Props = {
	name: string
	error: string | undefined
	label?: string
} & HTMLProps<HTMLTextAreaElement>

export function TextareaField(props: Props) {
	const {
		name,
		error,
		label,
		required = false,
		autoComplete,
		placeholder,
    hidden,
	} = props
	return (
		<label
			htmlFor={name}
			className={input_label}
			title={required ? `${label || name} is required` : label || name}
      // style={{display: !hidden ? 'grid' : 'none'}}
		>
			<span>{label || name}</span>
			<textarea
				{...props}
				required={required}
				autoComplete={autoComplete || name}
				// defaultValue={defaultValue}
				placeholder={placeholder || `${label || name}...`}
			/>
			<span className="error">{error}</span>
		</label>
	)
}
