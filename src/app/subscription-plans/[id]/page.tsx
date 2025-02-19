import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { User } from "@ks/types"
import { fetchEvent } from "@lib/fetchdata/fetchEvent"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession, Session } from "next-auth"
import Link from "next/link"
import { BlockRender } from "@components/blocks/BlockRender"
import { Card } from "@components/layouts/Card"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import moneyFormatter from "@lib/moneyFormatter"
import { IconLink } from "@components/elements/IconLink"
import { isEmptyDocument } from "@lib/contentHelpers"
import ErrorPage from "@components/layouts/ErrorPage"
import fetchProduct from "@lib/fetchdata/fetchProduct"
import { CallbackLink } from "@components/menus/CallbackLink"
import AddToCartForm from "@components/ecommerce/AddToCartForm"
import { StatusBadge } from "@components/StatusBadge"
import {
	product_page,
	price_text,
	featured_img,
} from "@styles/ecommerce/product.module.css"
import fetchSubscriptionPlan from "@lib/fetchdata/fetchSubscriptionPlan"
import { PriceTag } from "@components/ecommerce/PriceTag"

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
			description: envs.SITE_DESC,
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
								href={envs.BACKEND_URL + `/products/${id}`}
							>
								<span>Edit Product Details</span>
							</IconLink>
						</Card>
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
							<p className={"debug"}>moving back singular addToCart Button</p>
							<Link
								href={`/checkout/subscription?id=${id}`}
								className="button medium"
							>
								Checkout
							</Link>
						</Card>
					)}
					{!session ? (
						<CallbackLink>Login to Purchase</CallbackLink>
					) : session?.data.role === null ? (
						<VerifyEmailCard email={session.user.email} />
					) : !["PUBLIC", "PRIVATE"].includes(status) ? (
						<Card>
							<StatusBadge type={"product"} status={status} />
						</Card>
					) : (
						<AddToCartForm
							subscriptionPlanId={id}
							productId={undefined}
							eventId={undefined}
							sessionId={session.itemId}
							type={"SUBSCRIPTION"}
							addonOptions={addonOptions}
						/>
					)}

					<p className={"debug"}>
						Pre Checkout form in popup (addons, coupons)
					</p>

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
			{/* <footer>
				{canEdit(author, session) && (
					<section className={layout_wide}>
						<Card>
							<h2> Author Panel </h2>

							<IconLink
								icon={"edit"}
								label={"Edit"}
								href={envs.BACKEND_URL + `/products/${id}`}
								className={"button medium"}
							>
								<span>Edit Product Details</span>
							</IconLink>
						</Card>
					</section>
				)}
			</footer> */}
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
