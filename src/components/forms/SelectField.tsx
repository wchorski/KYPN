import type { HTMLProps } from "react"

type Props = {
	defaultLabel?:string
	name: string
	label?: string
	options: { value: string; label: string, selected?: boolean }[]
	error?: string
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
} & HTMLProps<HTMLSelectElement>

export function SelectField(props: Props) {
	const { defaultLabel, name, label, value, defaultValue, onChange, options, error, required } = props
	return (
		<label
			htmlFor={name}
			title={required ? `${label || name} is required` : name}
		>
			<span> {label || name} </span>
			<select {...props} value={value} required={false} onChange={onChange}>
				<option value={""}> {defaultLabel ?? `-- select ${label || name} --`} </option>

				{options?.map((opt, i) => (
					<option key={i} value={opt.value} selected={opt.selected}>
						{opt.label}
					</option>
				))}
			</select>
			<span className="error">{error}</span>
		</label>
	)
}
