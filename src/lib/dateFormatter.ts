import { DateTime } from "luxon"

export function dateFormatLocalDateTime(isoString: string) {
	const date = new Date(isoString)

	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	const hours = String(date.getHours()).padStart(2, "0")
	const minutes = String(date.getMinutes()).padStart(2, "0")

	return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function dateToISOTimezone(
	date: string,
	time: string,
	timeZone: string
): string {
	// 1. Parse the input date and time in the specified time zone
	const dt = DateTime.fromISO(`${date}T${time}`, { zone: timeZone })

	// 2. Convert to UTC
	const utcDate = dt.toUTC()

	// console.log("dateToISOTimezone luxon log")
	// console.log({ date, time, timeZone, adjusted: utcDate.toISO() })
	const isoString = utcDate.toISO()
	if (!isoString) return "n/a"
	// if (!isoString) throw new Error("date to iso string failed")
	// 3. Return the UTC ISO string
	return isoString
}

//? this does not reliably work and I opted for Luxon library instead. but maybe i'll figure it out in the future
// the problem arrises when using a production server using UTC date. The machine is located in the same place, but will stil cacl date's wrong using native js
export function dateToISOTimezoneNATIVEJS(
	date: string,
	time: string,
	timeZone: string
) {
	const [year, month, day] = date.split("-").map(Number)
	const [hour, minute, second = 0] = time.split(":").map(Number)

	// Create a formatter to get the UTC timestamp of the input time in the desired timezone
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	})

	// Format a UTC-based date using the target timezone
	const parts = formatter.formatToParts(
		new Date(Date.UTC(year, month - 1, day, hour, minute, second))
	)

	const get = (type: string) => parts.find((p) => p.type === type)?.value

	const adjusted = new Date(
		`${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get(
			"minute"
		)}:${get("second")}Z`
	)
	console.log("dateToISOTimezone NATIVE log")
	console.log({ date, time, timeZone, adjusted: adjusted.toISOString() })

	// return adjusted.toISOString()
}

// export function dateToISOTimezone(
// 	date: string,
// 	time: string,
// 	timeZone: string
// ) {
//   console.log("dateToISOTimezone INPUT");
// 	console.log({ date, time, timeZone })

// 	// 1. Start with UTC date from input
// 	const utcDate = new Date(`${date}T${time}Z`)

// 	// 2. Use Intl.DateTimeFormat to get the local time in the desired timeZone
// 	const options = {
// 		timeZone,
// 		year: "numeric",
// 		month: "2-digit",
// 		day: "2-digit",
// 		hour: "2-digit",
// 		minute: "2-digit",
// 		second: "2-digit",
// 		hour12: false,
// 	} as const

// 	const formatter = new Intl.DateTimeFormat("en-US", options)
// 	const parts = formatter.formatToParts(utcDate)

// 	const get = (type: string) =>
// 		Number(parts.find((p) => p.type === type)?.value)

// 	const tzDate = new Date(
// 		Date.UTC(
// 			get("year"),
// 			get("month") - 1,
// 			get("day"),
// 			get("hour"),
// 			get("minute"),
// 			get("second")
// 		)
// 	)

// 	// 3. Calculate offset: tzDate - utcDate = offset (in ms)
// 	const offsetMs = tzDate.getTime() - utcDate.getTime()

// 	// 4. Apply offset to UTC date to get the correct ISO
// 	const shifted = new Date(utcDate.getTime() + offsetMs)

// 	console.log("time output iso: ", shifted.toISOString())
// 	console.log("time output locale: ", shifted.toLocaleString())
// 	return shifted.toISOString()
// }

export function dateTimeToISOTimezone(datetime: string, timeZone: string) {
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

//? does what above does but i think it's written better
// export function convertToIsoWithTimezone (date: string, time: string, timeZone: string): string {
//   // Combine date and time into a single string
//   const dateTimeString = `${date}T${time}:00`

//   // Create a Date object from the combined string
//   const localDate = new Date(dateTimeString)

//   // Format the date and time in the specified time zone
//   const formattedDate = new Intl.DateTimeFormat('en-US', {
//     timeZone,
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   }).format(localDate)

//   // Extract parts from the formatted date
//   const [month, day, year, hour, minute, second] = formattedDate
//     .replace(/, /g, ' ')
//     .match(/\d+/g) || []

//   // Construct and return the ISO string
//   return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).toISOString()
// }

export function formatHours(time: string) {
	return time?.replace(".00", "")
}

// function datePrettyLocalFull(date: string) {
// 	const options = {
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 		timeZone: "America/Chicago",
// 		timeZoneName: "short",
// 		hour: "numeric",
// 		minute: "numeric",
// 		hour12: true,
// 	}

// 	const newDate = new Date(date)

// 	// @ts-ignore
// 	return newDate.toLocaleTimeString("en-US", options)
// }

export enum DATE_OPTION {
	DAY = "day",
	TIME = "time",
	FULL = "full",
}

type DateOptions = {}

export function dateInputFormat(date: string) {
	const dateObj = new Date(date)
	return dateObj.toLocaleDateString("fr-CA", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	})
}

export function timeInputFormat(time: string) {
	const dateObj = new Date(time)
	return dateObj.toLocaleTimeString("en-CA", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	})
}

export function timePrettyTo12HourFormat(timeString: string) {
	const [hours, minutes, seconds] = timeString.split(":")
	const date = new Date()
	date.setHours(Number(hours))
	date.setMinutes(Number(minutes) || 0)
	date.setSeconds(Number(seconds) || 0)

	const options = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}

	// @ts-ignore
	return date.toLocaleTimeString("en-US", options)
}

export function timeStampPrettyLocale(
	timeStamp: string,
	timeZone = "standard",
	option: "day" | "time" | "full"
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
//? using luxon for important booking timestamps
export function datePrettyLocal(
	date: string | Date,
	option: "day" | "time" | "full"
) {
	// console.log('pretty date input, ', date);
	if (!date) return ""

	let options = {}
	switch (option) {
		case "full":
			options = {
				year: "numeric",
				month: "long",
				day: "numeric",
				// timeZone: 'UTC',
				// timeZone: "America/Chicago",
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
			}
			break

		case "time":
			options = {
				// timeZone: 'UTC',
				// timeZone: "America/Chicago",
				// timeZoneName: "short",
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			}
			break

		default:
			break
	}

	const newDate = new Date(date)
	return newDate.toLocaleString("en-CA", options)
}

export function dateLocaleFileName(dateString: string) {
	const date = new Date(dateString)
	// console.log(date.toLocaleString('en-CA', {hour12:false}));

	return date.toLocaleString("en-CA", { hour12: false })
}

export function datePrettyLocalDay(date: string) {
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
		// timeZone: "America/Chicago",
		// timeZoneName: "short",
		// hour: "numeric",
		// minute: "numeric",
		// hour12: true
	}

	const newDate = new Date(date)

	// @ts-ignore
	return newDate.toLocaleDateString("en-US", options)
}

export function datePrettyLocalDayShort(date: string) {
	const options = {
		// year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	}

	const newDate = new Date(date)

	// @ts-ignore
	return newDate.toLocaleDateString("en-US", options)
}

export function datePrettyLocalTime(date: string | undefined) {
	if (!date) return ""

	const options = {
		// year: "numeric",
		// month: "long",
		// day: "numeric",
		// timeZone: 'UTC',
		// timeZone: "America/Chicago",
		// timeZoneName: "short",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}

	const newDate = new Date(date)

	// @ts-ignore
	return newDate.toLocaleTimeString("en-US", options)
}

export function timePretty(time: string) {
	const newDate = new Date()
	const hours = time.split(":")[0]
	const mins = time.split(":")[1]

	newDate.setHours(Number(hours), Number(mins))

	const options = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}

	// @ts-ignore
	const timeString = newDate.toLocaleTimeString("en-US", options)
	const lowCaps = timeString.replace("AM", "am").replace("PM", "pm")

	return lowCaps
}

export function calcDurationHuman(decimal: string) {
	const inputHours = Number(decimal)
	let hours = Math.floor(inputHours)
	let minutes = Math.round((inputHours - hours) * 60)

	let humanHours = `${hours} hour${hours !== 1 ? "s" : ""}`
	let humanMinutes = `${minutes} minute${minutes !== 1 ? "s" : ""}`

	if (hours > 0 && minutes === 0) return humanHours
	if (hours === 0 && minutes > 0) return humanMinutes
	if (hours > 0 && minutes > 0) return humanHours + " " + humanMinutes

	if (!hours && !minutes) return undefined
	return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
		minutes !== 1 ? "s" : ""
	}`
}

export function dateDaysLapsed(start: string, end: string) {
	const date1 = new Date(start).getTime()
	const date2 = new Date(end).getTime()
	return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24))
}
