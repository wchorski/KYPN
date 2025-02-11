import AccountDash from "@components/menus/AccountDash"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { Order, Rental, User } from "@ks/types"
import { LoginToViewPage } from "@components/menus/LoginToViewPage"
import { Metadata } from "next"
import { envs } from "@/envs"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { fetchUser } from "@lib/fetchdata/fetchUser"
import {
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import { Grid } from "@components/layouts/Grid"
import {
	IconAccountBox,
	IconBookmark,
	IconCalendar,
	IconCalendarOutlined,
	IconShoppingBag,
	IconSubRepeat,
	IconTicketOutlined,
} from "@lib/useIcons"
import { fetchTicketsByUser } from "@lib/fetchdata/fetchTicketsByUser"
import { DashNav, DashNavData } from "@components/menus/DashNav"
import ErrorPage from "@components/layouts/ErrorPage"

export const metadata: Metadata = {
	title: "Account | " + envs.SITE_TITLE,
	description:
		"dashboard for orders, subscriptions, bookings, tickets, downloads",
}

const now = new Date().toISOString()

export default async function AccountPage() {
	const session = await getServerSession(nextAuthOptions)
	if (!session) return <LoginToViewPage />

	const { user, error: userError } = await fetchUser(
		session.itemId,
		USER_DASH_QUERY,
		session
	)

	const orders = (await keystoneContext
		.withSession(session)
		.query.Order.findMany({
			where: {
				user: {
					id: { equals: session.itemId },
				},
			},
			orderBy: [
				{
					dateCreated: "desc",
				},
			],
			query: `
        id
        total
        dateCreated
        status
        count
      `,
		})) as Order[]

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

	// TODO move this to a `fetchDATA` function
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

	if (userError) return <ErrorPage error={userError} />

	if (!user) return notFound()
	const { gig_requests, gigs } = employeeGigData.user

	const {
		tickets,
		sudoTicketCount = 0,
		error: errorTickets,
	} = await fetchTicketsByUser(user.id)

	const dashNavData: DashNavData = [
		{
			slug: "main",
			text: "Dashboard",
			isCount: true,
			icon: <IconAccountBox />,
		},
		{
			slug: "bookings",
			isCount: user.bookings.length > 0,
			icon: <IconBookmark />,
		},
		{
			slug: "subscriptions",
			isCount: user.subscriptions.length > 0,
			icon: <IconSubRepeat />,
		},
		{
			slug: "tickets",
			isCount:
				sudoTicketCount > 0 || (tickets && tickets.length > 0) ? true : false,
			icon: <IconTicketOutlined />,
		},
		{
			slug: "gigs",
			isCount: gigs.length > 0,
			icon: <IconCalendar />,
		},
		{
			slug: "gig_requests",
			text: "Gig Requests",
			isCount: gig_requests.length > 0,
			icon: <IconCalendarOutlined />,
		},
		{
			slug: "orders",
			isCount: orders.length > 0,
			icon: <IconShoppingBag />,
		},
		{
			slug: "rentals",
			isCount: false,
			// count: rentals.length > 0,
			icon: <></>,
		},
		{
			slug: "downloads",
			isCount: false,
			// count: downloads.length > 0,
			icon: <></>,
		},
	]

	const data = {
		user,
		orders,
		tickets,
		sudoTicketCount,
		rentals: [],
		downloads: [],
		employeeGigs: { gigs, gig_requests },
	}

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1 style={{ display: "none" }}> Account </h1>

				{!session.data.role && <VerifyEmailCard email={user.email} />}
			</header>

			<div className={[page_content, layout_wide].join(" ")}>
				<Grid layout={"1_4"} isAuto={false} alignContent={"start"}>
					<DashNav dashNavData={dashNavData} />

					<AccountDash data={data} />
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
      id
      name
    }
    status
  }
  subscriptions {
    id
    dateCreated
    status
    subscriptionPlan {
      id
      name
      status
      billing_interval
    }
  }
`
