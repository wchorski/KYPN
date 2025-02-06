import type { CSSProperties } from "react"
import moneyFormatter from "../../lib/moneyFormatter"
import styles from "@styles/ecommerce/pricetag.module.css"

type Props = {
	price: number | null
	subtext?: string
	hideZeroCents?: boolean
  style?:CSSProperties
}

// todo this is a very short list of currencies but should cover anything relevant to me

export function PriceTag({ price, subtext, hideZeroCents = false, style }: Props) {
	const money = moneyFormatter(price || 0)
	let currency = "$"
	const dollars = money.replace(currency, "").split(".")[0]
	const cents = money.replace(currency, "").split(".")[1]

	function handleFormat(className: string) {
		switch (true) {
			case !price:
				return (
					<>
						<span>
							<sup className="currency">{currency}</sup>
							<span className="amount">
								<em>null</em>
							</span>

							<small className="subtext">price not set</small>
						</span>
					</>
				)
			case money.includes("$"):
				// currency = '$'

				return (
					<>
						<data className={className} value={dollars + "." + cents} style={style}>
							<sup className="currency" title={"USD"}>
								{currency}
							</sup>
							<span className="amount">
								{dollars}
								<small>
									{hideZeroCents && Number(cents) > 0 ? `.${cents}` : `.00`}
								</small>
							</span>

							<small className="subtext">{subtext}</small>
						</data>
					</>
				)

			case money.includes("¥"):
				currency = "¥"

				return (
					<>
						<small className="currency"> {currency} </small>
						<span className="amount"> {money.replace(currency, "")} </span>
						<small className="subtext">{subtext}</small>
					</>
				)

			case money.includes("Kč"):
				currency = "Kč"

				return (
					<>
						<span className="amount"> {money.replace(currency, "")}</span>
						<small className="currency"> {currency} </small>
						<small className="subtext">{subtext}</small>
					</>
				)

			case money.includes("€"):
				currency = "€"
				return (
					<>
						<small className="currency"> {currency} </small>
						<span className="amount"> {money.replace(currency, "")} </span>
						<small className="subtext">{subtext}</small>
					</>
				)

			default:
				return <span> ... </span>
		}
	}

	return handleFormat([styles.pricetag, "money"].join(" "))
}
