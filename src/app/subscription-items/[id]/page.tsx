import { DayMonthTime } from "@components/blocks/DayMonthTime"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { IconLink } from "@components/elements/IconLink"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { NoData } from "@components/elements/NoData"
import ErrorMessage from "@components/ErrorMessage"
import { SubscriptionUpdateForm } from "@components/forms/SubscriptionUpdateForm"
import { Card } from "@components/layouts/Card"
import Flex from "@components/layouts/Flex"
import { DialogPopup } from "@components/menus/DialogPopup"
import { StatusBadge } from "@components/StatusBadge"
import { isDateOlderThanNow } from "@lib/dateCheck"
import { datePrettyLocal } from "@lib/dateFormatter"
import fetchSubscriptionItem from "@lib/fetchdata/fetchSubscriptionItem"
import moneyFormatter, {
	calcDiscount,
	handleCouponDetails,
} from "@lib/moneyFormatter"
import { IconCoupon, IconUserAccountAvatar } from "@lib/useIcons"
import { booking_single } from "@styles/booking.module.css"
import { bg_c_accent, bg_c_tertiary } from "@styles/colorthemes.module.css"
import { item, perItemTotal } from "@styles/ecommerce/cart.module.css"
import {
	layout_breakout,
	layout_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { CgExternal } from "react-icons/cg"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

// export const metadata: Metadata = {
//   title: 'Booking | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESCRIPTION,
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
			description: envs.SITE_DESCRIPTION,
		}

	return {
		title: subscriptionItem.summary,
		description: envs.SITE_DESCRIPTION,
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
		// price,
		subscriptionPlan,
		status,
		isDelinquent,
		billing_interval,
		notes,
		user,
		dateCreated,
		dateModified,
		addons,
		coupon,
		trial_end,
	} = subscriptionItem

	return (
		<main className={page_layout}>
			<header className={layout_breakout}>
				<h1>
					<span role="doc-subtitle">subscription</span>
					{summary}
				</h1>
				<Flex alignItems={"center"}>
					<StatusBadge type={"subscriptionItem"} status={status} />{" "}
					<IconLink
						icon={"edit"}
						label="Update"
						href={`?${new URLSearchParams({ popup: "modal" })}`}
					/>
					{trial_end && isDateOlderThanNow(trial_end) && (
						<div className={["pill", bg_c_accent].join(" ")}>
							<span>Trial Ends: </span>
							<time dateTime={trial_end}>
								{datePrettyLocal(trial_end, "day")}
							</time>
						</div>
					)}
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
										{!coupon ? (
											<>
												<PriceTag price={subscriptionPlan.price} /> /
												{subscriptionPlan.billing_interval}
											</>
										) : (
											<>
												<s>
													<PriceTag price={subscriptionPlan.price} /> /
													{subscriptionPlan.billing_interval}
												</s>
												<br />
												<PriceTag
													price={calcDiscount(subscriptionPlan.price, coupon)}
												/>{" "}
												/{subscriptionPlan.billing_interval}
												<span
													className={["discount", "pill", bg_c_tertiary].join(
														" "
													)}
												>
													{handleCouponDetails(coupon)}
												</span>
												<br />
												<br />
												<div
													className={item}
													style={{ border: "dashed 1px var(--c-txt)" }}
												>
													<figure style={{ margin: "var(--space-ms)" }}>
														<IconCoupon />
													</figure>

													<Flex
														flexDirection={"column"}
														gap={"ms"}
														justifyContent={"space-between"}
													>
														<h5>{coupon.name}</h5>
														<span>coupon</span>
													</Flex>

													<div className={perItemTotal}>
														{coupon.percent_off ? (
															<p>
																-{coupon.percent_off} <small>%</small>
															</p>
														) : coupon.amount_off ? (
															<p>-{moneyFormatter(coupon.amount_off)}</p>
														) : (
															<></>
														)}
													</div>
												</div>
											</>
										)}
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
    status
    isDelinquent
    billing_interval
    notes
    dateCreated
    dateModified
    trial_end
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
    coupon {
      name
      amount_off
      percent_off
      duration
      duration_in_months
    }
  `
