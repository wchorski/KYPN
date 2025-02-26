"use client"
// cred - https://www.sumologic.com/blog/react-hook-typescript/
// cred dave gray - https://www.youtube.com/watch?v=26ogBZXeBwc
// cred ByteGrad -  https://www.youtube.com/watch?v=GgyP0_b-WPY

throw new Error('!!! fix layout with Grid component')

import {
	Addon,
	AddonCheckboxOptions,
	Availability,
	Booking,
	BookingPrevious,
	DayTimes,
	Location,
	SelectOption,
	Service,
	User,
} from "@ks/types"
import { generateTimesArray } from "@lib/generateTimesArray"
import {
	ReducerAction,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
	useActionState,
} from "react"
import { useFormState, useFormStatus } from "react-dom"

import formStyles, { form } from "@styles/menus/form.module.scss"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { calcEndTime } from "@lib/dateCheck"
import moneyFormatter from "@lib/moneyFormatter"
import gridStyles from "@styles/elements/section.module.scss"
import { datePrettyLocal, timePrettyTo12HourFormat } from "@lib/dateFormatter"
import { CalendarDatePicker } from "./Calendar"
import {
	filterBuisnessTimes,
	findUniqueDays,
	isDateRangeAvailable,
} from "@lib/filterTimeAVail"
import { findEmployeeBusyRanges } from "@lib/userUtils"
import { TimePicker } from "./TimePicker"
import { findOverlapTimes } from "@lib/dateCheckCal"
import Link from "next/link"
import { BsFillBookmarkFill } from "react-icons/bs"
import { Button } from "@components/elements/Button"
import { SelectField } from "@components/forms/SelectField"
import { InputField } from "@components/InputField"
import { TextareaField } from "@components/TextareaField"
import { SubmitButton } from "@components/forms/SubmitButton"
import { useForm } from "@hooks/useForm"
import {
	actionBookAService,
	BookAServiceState,
} from "@lib/actions/actionBookAService"
import { Session } from "next-auth"
import { envs } from "@/envs"

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
	session: Session | null
	timeZoneOptions?: SelectOption[]
}

type StateRed = {
	service?: Service
	buisnessDays: number[]
	buisnessHours: { start: string; end: string }
	location: Location | undefined
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


export function BookingForm({ data, session, timeZoneOptions }: Props) {
	const {
		services = [],
		locations = [],
		addons = [],
		employees = [],
		availabilities = [],
		gigs = [],
		prevBooking,
	} = data

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
		location: undefined,
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
					location: undefined,
					locationOptions: locationOpts,
					staffOptions: staffOpts,
					addonOptions: addonOptions,
					total: pickedService?.price || 0,
				}

			case "SET_LOCATION":
				const selectedLocation = locations.find(
					(loc) => loc.id === action.payload
				)
				return { ...state, location: selectedLocation }

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

	// const defaultFormState: FormState = {
	// 	message: "",
	// 	errors: undefined,
	// 	fieldValues: {
	// 		service: prevBooking?.serviceId || "",
	// 		location: "",
	// 		staff: "",
	// 		addonIds: [],
	// 		date: prevBooking?.date || "",
	// 		timeStart: prevBooking?.time || "",
	// 		// timeEnd: '',
	// 		name: "",
	// 		email: session?.user?.email || "",
	// 		phone: "",
	// 		notes: "",
	// 	},
	// }

	const initState: BookAServiceState = {
		values: {
			serviceId: "",
			locationId: "",
			addonIds: [],
			employeeId: "",
			// start: "",
			date: "",
			time: "",
			address: "",
			timeZone: timeZoneOptions ? timeZoneOptions[0].value : "",
			customerId: session?.itemId || "",
			name: session?.user.name || "",
			email: session?.user.email || "",
			phone: "",
			notes: "",
			amountTotal: 0,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	// const [formState, formAction] = useFormState<FormState>(
	// 	onSubmit,
	// 	defaultFormState
	// )
	const { state, action, submitCount } = useForm(actionBookAService, initState)

	function calcTotalPrice(addonIds: string[], serviceId: string | undefined) {
		if (!serviceId) return 0
		const pickedAddons = addons.filter((ad) => addonIds.includes(ad.id))

		const addonsPrice = pickedAddons.reduce(
			(accumulator, currentValue) => accumulator + (currentValue?.price || 0),
			0
		)
		return addonsPrice + (getServicePicked(serviceId).price || 0)
	}

	useEffect(() => {
		// if (formState.message === "success") {
		// 	formRef.current?.reset()
		// }
		if (prevBooking?.serviceId) {
			dispatchRed({
				type: "SET_SERVICE",
				payload: prevBooking?.serviceId,
			})
		}
	}, [prevBooking])

	function findPartialDays(id: string) {
		// const pickedService = services.find((x: any) => x.id === stateRed.service?.id)

		const selectedEmpl = employees.find((x: any) => x.id === id)
		if (!selectedEmpl)
			return dispatchRed({ type: "SET_BLACKOUT_DATES", payload: [] })

		const buisnessHours = {
			start: stateRed.service?.buisnessHourOpen || "",
			end: stateRed.service?.buisnessHourClosed || "",
		}

		selectedEmpl.gigs = gigs.filter((gig) =>
			gig.employees.flatMap((emp) => emp.id).includes(selectedEmpl.id)
		)

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
				{!state.id || !state.url ? (
					<form action={action} ref={formRef} className={form}>
						<fieldset>
							<legend> The What </legend>

							<SelectField
								name={"serviceId"}
								label={"service"}
								defaultValue={prevBooking?.serviceId || state.values?.serviceId}
								required={true}
								onChange={(e) => {
									dispatchRed({
										type: "SET_SERVICE",
										payload: e.currentTarget.value,
									})
								}}
								options={serviceOptions}
								error={state.valueErrors?.serviceId}
							/>

							<SelectField
								name={"locationId"}
								label={"location"}
								defaultValue={
									prevBooking?.locationId || state.values?.locationId
								}
								required={true}
								onChange={(e) =>
									dispatchRed({
										type: "SET_LOCATION",
										payload: e.currentTarget.value,
									})
								}
								options={stateRed.locationOptions}
								error={state.valueErrors?.locationId}
							/>

							<InputField
								label={"Event Address"}
								name={"address"}
								type={stateRed.location?.address === "n/a" ? "text" : "hidden"}
								placeholder="123 Rainbow Rd, Mushroom KI 10203"
								required={stateRed.location?.address === "n/a"}
								defaultValue={state.values?.address}
								error={state.valueErrors?.address}
							/>

							<SelectField
								name={"employeeId"}
								label={"staff member"}
								defaultValue={
									prevBooking?.employeeId || state.values?.employeeId
								}
								required={true}
								onChange={(e) => {
									dispatchRed({
										type: "SET_STAFF",
										payload: e.currentTarget.value,
									})
									findPartialDays(e.currentTarget.value)
								}}
								options={stateRed.staffOptions}
								error={state.valueErrors?.employeeId}
							/>

							{addons.length > 0 && (
								<>
									<h5> Add-Ons</h5>
									{stateRed.addonOptions.length === 0 && (
										<p className="subtext"> no addons available </p>
									)}
									<div className={formStyles.addons_wrap}>
										{stateRed.addonOptions.map((addon) => (
											<label
												key={addon.id}
												htmlFor={addon.id}
												className={"checkbox"}
											>
												<input
													name={"addonIds"}
													value={addon.id}
													type={"checkbox"}
													readOnly={false}
													defaultChecked={addon.isChecked}
													onChange={(e) => {
														dispatchRed({
															type: "ADDON_CHECKBOX",
															payload: {
																value: e.currentTarget.value,
																isChecked: e.currentTarget.checked,
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
							<InputField
								name={"date"}
								label={"day of event"}
								// type={"date"}
								type={"hidden"}
								// defaultValue={prevBooking?.date || state.values?.date}
								value={stateRed.date}
								required={true}
								onChange={(e) =>
									dispatchRed({
										type: "SET_DATE",
										payload: e.currentTarget.value,
									})
								}
								// style={{ pointerEvents: "none", display: "none" }}
								error={state.valueErrors?.date}
								ref={dateRef}
							/>
							<h5>Day of Event</h5>
							<CalendarDatePicker
								blackoutDays={stateRed.blackoutDates}
								// blackoutDays={[]}
								buisnessDays={stateRed.service?.buisnessDays || []}
								onDateCallback={onDateCallback}
							/>
							<p className={"error"}>{state.valueErrors?.date}</p>

							<h5>Start Time</h5>
							<InputField
								name={"time"}
								// type={"time"}
								type={"hidden"}
								// defaultValue={prevBooking?.time || state.values?.time}
								value={stateRed.time}
								required={true}
								onChange={(e) => {
									dispatchRed({
										type: "SET_TIME",
										payload: e.currentTarget.value,
									})
									handleBlackoutTimes(e.currentTarget.value)
								}}
								error={state.valueErrors?.time}
								ref={timeRef}
							/>
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
							<p className={"error"}>{state.valueErrors?.time}</p>

							<SelectField
								name={"timeZone"}
								label={"event time zone"}
								defaultValue={
									(timeZoneOptions && timeZoneOptions[0].value) || ""
								}
								required={true}
								options={timeZoneOptions || []}
								error={state.valueErrors?.timeZone}
							/>
						</fieldset>

						<fieldset>
							<legend> The Who </legend>
							<InputField
								name={"customerId"}
								type={"hidden"}
								required={false}
								defaultValue={session?.itemId || state.values?.customerId}
								error={state.valueErrors?.customerId}
							/>

							<InputField
								name={"name"}
								type={"text"}
								required={false}
								defaultValue={session?.user?.name || state.values?.name}
								error={state.valueErrors?.name}
							/>

							<InputField
								name={"email"}
								type={"email"}
								placeholder="my-inbox@mail.lan"
								required={false}
								defaultValue={session?.user?.email || state.values?.email}
								error={state.valueErrors?.email}
							/>

							<InputField
								name={"phone"}
								type={"tel"}
								placeholder="000 000-0000"
								required={false}
								defaultValue={state.values?.phone}
								error={state.valueErrors?.phone}
							/>
							{/* // TODO switch phone to tel */}
							{/* <InputField
								name={"tel"}
								type={"tel"}
                placeholder="000 000-0000"
								required={false}
								defaultValue={formState.fieldValues.tel}
								error={formState.errors?.tel}
							/> */}
							<TextareaField
								name="notes"
								placeholder="..."
								defaultValue={state.values?.notes}
								required={false}
								error={state.valueErrors?.notes}
							/>
						</fieldset>
						{!state.success ? (
							<SubmitButton label={"Request Booking"} />
						) : (
							<p className={"success"}>{state.success}</p>
						)}
						<p className={"error"}>{state.error}</p>
					</form>
				) : (
					<div className={formStyles.success_message}>
						<BsFillBookmarkFill />
						<h2> Booking Requested! </h2>
						<p>{state.success}</p>
						<Link href={state.url}> Account bookings ⇢ </Link> <br />
						<Link href={`/bookings/${state.id}`}> Booking Status </Link>
					</div>
				)}
			</div>

			<aside key={stateRed.addonOptions.length} style={{ maxWidth: "20rem" }}>
				<table>
					<tbody>
						<tr>
							<td> Service: </td>
							<td> {stateRed.service?.name} </td>
						</tr>
						<tr>
							<td> Location: </td>
							<td>
								{stateRed.location?.name || (
									<span className="sub-text"> n/a </span>
								)}
							</td>
						</tr>
						<tr>
							<td> Staff: </td>
							<td>
								{stateRed.staff?.name || (
									<span className="sub-text"> n/a </span>
								)}
							</td>
						</tr>
						<tr>
							<td> Start Date: </td>
							<td>
								{stateRed.date ? (
									datePrettyLocal(stateRed.date + "T00:00-0800", "day")
								) : (
									<span className="sub-text"> n/a </span>
								)}
								{stateRed.time
									? " @ " + timePrettyTo12HourFormat(stateRed.time)
									: ""}
							</td>
						</tr>
						<tr>
							<td> Addons: </td>
							<td>
								<ul style={{ padding: "0" }}>
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
								{moneyFormatter(stateRed.total)}
								{/* {moneyFormatter(
									getServicePicked(stateRed.service?.id || "")?.price ||
										0 +
											stateRed.addonOptions
												.filter((addon) => addon.isChecked)
												.reduce(
													(accumulator, addon) =>
														accumulator + (addon.price || 0),
													0
												)
								)} */}
							</td>
						</tr>
					</tbody>
				</table>
			</aside>
		</div>
	)
}
