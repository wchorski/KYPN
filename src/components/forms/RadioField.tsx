import { SelectOption } from "@ks/types"
import { radio } from "@styles/menus/form.module.scss"
import { forwardRef, type HTMLProps, type Ref } from "react"

type Props = {
	name: string
	options: SelectOption[]
	defaultOptionValue?: string | null
  //? usefull if reusing mutli forms on one page
	dataId?: string
  error?: string
} & HTMLProps<HTMLInputElement>

function RadioFieldComponent(props: Props, ref: Ref<HTMLInputElement>) {
	const { options, defaultOptionValue, name, dataId, error } = props

  const forId = (value:string) => value + (dataId ? `-${dataId}` : "")

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
						defaultChecked={opt.value === defaultOptionValue}
						ref={ref}
					/>
					{opt.value === defaultOptionValue ? (
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
