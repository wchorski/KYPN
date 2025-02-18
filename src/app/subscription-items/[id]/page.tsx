import ErrorMessage from "@components/ErrorMessage"
import { DayMonthTime } from "@components/blocks/DayMonthTime"
import { UserBadge } from "@components/menus/UserBadge"

import { datePrettyLocal } from "@lib/dateFormatter"
import fetchBooking from "@lib/fetchdata/fetchBooking"
import moneyFormatter from "@lib/moneyFormatter"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"
import { CgExternal } from "react-icons/cg"
import { DialogPopup } from "@components/menus/Dialog"
import { StatusBadge } from "@components/StatusBadge"
import { booking_single } from "@styles/booking.module.css"
import { Metadata, ResolvingMetadata } from "next"
import { envs } from "@/envs"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { BlockRender } from "@components/blocks/BlockRender"
import {
	layout_breakout,
	layout_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import Flex from "@components/layouts/Flex"
import { IconUserAccountAvatar } from "@lib/useIcons"
import { Card } from "@components/layouts/Card"
import { NoData } from "@components/elements/NoData"
import Image from "next/image"
import { Callout } from "@components/blocks/Callout"
import fetchSubscriptionItem from "@lib/fetchdata/fetchSubscriptionItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { SubscriptionUpdateForm } from "@components/forms/SubscriptionUpdateForm"
import { IconLink } from "@components/elements/IconLink"

// export const metadata: Metadata = {
//   title: 'Booking | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESC,
// }

// throw new Error('Bookings: cartItem -> checkout -> orderItem ')

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params
	const { subscriptionItem, error } = await fetchSubscriptionItem({
		id,
		session,
		query: `summary`,
	})

	if (!subscriptionItem)
		return {
			title: "Booking | " + envs.SITE_TITLE,
			description: envs.SITE_DESC,
		}

	return {
		title: subscriptionItem.summary,
		description: envs.SITE_DESC,
	}
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function SubscriptionItemByIdPage({
	params,
	searchParams,
}: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params

	const { subscriptionItem, error } = await fetchSubscriptionItem({
		id,
		session,
		query: query,
	})

	if (error) return <ErrorMessage error={error} />
	if (!subscriptionItem) return notFound()

	const {
		summary,
		price,
		subscriptionPlan,
		status,
		isDelinquent,
		billing_interval,
		notes,
		user,
		dateCreated,
		dateModified,
		addons,
	} = subscriptionItem

	return (
		<main className={page_layout}>
			<header className={layout_breakout}>
				<h1>{summary}</h1>
				<Flex alignItems={"center"}>
					<StatusBadge type={"subscriptionItem"} status={status} />{" "}
					<IconLink
						icon={"edit"}
						label="Edit"
						href={`?${new URLSearchParams({ popup: "modal" })}`}
					/>
					{user && (
						<Card
							direction={"row"}
							gap={"var(--space-m)"}
							paddingBlock={"s"}
							marginBlock={"0"}
						>
							<figure style={{ margin: "0" }}>
								{user.image ? (
									<Image
										src={user.image}
										alt={"user avatar"}
										width={20}
										height={20}
									/>
								) : (
									<IconUserAccountAvatar />
								)}
							</figure>
							<span>
								<Link href={`/users/${user.id}`}>
									{user?.name + " | " + user.email}
								</Link>
							</span>
						</Card>
					)}
				</Flex>
				<small>last updated: {datePrettyLocal(dateModified, "full")}</small>
			</header>

			<div className={layout_content}>
				<div className={booking_single}>
					<table>
						<tbody>
							<tr>
								<td>Subscription Plan: </td>
								<td>
									<Flex alignItems="center">
										<Link href={`/subscription-plans/${subscriptionPlan.id}`}>
											{subscriptionPlan.name}
										</Link>

										<ImageDynamic
											photoIn={subscriptionPlan.image}
											alt={"Subscription Plan Featured Image"}
											height={100}
											width={100}
										/>
									</Flex>
								</td>
							</tr>
							<tr>
								<td>
									<label>Client: </label>
								</td>
								<td>
									<span>{user.name}</span>

									<br />
									<span>{user.email}</span>
									<br />
								</td>
							</tr>
							<tr>
								<td>
									<label>Started: </label>{" "}
								</td>
								<td>
									<DayMonthTime dateString={dateCreated} />
								</td>
							</tr>
							<tr>
								<td>
									<label>Price: </label>
								</td>
								<td>
									<span className="price">
										{moneyFormatter(price)}{" "}
										<em className="sub-text"> /{billing_interval}</em>
									</span>
								</td>
							</tr>
						</tbody>
					</table>

					{addons.length > 0 && (
						<>
							<h2>Add-Ons</h2>
							<ul className="addons">
								{addons.map((ad) => (
									<li
										key={ad.id}
										title={ad.excerpt}
										style={{ display: "flex" }}
									>
										<Link
											href={`/addons/${ad.id}`}
											target={"_blank"}
											title={`view add-on ${ad.name}`}
										>
											{ad.name}
											<CgExternal />
										</Link>
									</li>
								))}
							</ul>
							<p className="align-right">
								<Link href={`/addons`}> View more addons</Link>
							</p>
						</>
					)}

					<h2> Notes </h2>
					<p>{notes ? notes : <NoData name="notes" />}</p>
				</div>
			</div>

			<DialogPopup
				title={`Update Subscription`}
				// onClose={() => null}
				// onOk={() => null}
				buttonLabel=""
			>
				<SubscriptionUpdateForm status={status} subscriptionItemId={id} />
				<br />
				<br />
				<Link href={envs.BACKEND_URL + `/subscription-items/${id}`}>
					subscription-item
				</Link>
			</DialogPopup>
		</main>
	)
}

const query = `  
    id
    summary
    price
    status
    isDelinquent
    billing_interval
    notes
    dateCreated
    dateModified
    user {
      id
      name
      email
      image
    }
    subscriptionPlan {
      id
      image
      name
      excerpt
      status
      price
      billing_interval
    }
    addons {
      id
      name
      excerpt
    }
  `
