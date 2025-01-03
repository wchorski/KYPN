import Link from "next/link"
import {
	MdAutorenew,
	MdOutlineAccountBox,
	MdOutlineDownload,
	MdShop,
} from "react-icons/md"
import { HiCalendar, HiOutlineCalendar, HiOutlineTicket } from "react-icons/hi"
import AccountDash from "@components/menus/AccountDash"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { Order, Rental, User } from "@ks/types"
import { LoginToViewPage } from "@components/menus/LoginToViewPage"
// import fetchTicketsByUser from "@lib/fetchdata/fetchTicketsByUser"
import styles from "@styles/menus/dashboard.module.css"
import { Metadata } from "next"
import { envs } from "@/envs"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { BsSignpost } from "react-icons/bs"
import { fetchUser } from "@lib/fetchdata/fetchUser"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import { Grid } from "@components/layouts/Grid"

export const metadata: Metadata = {
	title: "Account | " + envs.SITE_TITLE,
	description:
		"dashboard for orders, subscriptions, bookings, tickets, downloads",
}

type Props = {
	searchParams: {
		dashState:
			| "main"
			| "orders"
			| "rentals"
			| "subscriptions"
			| "downloads"
			| "tickets"
			| "gigs"
			| "gig_requests"
	}
	params: { id: string }
}

const now = new Date().toISOString()

export default async function AccountPage({ params, searchParams }: Props) {
	const { dashState = "main" } = searchParams

	const session = await getServerSession(nextAuthOptions)
	if (!session) return <LoginToViewPage />

	// const user = await keystoneContext.withSession(session).query.User.findOne({
	//   // TODO have pagination in mind (or maybe by date filtering?), split this into diff queries
	//   where: {
	//     id: session.itemId,
	//   },
	//   query: USER_DASH_QUERY,
	// }) as User

	const { user, error: userError } = await fetchUser(
		session.itemId,
		USER_DASH_QUERY,
		session
	)

	// const orders = await keystoneContext.withSession(session).query.Order.findMany({
	//   where: {
	//     user: {
	//       id: { equals: session.itemId },
	//     }
	//   },
	//   orderBy: [
	//     {
	//       dateCreated: "desc"
	//     }
	//   ],
	//   query: `
	//     id
	//     total
	//     dateCreated
	//     status
	//     items{
	//       quantity
	//     }
	//   `,
	// }) as Order[]

	// const rentals = await keystoneContext.withSession(session).query.Rental.findMany({
	//   where: {
	//     customer: {
	//       id: { equals: session.itemId },
	//     }
	//   },
	//   orderBy: [
	//     {
	//       start: "desc"
	//     }
	//   ],
	//   query: `
	//     id
	//     start
	//     end
	//     durationInHours
	//     location
	//     delivery
	//     status
	//   `,
	// }) as Rental[]

	const employeeGigData = (await keystoneContext
		.withSession(session)
    // .sudo()
		.graphql.run({
			variables: {
				where: {
					id: session.itemId,
				},
				gigsWhere: {
					end: {
						gt: now,
					},
				},
				gigRequestsWhere: {
					end: {
						gt: now,
					},
				},
				orderBy: [
					{
						start: "desc",
					},
				],
			},
			query: `
      query User($where: UserWhereUniqueInput!, $gigsWhere: BookingWhereInput!, $gigRequestsWhere: BookingWhereInput!) {
        user(where: $where){
          id
          gig_requests(where: $gigRequestsWhere) {
            id
            start
            end
            summary
            status
            service {
              name
            }
          }
          gigs(where: $gigsWhere) {
            id
            start
            end
            summary
            status
            service {
              name
            }
          }
        }
      }
    `,
		})) as { user: User }
	const { gig_requests, gigs } = employeeGigData.user

	// const {tickets, error } = await fetchTicketsByUser(user?.id)

	if (!user) return notFound()
	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1 style={{ display: "none" }}> Account </h1>

				{!session.data.role && <VerifyEmailCard email={user.email} />}
			</header>

			<div className={[page_content, layout_site].join(" ")}>
				<Grid layout={"1_4"}>
					<nav className={styles.dashnav}>
						<ul>
							<li>
								<Link
									href={"/account?dashState=main#main"}
									className={
										dashState === "main" ? styles.linkactive : styles.dashlink
									}
								>
									Dashboard <MdOutlineAccountBox />
								</Link>
							</li>
							{gigs.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=gigs#gigs"}
										className={
											dashState === "gigs" ? styles.linkactive : styles.dashlink
										}
									>
										Gigs <HiCalendar />
									</Link>
								</li>
							)}
							{gig_requests.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=gig_requests#gig_requests"}
										className={
											dashState === "gig_requests"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Gig Requests <HiOutlineCalendar />
									</Link>
								</li>
							)}
							{/* {orders.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=orders#orders"}
										className={
											dashState === "orders"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Orders <MdShop />
									</Link>
								</li>
							)} */}
							{/* {rentals.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=rentals#rentals"}
										className={
											dashState === "rentals"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Rentals <BsSignpost />
									</Link>
								</li>
							)} */}
							{/* {user.subscriptions.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=subscriptions#subscriptions"}
										className={
											dashState === "subscriptions"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Subscriptions <MdAutorenew />
									</Link>
								</li>
							)} */}
							{/* //todo when downloads are added */}
							{/* {false && (
								<li>
									<Link
										href={"/account?dashState=downloads#downloads"}
										className={
											dashState === "downloads"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Downloads <MdOutlineDownload />
									</Link>
								</li>
							)} */}
							{/* {tickets && tickets?.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=tickets#tickets"}
										className={
											dashState === "tickets"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Tickets <HiOutlineTicket />
									</Link>
								</li>
							)} */}
						</ul>
					</nav>

					<AccountDash
						dashState={dashState}
						user={user}
						// orders={orders}
						// rentals={rentals}
						// tickets={tickets}
						employeeGigs={{ gigs, gig_requests }}
					/>
				</Grid>
			</div>
		</main>
	)
}

const USER_DASH_QUERY = `
  id
  name
  email
  phone
  bookings {
    id
    price
    start
    service {
      name
    }
    status
  }
`
// const USER_DASH_QUERY = `
//   id
//   name
//   email
//   phone
//   bookings {
//     id
//     price
//     start
//     service {
//       name
//     }
//     status
//   }
//   subscriptions{
//     id
//     subscriptionPlan {
//       id
//       name
//     }
//     status
//     dateModified
//     dateCreated
//   }
//   tickets {
//     id
//     orderCount
//     status
//     event {
//       id
//       start
//       summary
//       location {
//         id
//         name
//       }
//     }
//   }
// `
