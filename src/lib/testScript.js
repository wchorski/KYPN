export const dateAdjuster = (date, { years = 0, months = 0, days = 0 }) =>
	new Date(
		new Date(date).setFullYear(
			new Date(date).getFullYear() + years,
			new Date(date).getMonth() + months,
			new Date(date).getDate() + days
		)
	).toISOString()

const startEnds = [
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
	{ start: "2025-01-01T00:00:00.000Z", end: "2025-01-01T00:00:00.000Z" },
]

const dateAdjusterFuncs = (date) => [
	dateAdjuster(date, { days: 1 }),
	dateAdjuster(date, { days: 2 }),
	dateAdjuster(date, { months: 1 }),
	// dateAdjuster(date, {days: 3}),
]

const adjustedStartEnds = startEnds.map((item, index) => {
	const adjustFuncs = dateAdjusterFuncs(item.start)

	return {
		start: adjustFuncs[index % adjustFuncs.length], // Apply round-robin adjustment
		end: adjustFuncs[index % adjustFuncs.length], // Shift adjustment for `end`
	}
})

console.log(adjustedStartEnds)
