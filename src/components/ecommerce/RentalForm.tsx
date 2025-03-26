"use client"
import { SelectField } from "@components/forms/SelectField"
import { SubmitButton } from "@components/forms/SubmitButton"
import { useCart } from "@components/hooks/CartStateContext"
import { InputField } from "@components/InputField"
import { TextareaField } from "@components/TextareaField"
import type {  Rental, SelectOption  } from "@ks/types"
import type {
	RentalToCartState} from "@lib/actions/postRentalToCart";
import {
	postRentalToCart
} from "@lib/actions/postRentalToCart"
import { calcDaysBetweenTimestamps } from "@lib/dateCheck"
import { dateFormatLocalDateTime } from "@lib/dateFormatter"
import { form } from "@styles/menus/form.module.scss"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
// import { useForm } from "@hooks/useForm"
import { useFormState } from "react-dom"

type Props = {
	customerId: string
	currRental?: Rental
	timeZoneOptions: SelectOption[]
}

const today = new Date()

export function RentalForm({ customerId, currRental, timeZoneOptions }: Props) {
	const router = useRouter()
	const { addToCart } = useCart()

	const initState: RentalToCartState = {
		values: {
			customerId: customerId,
			start: currRental?.start || "",
			end: currRental?.end || "",
			address: currRental?.address || "",
			delivery: currRental?.delivery ? currRental.delivery : false,
			notes: "",
			rentalId: currRental?.id,
			timeZone: timeZoneOptions[0].value,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	// TODO make `days` reactive number that updates on field change (start, end)
	// const { state, action, submitCount } = useForm(postRentalToCart, initState)
	const [days, setDays] = useState(
		currRental ? calcDaysBetweenTimestamps(currRental.start, currRental.end) : 1
	)
	const [state, action] = useFormState(async (state: any, formData: any) => {
		let isError = false
		try {
			const resData = await postRentalToCart(initState, formData)
			if (resData.cartItem) addToCart(resData.cartItem) // Update React Context
			return resData
		} catch (error) {
			console.log(error)
			isError = true
			return state
		} finally {
			if (!isError){ 
        router.push("/checkout")
        // router.refresh()
      }
		}
	}, initState)

	function handleDaysUpdate(start: string, end: string) {
		setDays(calcDaysBetweenTimestamps(start, end))
	}

	return (
		<form className={form} action={action}>
			<legend>Rental Form</legend>
			<fieldset>
				<legend>Dates & Times</legend>
				<InputField
					type={"datetime-local"}
					name="start"
					error={state?.valueErrors?.start}
					min={today.toISOString().split("T")[0] + "T00:00:00"}
					required={true}
					defaultValue={
						dateFormatLocalDateTime(currRental?.start || "") ||
						state?.values?.start
					}
					onChange={(e) =>
						handleDaysUpdate(e.currentTarget.value, state.values.end)
					}
				/>
				<InputField
					type={"datetime-local"}
					name="end"
					error={state?.valueErrors?.end}
					required={true}
					min={
						state?.values?.start ||
						today.toISOString().split("T")[0] + "T00:00:00"
					}
					defaultValue={
						dateFormatLocalDateTime(currRental?.end || "") || state?.values?.end
					}
					onChange={(e) =>
						handleDaysUpdate(state.values.start, e.currentTarget.value)
					}
				/>
				<SelectField
					name={"timeZone"}
					label={"Event time zone"}
					defaultValue={
						currRental?.timeZone ||
						(timeZoneOptions && timeZoneOptions[0].value)
					}
					required={true}
					options={timeZoneOptions || []}
					error={state?.valueErrors?.timeZone}
				/>

				<p>Days: {days}</p>
			</fieldset>
			<fieldset>
				<legend>Location</legend>
				<InputField
					type={"text"}
					name={"address"}
					error={state?.valueErrors?.address}
					required={true}
					defaultValue={currRental?.address || state?.values?.address}
					// defaultValue={'TESTTESTSTETE'}
				/>
				<InputField
					type={"checkbox"}
					name={"delivery"}
					error={state?.valueErrors?.delivery}
					defaultChecked={currRental?.delivery || state?.values?.delivery}
				/>
				<small>Check yes if requesting delivery to the above address</small>
			</fieldset>
			<fieldset>
				<TextareaField
					name={"notes"}
					defaultValue={currRental?.notes || state.values.notes}
					error={state?.valueErrors?.notes}
				/>
				<InputField
					type="hidden"
					name={"customerId"}
					error={state?.valueErrors?.customerId}
					required={true}
					defaultValue={state?.values?.customerId}
				/>
				<InputField
					type="hidden"
					name={"rentalId"}
					error={state?.valueErrors?.rentalId}
					required={true}
					defaultValue={state?.values?.rentalId}
				/>
			</fieldset>

			<SubmitButton label={currRental ? "Update" : "Reserve"} />
			{!state?.success ? (
				<></>
			) : (
				<p className={"success"}>
					{state?.success}
					<br />
					<Link href={state?.url || ""}>Checkout</Link>
				</p>
			)}

			<p className={"error"}>{state?.error}</p>
		</form>
	)
}
