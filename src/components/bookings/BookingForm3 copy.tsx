"use client"
// cred - https://www.sumologic.com/blog/react-hook-typescript/
// cred dave gray - https://www.youtube.com/watch?v=26ogBZXeBwc
import { Button } from "@components/elements/Button"
import type { 
	Addon,
	AddonCheckboxOptions,
	Availability,
	Booking,
	BookingPrevious,
	DayTimes,
	Location,
	SelectOption,
	Service,
	Session,
	User,
 } from "@ks/types"
import { findOverlapTimes } from "@lib/dateCheckCal"
import { datePrettyLocal, timePrettyTo12HourFormat } from "@lib/dateFormatter"
import {
	filterBuisnessTimes,
	findUniqueDays,
	isDateRangeAvailable,
} from "@lib/filterTimeAVail"
import { generateTimesArray } from "@lib/generateTimesArray"
import moneyFormatter from "@lib/moneyFormatter"
import { findEmployeeBusyRanges } from "@lib/userUtils"
import formStyles from "@styles/menus/form.module.scss"
import Link from "next/link"
import {
	useCallback,
	useEffect,
	useReducer,
	useRef,
} from "react"
import { useFormState, useFormStatus } from "react-dom"
import { BsFillBookmarkFill } from "react-icons/bs"

import { CalendarDatePicker } from "./Calendar"
import { TimePicker } from "./TimePicker"

type Fields = {
	// event: string,
	service: string
	location: string
	staff: string
	addonIds: string[]
	date: string
	timeStart: string
	// timeEnd:string,
	name: string
	email: string
	phone: string
	notes: string
}

type FormState = {
	message: string
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

type Props = {
	data: {
		services?: Service[] | undefined
		locations?: Location[] | undefined
		addons?: Addon[] | undefined
		employees?: User[] | undefined
		availabilities?: Availability[] | undefined
		gigs?: Booking[] | undefined
		prevBooking?: BookingPrevious | undefined
	}
	session?: Session
}

type StateRed = {
	service?: Service
	buisnessDays: number[]
	buisnessHours: { start: string; end: string }
	location: string
	locationOptions: SelectOption[]
	staff?:
		| {
				id: string
				name: string
		  }
		| undefined
	staffOptions: SelectOption[]
	addonOptions: AddonCheckboxOptions[]
	date: string
	time: string
	total: number
	bookingId?: string
	customer?: {
		name?: string
		email: string
		phone?: string
	}
	partialDates: DayTimes[]
	blackoutDates: Date[]
}

type FormAsideAction =
	| { type: "RESET" }
	| { type: "SET_SERVICE"; payload: string }
	| { type: "SET_LOCATION"; payload: string }
	| { type: "SET_LOCATION_OPTIONS"; payload: SelectOption[] }
	| { type: "SET_STAFF"; payload: string }
	| { type: "SET_STAFF_OPTIONS"; payload: SelectOption[] }
	| { type: "SET_ADDON_OPTIONS"; payload: AddonCheckboxOptions[] }
	| { type: "SET_DATE"; payload: string }
	| { type: "SET_TIME"; payload: string }
	| { type: "SET_TOTAL"; payload: number }
	| { type: "SET_BOOKING_ID"; payload: string }
	| { type: "ADDON_CHECKBOX"; payload: { value: string; isChecked: boolean } }
	| { type: "SET_BLACKOUT_DATES"; payload: Date[] }
	| { type: "SET_PARTIAL_DATES"; payload: DayTimes[] }
	| {
			type: "SET_CUSTOMER"
			payload: {
				name?: string
				email: string
				phone?: string
			}
	  }

const genTimeStrings = generateTimesArray().map((t) => t.value)

export function BookingForm3({ data, session }: Props) {
	const {
		services = [],
		locations = [],
		addons = [],
		employees = [],
		availabilities = [],
		gigs = [],
		prevBooking,
	} = data

	const serviceRef = useRef<HTMLSelectElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const dateRef = useRef<HTMLInputElement>(null)

	const onDateCallback = useCallback((date: string) => {
		if (!dateRef.current) return
		dateRef.current.value = date
		dispatchRed({ type: "SET_DATE", payload: date })
		onTimeCallback("")
	}, [])

	const timeRef = useRef<HTMLInputElement>(null)
	const onTimeCallback = useCallback((time: string) => {
		if (!timeRef.current) return
		timeRef.current.value = time
		dispatchRed({ type: "SET_TIME", payload: time })
	}, [])

	const serviceOptions = services.map((serv: any) => {
		return { value: serv.id, label: serv.name }
	}) as SelectOption[]

	const defaultstateRed: StateRed = {
		service: prevBooking?.serviceId
			? getServicePicked(prevBooking.serviceId)
			: undefined,
		buisnessDays: [],
		buisnessHours: { start: "00:00:00", end: "23:59:00" },
		addonOptions: [],
		locationOptions: [],
		staffOptions: [],
		date: prevBooking?.date || "",
		location: "",
		time: prevBooking?.time || "",
		total: 0,
		blackoutDates: [],
		partialDates: [],
	}
	const reducer = (state: StateRed, action: FormAsideAction): StateRed => {
		switch (action.type) {
			case "SET_SERVICE":
				const pickedServiceId = action.payload
				const pickedService = services.find(
					(serv) => serv.id === pickedServiceId
				)
				const serviceLocations = locations.filter((loc) =>
					loc.services.flatMap((serv) => serv.id).includes(pickedServiceId)
				)
				const locationOpts = serviceLocations.map((obj) => {
					return { value: obj.id, label: obj.name }
				})
				const foundStaff = employees.filter((emp) =>
					emp.servicesProvided
						.flatMap((serv) => serv.id)
						.includes(pickedServiceId)
				)
				const staffOpts = foundStaff.map((empl: any) => {
					return { value: empl.id, label: empl.name }
				})
				const serviceAddons = addons.filter((addon) =>
					addon.services?.flatMap((serv) => serv.id).includes(pickedServiceId)
				)

				onTimeCallback("")
				const addonOptions: AddonCheckboxOptions[] = serviceAddons.map(
					(ad) => ({
						name: ad.name,
						label: ad.name,
						id: ad.id,
						isChecked: false,
						price: ad.price,
					})
				)
				//? reset all checked on frontend to unchecked
				document
					.querySelectorAll<HTMLInputElement>("input[type=checkbox]")
					.forEach((el) => (el.checked = false))
				return {
					...state,
					service: pickedService,
					staff: undefined,
					time: "",
					date: "",
					location: "",
					locationOptions: locationOpts,
					staffOptions: staffOpts,
					addonOptions: addonOptions,
					total: pickedService?.price || 0,
				}

			case "SET_LOCATION":
				return { ...state, location: action.payload }

			case "SET_LOCATION_OPTIONS":
				return { ...state, locationOptions: action.payload }

			case "SET_STAFF":
				const staffLabel =
					state.staffOptions.find((opt) => opt.value === action.payload)
						?.label || ""
				return { ...state, staff: { name: staffLabel, id: action.payload } }

			case "SET_STAFF_OPTIONS":
				return { ...state, staffOptions: action.payload }

			case "SET_ADDON_OPTIONS":
				return { ...state, addonOptions: action.payload }

			case "ADDON_CHECKBOX":
				const addonBoxId = action.payload.value
				const currAddons = [
					...state.addonOptions,
					addons.find((ad) => ad.id === addonBoxId),
				]
				const updatedCheckboxes = state.addonOptions.map((checkbox) => {
					if (checkbox.id === addonBoxId) {
						return { ...checkbox, isChecked: action.payload.isChecked }
					}
					return checkbox
				})
				return {
					...state,
					addonOptions: updatedCheckboxes,
					total: calcTotalPrice(
						updatedCheckboxes
							.filter((opt) => opt.isChecked)
							.flatMap((ad) => ad.id),
						state.service?.id
					),
				}
			case "SET_DATE":
				return { ...state, date: action.payload }

			case "SET_BLACKOUT_DATES":
				return { ...state, blackoutDates: action.payload }

			case "SET_PARTIAL_DATES":
				return { ...state, partialDates: action.payload }

			case "SET_TIME":
				return { ...state, time: action.payload }

			case "SET_BOOKING_ID":
				return { ...state, bookingId: action.payload }

			case "SET_CUSTOMER":
				return { ...state, customer: action.payload }

			case "RESET":
				return defaultstateRed

			default:
				throw new Error()
		}
	}
	const [stateRed, dispatchRed] = useReducer(reducer, defaultstateRed)

	function getServicePicked(id: string) {
		// if(!id) return {price: 0}

		return services.find((x) => x.id === id) as Service
	}

	const defaultFormState: FormState = {
		message: "",
		errors: undefined,
		fieldValues: {
			service: prevBooking?.serviceId || "",
			location: "",
			staff: "",
			addonIds: [],
			date: prevBooking?.date || "",
			timeStart: prevBooking?.time || "",
			// timeEnd: '',
			name: "",
			email: session?.user?.email || "",
			phone: "",
			notes: "",
		},
	}

	const [formState, formAction] = useFormState<FormState>(
		onSubmit,
		defaultFormState
	)

	function calcTotalPrice(addonIds: string[], serviceId: string | undefined) {
		if (!serviceId) return 0
		const pickedAddons = addons.filter((ad) => addonIds.includes(ad.id))
		const addonsPrice = pickedAddons.reduce(
			(accumulator, currentValue) => accumulator + (currentValue?.price || 0),
			0
		)
		return addonsPrice + (getServicePicked(serviceId).price || 0)
	}

	async function onSubmit(
		prevState: FormState,
		formdata: FormData
	): Promise<FormState> {
		const service = formdata.get("service") as string
		const location = formdata.get("location") as string
		const staff = formdata.get("staff") as string
		const date = formdata.get("date") as string
		const timeStart = formdata.get("timeStart") as string
		// const timeEnd   = formdata.get('timeEnd') as string
		const name = formdata.get("name") as string
		const email = formdata.get("email") as string
		const phone = formdata.get("phone") as string
		const notes = formdata.get("notes") as string
		// const addonIds = addons.map(addon => formdata.get(addon.name) ).filter(item => item !== null) as string[]
		const addonIds = stateRed.addonOptions
			.filter((addon) => addon.isChecked)
			.flatMap((addon) => addon.id) as string[]

		const inputValues: Fields = {
			service,
			location,
			staff,
			addonIds,
			date,
			timeStart,
			// timeEnd,
			name,
			email,
			phone,
			notes,
		}

		try {
			if (typeof email !== "string") throw new Error("email is not string")

			const data = {
				// summary: `${name || email} | ${getServicePicked(service)?.name}`,
				serviceId: service,
				locationId: location,
				addonIds,
				employeeId: staff,
				start: new Date(date + "T" + timeStart).toISOString(),
				// end: calcEndTime(date+'T'+ timeStart, String(getServicePicked(service)?.durationInHours)),
				customerName: name,
				customerEmail: email,
				customerPhone: phone,
				notes: notes,
				amountTotal: calcTotalPrice(addonIds, service),
			}

			const res = await fetch(`/api/gql/noauth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
            mutation BookAService($serviceId: String!, $start: String!, $locationId: String, $addonIds: [String], $employeeId: String, $customerName: String, $customerEmail: String!, $customerPhone: String, $notes: String, $amountTotal: Int) {
              bookAService(serviceId: $serviceId, start: $start, locationId: $locationId, addonIds: $addonIds, employeeId: $employeeId, customerName: $customerName, customerEmail: $customerEmail, customerPhone: $customerPhone, notes: $notes, amount_total: $amountTotal) {
                id
              }
            }
          `,
					variables: data,
				}),
			})

			const { bookAService, error } = await res.json()
			if (error) throw new Error(error.message)
			dispatchRed({ type: "SET_BOOKING_ID", payload: bookAService.id })
			dispatchRed({ type: "SET_CUSTOMER", payload: { name, email, phone } })
			// // return check to see if employee is avail

			return {
				...formState,
				message: "success",
			}
		} catch (error: any) {
			console.log(error)

			return {
				message: error?.message,
				// TODO validate each field
				errors: {
					service: "",
					location: "",
					staff: "",
					date: "",
					timeStart: "",
					// timeEnd: '',
					name: "",
					email: "",
					phone: "",
					notes: "",
					addonIds: "",
				},
				fieldValues: inputValues,
			}
		}
	}

	useEffect(() => {
		if (formState.message === "success") {
			formRef.current?.reset()
		}
	}, [formState])

	function findPartialDays(id: string) {
		// const pickedService = services.find((x: any) => x.id === stateRed.service?.id)

		const selectedEmpl = employees.find((x: any) => x.id === id)
		if (!selectedEmpl)
			return dispatchRed({ type: "SET_BLACKOUT_DATES", payload: [] })

		const buisnessHours = {
			start: stateRed.service?.buisnessHourOpen || "",
			end: stateRed.service?.buisnessHourClosed || "",
		}
		const employeeBusyRanges = findEmployeeBusyRanges(selectedEmpl)

		const buisnessTimeStrings = filterBuisnessTimes(
			genTimeStrings,
			buisnessHours
		)
		const uniqueBusyDays = findUniqueDays(employeeBusyRanges)

		const partialDays: DayTimes[] = []
		const busyDays = uniqueBusyDays.filter((day) => {
			const openTimes = buisnessTimeStrings.filter((time) => {
				const [hours, minutes, seconds] = time.split(":").map(Number)
				const testStart = new Date(
					day.getFullYear(),
					day.getMonth(),
					day.getDate(),
					hours,
					minutes,
					seconds
				)
				const testEnd = new Date(testStart)
				testEnd.setMinutes(
					testEnd.getMinutes() + Number(stateRed.service?.durationInHours) * 60
				)

				return isDateRangeAvailable(testStart, testEnd, employeeBusyRanges)
			})

			partialDays.push({
				day,
				times: openTimes,
			})

			return openTimes.length > 0 ? true : false
		})

		const blackoutDays = partialDays.filter((d) => {
			return d.times.length <= 0
		})
		const blackoutDts = blackoutDays.map((d) => d.day)

		dispatchRed({ type: "SET_BLACKOUT_DATES", payload: blackoutDts })
		dispatchRed({ type: "SET_PARTIAL_DATES", payload: partialDays })
	}

	function handleBlackoutTimes(date: string | undefined) {
		let currentTimes: string[] = generateTimesArray().map((t) => t.value)
		if (!date) return currentTimes

		const pickedService = services.find(
			(serv) => serv.id === stateRed.service?.id
		)
		const pickedStaff = employees.find((emp) => emp.id === stateRed.staff?.id)

		if (!pickedService || !pickedStaff) return currentTimes

		// * gigs / bookings
		const employeeGigs = gigs.filter((gig) =>
			gig.employees.flatMap((emp) => emp.id).includes(pickedStaff.id)
		)
		const staffGigsLocal = employeeGigs.flatMap((gig: Booking) => {
			const start = new Date(gig.start).toLocaleDateString("en-CA")
			const end = new Date(gig.end).toLocaleDateString("en-CA")
			return [start, end]
		})

		if (staffGigsLocal?.includes(date)) {
			const staffGigs = employeeGigs.filter((gig: Booking) => {
				return (
					new Date(gig.start).toLocaleDateString("en-CA") == date ||
					new Date(gig.end).toLocaleDateString("en-CA") == date
				)
			})

			staffGigs?.map((gig) => {
				const filteredTimeStarts = findOverlapTimes(
					{ start: gig.start, end: gig.end },
					currentTimes,
					date,
					Number(pickedService?.durationInHours)
				)
				currentTimes = filteredTimeStarts || []
			})
		}

		const employeeAvail = availabilities.filter(
			(avail) => avail.employee?.id === pickedStaff.id
		)
		// * availability
		const staffAvailLocal = employeeAvail.flatMap((avail: Availability) => {
			const start = new Date(avail.start).toLocaleDateString("en-CA")
			const end = new Date(avail.end).toLocaleDateString("en-CA")

			return [start, end]
		})

		if (staffAvailLocal?.includes(date)) {
			// find the gig
			const avails = employeeAvail.filter((obj: Availability) => {
				return (
					new Date(obj.start).toLocaleDateString("en-CA") == date ||
					new Date(obj.end).toLocaleDateString("en-CA") == date
				)
			})

			avails?.map((avail) => {
				const filteredTimeStarts = findOverlapTimes(
					{ start: avail.start, end: avail.end },
					currentTimes,
					date,
					Number(pickedService?.durationInHours)
				)
				currentTimes = filteredTimeStarts || []
			})
		}

		if (!staffGigsLocal?.includes(date) && !staffAvailLocal?.includes(date)) {
			const defaultTimes = generateTimesArray().map((t) => t.value)
			return defaultTimes
		}

		return currentTimes
	}

	return (
		<div className={formStyles.grid_wrap}>
			<div>
				{!stateRed.bookingId ? (
					<form action={formAction} ref={formRef} className={formStyles.form}>
						<fieldset>
							<legend> The What </legend>

							<label htmlFor={"service"}>
								<span> Service </span>
								<select
									ref={serviceRef}
									name={"service"}
									id={"service"}
									defaultValue={formState.fieldValues.service}
									required={true}
									onChange={(e) => {
										// handleServiceUpdate(e.target.value)
										// updateFormAside('service', e.target.value)
										dispatchRed({
											type: "SET_SERVICE",
											payload: e.target.value,
										})
										// dispatchRed({type: 'SET_TOTAL', payload: calcTotalPrice(addonOptions.filter(opt => opt.isChecked).flatMap(ad => ad.id), foundService?.id)} )
									}}
								>
									<option value={""}> -- select service -- </option>

									{serviceOptions.map((opt, i) => (
										<option key={i} value={opt.value}>
											{" "}
											{opt.label}{" "}
										</option>
									))}
								</select>
								<span className="error"> {formState.errors?.service} </span>
							</label>

							<label htmlFor={"location"}>
								<span> Location </span>
								<select
									name={"location"}
									id={"location"}
									value={stateRed.location}
									required={false}
									onChange={(e) =>
										dispatchRed({
											type: "SET_LOCATION",
											payload: e.target.value,
										})
									}
								>
									<option value={""}> -- select location -- </option>

									{stateRed.locationOptions?.map((opt, i) => (
										<option key={i} value={opt.value}>
											{" "}
											{opt.label}{" "}
										</option>
									))}
								</select>
								<span className="error"> {formState.errors?.location} </span>
							</label>

							<label htmlFor={"staff"}>
								<span> Staff </span>
								<select
									name={"staff"}
									id={"staff"}
									value={stateRed.staff?.id || ""}
									required={false}
									onChange={(e) => {
										dispatchRed({ type: "SET_STAFF", payload: e.target.value })
										findPartialDays(e.target.value)
									}}
								>
									<option value={""}> -- select staff member -- </option>

									{stateRed.staffOptions?.map((opt, i) => (
										<option key={i} value={opt.value}>
											{" "}
											{opt.label}{" "}
										</option>
									))}
								</select>
								<span className="error"> {formState.errors?.staff} </span>
							</label>

							{addons.length > 0 && (
								<>
									<h5> Add-Ons</h5>
									{stateRed.addonOptions.length === 0 && (
										<p className="subtext"> no addons available </p>
									)}
									<div className={formStyles.addons_wrap}>
										{stateRed.addonOptions.map((addon) => (
											<label
												key={addon.name}
												htmlFor={addon.name}
												className={"checkbox"}
											>
												<input
													name={addon.name}
													value={addon.id}
													type={"checkbox"}
													readOnly={false}
													defaultChecked={addon.isChecked}
													onChange={(e) => {
														dispatchRed({
															type: "ADDON_CHECKBOX",
															payload: {
																value: e.target.value,
																isChecked: e.target.checked,
															},
														})
													}}
												/>
												<span>
													<strong> {moneyFormatter(addon.price || 0)} </strong>
													{addon.name}
												</span>
											</label>
										))}
									</div>
								</>
							)}
						</fieldset>

						<fieldset>
							<legend> The When </legend>

							<label htmlFor="date">
								<span> Date of Engagment </span>
								<input
									ref={dateRef}
									name={"date"}
									id={"date"}
									type={"date"}
									defaultValue={formState.fieldValues.date}
									// readOnly={formState.fieldValues.date}
									required={true}
									onChange={(e) =>
										dispatchRed({ type: "SET_DATE", payload: e.target.value })
									}
									style={{ pointerEvents: "none", display: "none" }}
									// disabled={true}
								/>
								<span className="error"> {formState.errors?.date} </span>
							</label>
							<CalendarDatePicker
								blackoutDays={stateRed.blackoutDates}
								// blackoutDays={[]}
								buisnessDays={stateRed.service?.buisnessDays || []}
								onDateCallback={onDateCallback}
							/>

							<label htmlFor="timeStart">
								<span> Start Time </span>
								<input
									ref={timeRef}
									name={"timeStart"}
									id={"timeStart"}
									type={"time"}
									defaultValue={formState.fieldValues.timeStart}
									onChange={(e) => {
										dispatchRed({ type: "SET_TIME", payload: e.target.value })
										handleBlackoutTimes(e.target.value)
									}}
									// readOnly={formState.fieldValues.timeStart}
									style={{ pointerEvents: "none", display: "none" }}
									// disabled={true}
									required={true}
								/>
								<span className="error"> {formState.errors?.timeStart} </span>
							</label>
							{/* //TODO collaps to drawer other time buttons when picked */}
							<TimePicker
								key={dateRef.current?.value}
								onTimeCallback={onTimeCallback}
								times={handleBlackoutTimes(stateRed.date)}
								pickedTime={stateRed.time}
								// todo setting 'service' to empty string causes error here
								buisnessHours={{
									start: stateRed.service?.buisnessHourOpen || "00:00:00",
									end: stateRed.service?.buisnessHourClosed || "23:59:00",
								}}
								// partialDates={partialDates}
								// serviceDuration={Number(getServicePicked(formAside.service?.id || '')?.durationInHours)}
							/>
						</fieldset>

						<fieldset>
							<legend> The Who </legend>

							<label htmlFor="name">
								<span> Name </span>
								<input
									name={"name"}
									id={"name"}
									type={"text"}
									defaultValue={formState.fieldValues.name}
									// readOnly={formState.fieldValues.name}
									required={false}
								/>
								<span className="error"> {formState.errors?.name} </span>
							</label>

							<label htmlFor="email">
								<span> Email </span>
								<input
									name={"email"}
									id={"email"}
									placeholder="yanny@mail.lan"
									type={"text"}
									defaultValue={formState.fieldValues.email}
									// readOnly={formState.fieldValues.email}
									required={true}
								/>
								<span className="error"> {formState.errors?.email} </span>
							</label>

							<label htmlFor="phone">
								<span> Phone Number </span>
								<input
									name={"phone"}
									id={"phone"}
									placeholder="312 312 1234"
									type={"phone"}
									defaultValue={formState.fieldValues.phone}
									// readOnly={formState.fieldValues.phone}
									required={false}
								/>
								<span className="error"> {formState.errors?.phone} </span>
							</label>

							<label htmlFor="notes">
								<span> Notes </span>
								<textarea
									name={"email"}
									id={"email"}
									placeholder="..."
									defaultValue={formState.fieldValues.notes}
									// readOnly={formState.fieldValues.notes}
									required={false}
								/>
								<span className="error"> {formState.errors?.notes} </span>
							</label>
						</fieldset>

						<p
							className={formState.message === "success" ? "success" : "error"}
						>
							{formState.message}
						</p>

						<SubmitButton />
					</form>
				) : (
					<div className={formStyles.success_message}>
						<BsFillBookmarkFill />
						<h2> Success! </h2>
						<p>
							{`Your booking is being processed. For the next steps, we'll reach
							out with instructions via the contact provided.`}
						</p>
						<ul>
							{stateRed.customer &&
								Object.keys(stateRed.customer).map((key, i) => (
									// @ts-ignore
									<li key={i}> {stateRed.customer[key]} </li>
								))}
						</ul>
						<Link href={`/account?dashState=orders#orders`}>
							{" "}
							Account bookings ⇢{" "}
						</Link>{" "}
						<br />
						<Link href={`/bookings/${stateRed.bookingId}`}>
							{" "}
							Booking Status{" "}
						</Link>
					</div>
				)}
			</div>

			<aside key={stateRed.addonOptions.length}>
				<table>
					<tbody>
						<tr>
							<td> Service: </td>
							<td> {stateRed.service?.name} </td>
						</tr>
						<tr>
							<td> Location: </td>
							<td>
								{" "}
								{locations.find((loc) => stateRed.location)?.name || (
									<span className="subtext"> n/a </span>
								)}{" "}
							</td>
						</tr>
						<tr>
							<td> Staff: </td>
							<td>
								{" "}
								{stateRed.staff?.name || (
									<span className="subtext"> n/a </span>
								)}{" "}
							</td>
						</tr>
						<tr>
							<td> Start Date: </td>
							<td>
								{stateRed.date ? (
									datePrettyLocal(stateRed.date + "T00:00-0800", "day")
								) : (
									<span className="subtext"> n/a </span>
								)}
								{stateRed.time
									? " @ " + timePrettyTo12HourFormat(stateRed.time)
									: ""}
							</td>
						</tr>
						<tr>
							<td> Addons: </td>
							<td>
								<ul>
									{stateRed.addonOptions
										.filter((opt) => opt.isChecked)
										.map((ad, i) => (
											<li key={i}>{ad.name}</li>
										))}
								</ul>
							</td>
						</tr>
						<tr>
							<td> Estimate: </td>
							<td>
								{moneyFormatter(
									getServicePicked(stateRed.service?.id || "")?.price ||
										0 +
											stateRed.addonOptions
												.filter((addon) => addon.isChecked)
												.reduce(
													(accumulator, addon) => accumulator + (addon.price || 0),
													0
												)
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</aside>
		</div>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button type={"submit"} disabled={pending}>
			Submit Booking
		</Button>
	)
}
