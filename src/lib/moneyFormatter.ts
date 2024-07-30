export default function moneyFormatter(amount: number | undefined = 0) {
	const options = {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}

	if (amount % 100 === 0) {
		options.minimumFractionDigits = 0
	}
	// @ts-ignore
	const formatter = Intl.NumberFormat("en-US", options)

	return formatter.format(amount / 100)
}
