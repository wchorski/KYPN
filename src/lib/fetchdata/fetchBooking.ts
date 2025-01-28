import { Booking } from "@ks/types"
import { keystoneContext } from "@ks/context"
import type { Session } from "next-auth"

type Props = {
	id: string
	session: Session | null
	query: string
}

export default async function fetchBooking({ id, session, query }: Props) {
	try {
		const booking = (await keystoneContext
			.withSession(session)
			.query.Booking.findOne({
				where: { id },
				query,
			})) as Booking

		const cartItemCount = await keystoneContext
			.withSession(session)
			.query.CartItem.count({
				where: { booking: { id: { equals: id } } },
			})

		return { booking, cartItemCount }
	} catch (error) {
		console.log("!!! fetch booking: ", error)
		return { error }
	}
}
