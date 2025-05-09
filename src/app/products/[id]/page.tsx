import { BlockRender } from "@components/blocks/BlockRender"
import AddToCartForm from "@components/ecommerce/AddToCartForm"
import { IconLink } from "@components/elements/IconLink"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { CallbackLink } from "@components/menus/CallbackLink"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { StatusBadge } from "@components/StatusBadge"
import type { User } from "@ks/types"
import { isEmptyDocument } from "@lib/contentHelpers"
import { fetchEvent } from "@lib/fetchdata/fetchEvent"
import fetchProduct from "@lib/fetchdata/fetchProduct"
import moneyFormatter from "@lib/moneyFormatter"
import { category_list } from "@styles/categories.module.css"
import { price_text } from "@styles/ecommerce/product.module.css"
import { featured } from "@styles/events/event.module.css"
import { _1_1, grid } from "@styles/grid.module.css"
import { page_content, page_layout } from "@styles/layout.module.css"
import { tags_list } from "@styles/tags.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Session } from "next-auth"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

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
			description: envs.SITE_DESCRIPTION,
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
			url: envs.FRONTEND_URL + "/events/" + id,
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
		isForSale,
		isForRent,
		author,
		categories,
		tags,
		status,
		// stockCount,
	} = product

	return (
		<main className={page_layout}>
			<article
				className={[grid, _1_1].join(" ")}
				style={{ gridColumn: "layout_site", gap: "var(--space-ml)" }}
			>
				<header>
					<div style={{ position: "sticky", top: "9rem" }}>
						<figure className={featured}>
							<ImageDynamic photoIn={image} priority={true} />
						</figure>

						{canEdit(author, session) && (
							<Card direction={"row"} gap={"var(--space-m)"}>
								<StatusBadge status={status} type={"product"} />
								<IconLink
									icon={"edit"}
									label={"Edit"}
									href={envs.CMS_URL + `/products/${id}`}
								>
									<span>Edit Product Details</span>
								</IconLink>
							</Card>
						)}
						<Flex>
							<ul className={category_list}>
								{categories?.map((cat) => (
									<li key={cat.id}>
										<Link href={`/categories?ids=${cat.id}`}>{cat.name}</Link>
									</li>
								))}
							</ul>

							<ul className={tags_list}>
								{tags?.map((tag) => (
									<li key={tag.id}>
										<Link href={`/tags?ids=${tag.id}`}>{tag.name}</Link>
									</li>
								))}
							</ul>
						</Flex>
					</div>
				</header>

				<div className={page_content}>
					<h1>{name}</h1>

					{!session ? (
						<CallbackLink className="button medium">
							Login to Purchase
						</CallbackLink>
					) : session?.data.role === null ? (
						<VerifyEmailCard email={session.user.email} />
					) : !["PUBLIC", "PRIVATE"].includes(status) ? (
						<Card>
							<StatusBadge type={"product"} status={status} />
						</Card>
					) : (
						<>
							{isForSale && (
								<Card
									direction={"row"}
									verticleAlign={"center"}
									gap={"var(--space-m)"}
									justifyContent={"space-between"}
									alignItems={"center"}
								>
									<span className={price_text}>
										{price > 0 ? moneyFormatter(price) : "FREE"}
									</span>

									<AddToCartForm
										productId={id}
										eventId={undefined}
										type={"SALE"}
									/>
								</Card>
							)}
							{isForRent && (
								<Card
									direction={"row"}
									verticleAlign={"center"}
									gap={"var(--space-m)"}
									justifyContent={"space-between"}
									alignItems={"center"}
								>
									<span className={price_text}>
										{price > 0 ? (
											<span className={price_text}>
												{/* //TODO don't hardcode `day` */}
												{moneyFormatter(price)} <small>/day</small>
											</span>
										) : (
											<span className={price_text}>FREE</span>
										)}
									</span>
									<AddToCartForm
										productId={id}
										eventId={undefined}
										type={"RENTAL"}
									/>
								</Card>
							)}
						</>
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
			{/* <footer>
				{canEdit(author, session) && (
					<section className={layout_wide}>
						<Card>
							<h2> Author Panel </h2>

							<IconLink
								icon={"edit"}
								label={"Edit"}
								href={envs.CMS_URL + `/products/${id}`}
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
	if (!session || !author) return false
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
