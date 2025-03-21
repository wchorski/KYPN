import { BlockRender } from "@components/blocks/BlockRender"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { SubscriptionPlanLinkBuilder } from "@components/ecommerce/SubscriptionPlanLinkBuilder"
import { IconLink } from "@components/elements/IconLink"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import { CallbackLink } from "@components/menus/CallbackLink"
import { DialogPopup } from "@components/menus/DialogPopup"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { StatusBadge } from "@components/StatusBadge"
import type {  User  } from "@ks/types"
import { isEmptyDocument } from "@lib/contentHelpers"
import fetchSubscriptionPlan from "@lib/fetchdata/fetchSubscriptionPlan"
import { plainObj } from "@lib/utils"
import {
	featured_img,
	price_text,
	product_page,
} from "@styles/ecommerce/product.module.css"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Session } from "next-auth";
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { subscriptionPlan, error } = await fetchSubscriptionPlan({
		id,
		query,
		session,
	})

	if (!subscriptionPlan || error)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESCRIPTION,
		}

	const { name, excerpt, image, tags, author } = subscriptionPlan
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: name + " | " + envs.SITE_TITLE,
		description: String(excerpt),
		openGraph: {
			images: [String(image), ...previousImages],
			title: name,
			description: excerpt,
			url: envs.FRONTEND_URL + "/subscription-plans/" + params.id,
			type: "article",
		},
		keywords: tags?.map((tag) => tag.name).join(", "),
		// authors: hosts?.map((host) => ({
		// 	name: host.name,
		// 	email: host.email,
		// 	url: host.email,
		// })),
		authors: {
			name: author.name,
			url: author.email,
		},
	}
}

type Props = {
	params: {
		id: string
	}
	searchParams: {
		[key: string]: string | string[] | undefined
		q: string | undefined
	}
}

export default async function SubscriptionPlanByIdPage({ params }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)

	const { subscriptionPlan, error } = await fetchSubscriptionPlan({
		id,
		query,
		session,
	})

	if (error) return <ErrorPage error={error} />
	if (!subscriptionPlan) return notFound()

	const {
		image,
		name,
		description,
		price,
		stockMax,
		author,
		categories,
		tags,
		status,
		billing_interval,
		addons,
	} = subscriptionPlan

	const addonOptions = addons.map((ad) => ({
		name: ad.name,
		label: ad.name,
		id: ad.id,
		isChecked: false,
		price: ad.price,
	}))

	return (
		<main className={page_layout}>
			<article className={[product_page, page_content, layout_site].join(" ")}>
				<header className={"sticky"}>
					<figure className={featured_img}>
						{/* <figcaption>
							<StatusBadge type={"product"} status={status} />
						</figcaption> */}
						<ImageDynamic photoIn={image} priority={true} />
					</figure>

					{canEdit(author, session) && (
						<Card direction={"row"} gap={"var(--space-m)"}>
							<StatusBadge status={status} type={"product"} />
							<IconLink
								icon={"edit"}
								label={"Edit"}
								href={envs.BACKEND_URL + `/subscription-plans/${id}`}
							>
								<span>Edit Product Details</span>
							</IconLink>
						</Card>
					)}

					{!session ? (
						<CallbackLink>Login to Purchase</CallbackLink>
					) : session?.data.role === null ? (
						<VerifyEmailCard email={session.user.email} />
					) : !["PUBLIC", "PRIVATE"].includes(status) ? (
						<Card>
							<StatusBadge type={"subscriptionPlan"} status={status} />
						</Card>
					) : (
						<IconLink
              className="button medium"
							icon={"subscription"}
							label="Build a Plan"
							href={`?${new URLSearchParams({ popup: "modal" })}`}
						/>
					)}

					<ul className="categories">
						{categories?.map((cat) => (
							<li key={cat.id}>
								<Link href={`/search?categories=${cat.id}`}>{cat.name}</Link>
							</li>
						))}
					</ul>

					<ul className="tags">
						{tags?.map((tag) => (
							<li key={tag.id}>
								<Link href={`/search?tags=${tag.id}`}>{tag.name}</Link>
							</li>
						))}
					</ul>
				</header>

				<div>
					<h1>{name}</h1>

					{!session ? (
						<CallbackLink>Login to Purchase</CallbackLink>
					) : session?.data.role === null ? (
						<VerifyEmailCard email={session.user.email} />
					) : !["PUBLIC", "PRIVATE"].includes(status) ? (
						<Card>
							<StatusBadge type={"product"} status={status} />
						</Card>
					) : (
						<Card
							direction={"row"}
							verticleAlign={"center"}
							gap={"var(--space-m)"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<span className={price_text}>
								{/* {price > 0 ? moneyFormatter(price) : "FREE"} */}
								<PriceTag
									price={price}
									billing_interval={billing_interval}
									hideZeroCents={true}
									// subtext={'billed ' + billing_interval}
								/>
							</span>

							<p>Subscription</p>
						</Card>
					)}

					{!isEmptyDocument(description?.document) && (
						<>
							<br />
							<h3 className={"thick-underline-text"}>About</h3>
							<br />

							<BlockRender document={description?.document} />
						</>
					)}
				</div>
			</article>
	
			<DialogPopup
				// title={``}
				// onClose={() => null}
				// onOk={() => null}
				buttonLabel=""
			>
				{session ? (
					<SubscriptionPlanLinkBuilder
						subscriptionPlan={plainObj({ ...subscriptionPlan, id })}
						customerId={session.itemId}
						addons={plainObj(addons)}
					/>
				) : (
					<p>
						<CallbackLink>Login</CallbackLink> to subscribe
					</p>
				)}
			</DialogPopup>
		</main>
	)
}

function canEdit(author: User, session: Session | null) {
	if (!session) return false
	if (session.data?.role?.canManageProducts) return true
	if (author.id === session.itemId) return true
	return false
}

const query = `
  image
  name
  slug
  trial_period_days
  description {
    document
  }
  status
  billing_interval
  price
  stockMax
  author {
    id
    name
    email
  }
  addons {
    id
    name
    price
  }
  dateCreated
  dateModified
  categories {
    id
    name
  }
  tags {
    id
    name
  }
`
