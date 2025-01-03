import type { HTMLProps } from "react"

type Props = {
	name: string
	label?: string
	options: { value: string; label: string }[]
	error?: string
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
} & HTMLProps<HTMLSelectElement>

export function SelectField(props: Props) {
	const { name, label, value, onChange, options, error } = props
	return (
		<label htmlFor={name}>
			<span> {label || name} </span>
			<select value={value} required={false} onChange={onChange} {...props}>
				<option value={""}> -- select {label || name} -- </option>

				{options?.map((opt, i) => (
					<option key={i} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			<span className="error">{error}</span>
		</label>
	)
}
