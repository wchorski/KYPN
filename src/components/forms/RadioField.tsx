import type {  SelectOption  } from "@ks/types"
import { radio } from "@styles/menus/form.module.scss"
import { forwardRef, type HTMLProps, type Ref } from "react"

type Props = {
	name: string
	options: SelectOption[]
	defaultoptionvalue?: string | null
  //? usefull if reusing mutli forms on one page
	dataid?: string
  error?: string
} & HTMLProps<HTMLInputElement>

function RadioFieldComponent(props: Props, ref: Ref<HTMLInputElement>) {
	const { options, defaultoptionvalue, name, dataid, error } = props

  const forId = (value:string) => value + (dataid ? `-${dataid}` : "")

	return (
		<ul className={radio}>
			{options.map((opt, i) => (
				<label htmlFor={forId(opt.value)} key={i}>
					<input
						{...props}
						name={name}
						type={"radio"}
						id={forId(opt.value)}
						value={opt.value}
						defaultChecked={opt.value === defaultoptionvalue}
						ref={ref}
					/>
					{opt.value === defaultoptionvalue ? (
						<strong className="current">{opt.label}</strong>
					) : (
						<span> {opt.label} </span>
					)}
				</label>
			))}
      <span className="error">{error}</span>
		</ul>
	)
}
//? allows ref to be passed down
export const RadioField = forwardRef(RadioFieldComponent)
