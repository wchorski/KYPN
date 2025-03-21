import { EmployeeGigDecisionForm } from "@components/bookings/EmployeeGigDecisionForm"
import { Table } from "@components/elements/Table"
import { TicketList } from "@components/events/TicketList"
import { Card } from "@components/layouts/Card"
import { StatusBadge } from "@components/StatusBadge"
import type { 
	Booking,
	Order,
	Rental,
	SubscriptionItem,
	Ticket,
	User,
 } from "@ks/types"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import styles from "@styles/menus/dashboard.module.css"

import { VerifyEmailCard } from "./VerifyEmailCard"

type Props = {
	data: {
		user: User
		orders: Order[]
		rentals: Rental[]
		tickets: Ticket[] | undefined
		sudoTicketCount: number
		employeeGigs: {
			gig_requests: Booking[]
			gigs: Booking[]
		}
	}
}

export default function AccountDash({ data }: Props) {
	const {
		user,
		tickets = [],
		sudoTicketCount,
		orders = [],
		rentals = [],
		employeeGigs: { gigs, gig_requests },
	} = data

	const bookingCells = user?.bookings?.map((book: Booking) => ({
		date:
			datePrettyLocalDay(book.start || "") +
			" " +
			datePrettyLocalTime(book.start || ""),
		service: book.service?.name || "-- service not selected --",
		status: <StatusBadge type={"booking"} status={book.status} />,
		// end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
		details: book.id,
	}))

	const orderCells = orders.map((order) => ({
		date: datePrettyLocalDay(order.dateCreated || ""),
		time: datePrettyLocalTime(order.dateCreated || ""),
		total: moneyFormatter(order.total),
		count: order.count,
		status: <StatusBadge type={"order"} status={order.status} />,
		details: order.id,
	}))

	const subscriptionCells = user.subscriptions?.map(
		(sub: SubscriptionItem) => ({
			started: datePrettyLocalDay(sub.dateCreated || ""),
			plan: sub.subscriptionPlan.name,
			status: <StatusBadge type={"subscriptionItem"} status={sub.status} />,
			details: sub.id,
		})
	)

	const rentalCells = rentals?.map((item) => ({
	  start: datePrettyLocalDay(item.start),
	  days: item.days,
	  status: <StatusBadge type={"rental"} status={item.status} />,
	  address: item.address,
	  delivery: item.delivery ? "Delivery" : "Pickup",
	  details: item.id,
	}));

	// todo add employee gig to table. try to make both gigs and requests into one table, but may just split to make it easiuer
	const gigCells = gigs.map((gig) => ({
		date:
			datePrettyLocalDay(gig.start || "") +
			" " +
			datePrettyLocalTime(gig.start || ""),
		service: gig.service?.name || "-- service not selected --",
		status: <StatusBadge type={"booking"} status={gig.status} />,
		// end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
		details: gig.id,
	}))

	const gigRequestCells = gig_requests.map((gig) => ({
		date:
			datePrettyLocalDay(gig.start || "") +
			" " +
			datePrettyLocalTime(gig.start || ""),
		service: gig.service?.name || "-- service not selected --",
		status: <StatusBadge type={"booking"} status={gig.status} />,
		// end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
		details: gig.id,
		actions: (
			<EmployeeGigDecisionForm
				userId={user.id}
				bookingId={gig.id}
				decision={gig.status}
			/>
		),
	}))

	return (
		<div className={styles.dashboard}>
			<Card id="main" marginBlock={"0"}>
				<h3>Dashboard</h3>

				<ul>
					<li> {user.name}</li>
					<li> {user.email}</li>
				</ul>
			</Card>

			{user.bookings.length > 0 && (
				<Card id="bookings" marginBlock={"0"}>
					<h3>Bookings</h3>

					<Table
						caption=""
						headers={["service", "date", "status", "details"]}
						cells={bookingCells}
						route={`/bookings`}
					/>
				</Card>
			)}
			{gigs.length > 0 && (
				<Card id="gigs" marginBlock={"0"}>
					<h3>Gigs</h3>

					<Table
						caption=""
						headers={["service", "date", "status", "details"]}
						cells={gigCells}
						route={`/bookings`}
					/>
				</Card>
			)}

			{gig_requests.length > 0 && (
				<Card id="gig_requests" marginBlock={"0"}>
					<h3>Gig Requests</h3>

					<Table
						caption=""
						headers={["service", "date", "status", "actions", "details"]}
						cells={gigRequestCells}
						route={`/bookings`}
					/>
				</Card>
			)}
			{rentals.length > 0 && (
        <Card id="rentals" marginBlock={'0'}>
          <h3

          >
            Rentals
          </h3>

          <Table
            caption=""
            headers={[
              "start",
              "days",
              "status",
              "address",
              "delivery",
              "details",
            ]}
            cells={rentalCells}
            route={`/rentals`}
          />
        </Card>
      )}

			{user.subscriptions.length > 0 && (
				<Card id="subscriptions" marginBlock={"0"}>
					<h3>Subscriptions</h3>

					<Table
						caption=""
						headers={["started", "plan", "status", "details"]}
						cells={subscriptionCells}
						route={`/subscription-items`}
					/>
				</Card>
			)}

			{/* // todo when download link is added to product */}
			{/* {downloads && (
        <Card id="downloads" marginBlock={'0'}>
          <h3

          >
            Downloads
          </h3>
        </Card>
      )} */}

			{tickets.length > 0 && (
				<Card id="tickets" marginBlock={"0"}>
					<h3>Tickets</h3>

					<TicketList tickets={tickets} />
					<hr />
					<p>
						<button disabled={true}>View past event tickets</button>
					</p>
				</Card>
			)}

			{tickets.length === 0 && sudoTicketCount > 0 && (
				<Card id="tickets" marginBlock={"0"}>
					<h3>Tickets</h3>

					<p>You must verify your account to view purchased tickets</p>

					<VerifyEmailCard email={user.email} />
				</Card>
			)}

			{orders.length > 0 && (
				<Card id="orders" marginBlock={"0"}>
					<h3>Orders</h3>

					<Table
						caption=""
						headers={["date", "time", "total", "count", "status", "details"]}
						cells={orderCells}
						route={`/orders`}
					/>
					<hr />
					<p>{"// TODO add pagination"}</p>
				</Card>
			)}
		</div>
	)
}
