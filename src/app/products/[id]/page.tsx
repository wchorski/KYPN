import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { User } from "@ks/types"
import {
	datePrettyLocal,
	datePrettyLocalDay,
	datePrettyLocalTime,
} from "@lib/dateFormatter"
import { fetchEvent } from "@lib/fetchdata/fetchEvent"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession, Session } from "next-auth"
import Link from "next/link"
import styleProduct from "@styles/ecommerce/productSingle.module.scss"
import { BlockRender } from "@components/blocks/BlockRender"
import { AddTicketButton } from "@components/tickets/AddTicketButton"
import { Card } from "@components/layouts/Card"
import { TicketForm } from "@components/tickets/TicketForm"
import styles from "@styles/events/event.module.css"
import { AddToCalendar } from "@components/widgets/AddToCalendar"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { plainObj } from "@lib/utils"
import {
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import moneyFormatter from "@lib/moneyFormatter"
import { IconLink } from "@components/elements/IconLink"
import { isEmptyDocument } from "@lib/contentHelpers"
import Flex from "@components/layouts/Flex"
import ErrorPage from "@components/layouts/ErrorPage"
import fetchProduct from "@lib/fetchdata/fetchProduct"
import { CallbackLink } from "@components/menus/CallbackLink"
import AddToCartForm from "@components/ecommerce/AddToCartForm"
import { StatusBadge } from "@components/StatusBadge"

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { event, error } = await fetchEvent(id, query, session)

	if (!event || error)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESC,
		}

	const { summary, excerpt, image, tags, hosts } = event
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: summary,
		description: String(excerpt),
		openGraph: {
			images: [String(image), ...previousImages],
			title: summary,
			description: excerpt,
			url: envs.FRONTEND_URL + "/events/" + params.id,
			type: "article",
		},
		keywords: tags?.map((tag) => tag.name).join(", "),
		authors: hosts?.map((host) => ({
			name: host.name,
			email: host.email,
			url: host.email,
		})),
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

export default async function ProductById({ params }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)

	const { product, error } = await fetchProduct({ id, query, session })

	if (error) return <ErrorPage error={error} />
	if (!product) return notFound()

	const {
		image,
		name,
		description,
		price,

		stockCount,
		author,
		categories,
		tags,
		status,
	} = product

	return (
		<main className={page_layout}>
			<article
				className={[styleProduct.product, page_content, layout_site].join(" ")}
			>
				<header className={"sticky"}>
					<div className="container">
						<picture className={styles.featured}>
							<ImageDynamic photoIn={image} priority={true}/>
						</picture>
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

						<hr />

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
					</div>
				</header>

				<div>
					<h1>{name}</h1>

					<div
						className="info-cont"
						style={{
							display: "grid",
							alignContent: "center",
							height: "100%",
						}}
					>
						{/* <ul className="meta unstyled padding-0">
						</ul> */}
					</div>

					<Card>
						<Flex justifyContent={"space-between"} alignItems={"center"}>
							{/* {price > 0 ? (
								<span style={{ alignContent: "center" }}>
									{moneyFormatter(price)} per Ticket
								</span>
							) : (
								<span style={{ alignContent: "center" }}>RSVP</span>
							)} */}

							{!session ? (
								<CallbackLink>Login to Purchase</CallbackLink>
							) : session?.data.role === null ? (
								<VerifyEmailCard email={session.user.email} />
							) : (
								<>
									<AddToCartForm
										productId={id}
										sessionId={session.itemId}
                    eventId={undefined}
										type={"RENTAL"}
									/>
									<AddToCartForm
										productId={id}
                    eventId={undefined}
										sessionId={session.itemId}
										type={"SALE"}
									/>
								</>
							)}
						</Flex>
					</Card>
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
  isForSale
  price
  isForRent
  rental_price
  stockCount
  author {
    id
    name
    email
  }
  addons {
    id
    name
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
