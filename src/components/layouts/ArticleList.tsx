import styles, { post_card, row_graphic } from "@styles/articles.module.css"
import { Post, Product, Service, SubscriptionPlan } from "@ks/types"
import { GridList } from "@components/layouts/GridList"
import { NoDataFoundPage } from "./NoDataFoundPage"
import { StatusBadge } from "@components/StatusBadge"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import Link from "next/link"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { IconCalendar, IconUserAccountAvatar } from "@lib/useIcons"
import { datePrettyLocal } from "@lib/dateFormatter"
import { NoData } from "@components/elements/NoData"
import AddToCartForm from "@components/ecommerce/AddToCartForm"
import { PriceTag } from "@components/ecommerce/PriceTag"
import Flex from "./Flex"
import { IconLink } from "@components/elements/IconLink"
export const revalidate = 5

type Props = {
	type: "post" | "product" | "service" | "subscriptionPlan"
	items: Post[] | Product[] | Service[] | SubscriptionPlan[] | undefined
	buttonText?: string
}

export function ArticleList({ items = [], type, buttonText }: Props) {
	if (!items) return <NoData name={type} />
	// return <pre>{JSON.stringify(/{ items }, null, 2)}</pre>
	return (
		<GridList gap="1rem">
			{items.map((item: any, i: number) => (
				<ArticleItem item={item} key={i} type={type} buttonText={buttonText} />
			))}
		</GridList>
	)
}

type ArticleItem = {
	buttonText?: string
} & (
	| {
			type: "product"
			item: Product
	  }
	| {
			type: "post"
			item: Post
	  }
	| {
			type: "service"
			item: Service
	  }
	| {
			type: "subscriptionPlan"
			item: SubscriptionPlan
	  }
)

export function ArticleItem({
	item,
	buttonText = "read more",
	type,
}: ArticleItem) {
	if (!item) return null

	const { id, status, author, dateCreated, dateModified, excerpt } = item

	const featured_image = (() => {
		switch (type) {
			case "post":
				return item.featured_image
			case "product":
			case "service":
			case "subscriptionPlan":
				return item.image

			default:
				return undefined
		}
	})()

	const title = (() => {
		switch (type) {
			case "post":
				return item.title
			case "product":
			case "service":
			case "subscriptionPlan":
				return item.name

			default:
				return undefined
		}
	})()

	const link = (() => {
		switch (type) {
			case "post":
				return `/${type + "s"}/${item.slug}`
			case "product":
			case "service":
				return `/${type + "s"}/${id}`
			case "subscriptionPlan":
				return `/subscription-plans/${item.id}`

			default:
				return ""
		}
	})()

	return (
		<article className={post_card}>
			{status !== "PUBLIC" && (
				<div
					style={{
						position: "absolute",
						top: "var(--space-s)",
						left: "var(--space-s)",
						zIndex: "2",
					}}
				>
					<StatusBadge type={type} status={status} />
				</div>
			)}

			{type === "post" && item.featured_video ? (
				<figure className={[styles.featured_image, row_graphic].join(" ")}>
					<YouTubeVideo
						altText={`${title}'s featured video`}
						url={item.featured_video}
					/>
				</figure>
			) : (
				<Link href={link} className={row_graphic}>
					<figure className={[styles.featured_image, row_graphic].join(" ")}>
						<ImageDynamic photoIn={featured_image} key={id} />
					</figure>
				</Link>
			)}

			<header style={{ position: "relative" }}>
				<Link href={link} className="title">
					<h3> {title} </h3>
				</Link>

				{type === "post" && (
					<div className={styles.meta}>
						{author && (
							<Link className="author" href={`/users/${author?.id}`}>
								<span className="sub-text">
									<IconUserAccountAvatar />
									{author?.name}
								</span>
							</Link>
						)}

						<time
							dateTime={String(dateModified)}
							title="Publication update date"
						>
							<span className="sub-text">
								<IconCalendar />
								{datePrettyLocal(String(dateModified), "day")}
							</span>
						</time>
					</div>
				)}
			</header>

			<p className={styles.excerpt}>{excerpt}</p>

			<footer>
				{type === "product" ? (
					<>
						{item.isForSale && (
							<Flex justifyContent={"space-between"} alignItems={"center"}>
								<PriceTag price={item.price} hideZeroCents={true} />
								<AddToCartForm
									type={"SALE"}
									eventId={undefined}
									productId={item.id}
									// subscriptionPlanId={undefined}
									sessionId={"session.itemId"}
									buttonText={"Buy"}
								/>
							</Flex>
						)}
						{item.isForRent && (
							<Flex justifyContent={"space-between"} alignItems={"center"}>
								<PriceTag
									price={item.rental_price}
									hideZeroCents={true}
									billing_interval={'day'}
								/>
								<AddToCartForm
									productId={item.id}
									sessionId={"session.itemId"}
									eventId={undefined}
									// subscriptionPlanId={undefined}
									type={"RENTAL"}
									buttonText={"Rent"}
								/>
							</Flex>
						)}
					</>
				) : type === "subscriptionPlan" ? (
					<>
						<PriceTag
							price={item.price}
							hideZeroCents={true}
							billing_interval={item.billing_interval}
						/>{" "}
            <IconLink icon={'subscription'} title="subscribe" className="readmore button medium" href={`/subscription-plans/${item.id}`}/>
					</>
				) : (
					<Link className="readmore" href={link}>
						<em>{buttonText}</em>
					</Link>
				)}
			</footer>

			{/* <div className="menu admin">
	        <Link href={{ pathname: '/shop/products/update', query: { id: id }, }}> Edit ✏️ </Link>
	        <AddToCart id={id} />
	        <ProductDelete id={id}> Delete </ProductDelete>
	      </div> */}
		</article>
	)
}
