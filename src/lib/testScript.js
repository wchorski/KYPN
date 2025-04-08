import { DateTime } from "luxon"
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

// console.log(adjustedStartEnds)

export function dateToISOTimezone(date, time, timeZone) {
	const localTimestamp = new Date(`${date}T${time}`)

	const dateInTimezone = new Date(
		new Intl.DateTimeFormat("en-US", {
			timeZone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		}).format(localTimestamp)
	)

	return dateInTimezone
}

export function dateTimeToISOTimezone(datetime, timeZone) {
	const localTimestamp = new Date(datetime)

	const dateInTimezone = new Date(
		new Intl.DateTimeFormat("en-US", {
			timeZone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		}).format(localTimestamp)
	)

	return dateInTimezone.toISOString()
}

export function timeStampPrettyLocale(
	timeStamp,
	timeZone = "client",
	option
	// option: "day" | "time" | "full"
) {
	// console.log('pretty date input, ', date);
	if (!timeStamp) return ""

	let options = {}
	switch (option) {
		case "full":
			options = {
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone,
				timeZoneName: "short",
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			}
			break

		case "day":
			options = {
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone,
			}
			break

		case "time":
			options = {
				timeZone,
				timeZoneName: "short",
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			}
			break

		default:
			break
	}

	const dt = DateTime.fromISO(timeStamp)

	const pretty = dt.toLocaleString(options)
	return pretty
}

console.log("### CHICAGO ###")
console.log(
	timeStampPrettyLocale("2025-04-17T15:15:00.000Z", "America/Chicago", "day")
)
console.log(
	timeStampPrettyLocale("2025-04-17T15:15:00.000Z", "America/Chicago", "time")
)
console.log(
	timeStampPrettyLocale("2025-04-17T15:15:00.000Z", "America/Chicago", "full")
)

console.log("### DETROIT ###")
console.log(
	timeStampPrettyLocale("2025-04-18T14:15:00.000Z", "America/Detroit", "day")
)
console.log(
	timeStampPrettyLocale("2025-04-18T14:15:00.000Z", "America/Detroit", "time")
)
console.log(
	timeStampPrettyLocale("2025-04-18T14:15:00.000Z", "America/Detroit", "full")
)

console.log("### DETROID BUT LOCALE TO ME ###")
console.log(timeStampPrettyLocale("2025-04-18T14:15:00.000Z", "", "day"))
console.log(timeStampPrettyLocale("2025-04-18T14:15:00.000Z", "", "time"))
console.log(timeStampPrettyLocale("2025-04-18T14:15:00.000Z", "", "full"))

// {
//   date: '2025-04-17',
//   time: '10:15:00',
//   timeZone: 'America/Chicago',
//   adjusted: '2025-04-17T15:15:00.000Z'
// }

// {
//   date: '2025-04-18',
//   time: '10:15:00',
//   timeZone: 'America/Detroit',
//   adjusted: '2025-04-18T14:15:00.000Z'
// }

// 2025-04-17T15:15:00.000Z
// in prod, start was set to 2025-04-18T05:15:00.000Z
// console.log(dateToISOTimezone('2025-04-18', '10:15:00', 'America/Chicago'));
// console.log(dateToISOTimezone('2025-04-18', '10:15:00', 'America/Chicago').toISOString());
// console.log(dateToISOTimezone('2025-04-18', '10:15:00', 'America/Chicago').toLocaleString());
