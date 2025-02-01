import styles, { post_card } from "@styles/articles.module.scss"
import { Post, Product, Service } from "@ks/types"
import { GridList } from "@components/layouts/GridList"
import { NoDataFoundPage } from "./NoDataFoundPage"
import { StatusBadge } from "@components/StatusBadge"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import Link from "next/link"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { IconCalendar, IconUserAccountAvatar } from "@lib/useIcons"
import { datePrettyLocal } from "@lib/dateFormatter"
import { NoData } from "@components/elements/NoData"
export const revalidate = 5

type Props = {
	type: "post" | "product" | "service"
	items: Post[] | Product[] | Service[] | undefined
}

export function ArticleList({ items = [], type }: Props) {
	if (!items) return <NoData name={type} />
	// return <pre>{JSON.stringify(/{ items }, null, 2)}</pre>
	return (
		<GridList gap="1rem" paddingInline="1rem">
			{items.map((item: any, i: number) => (
				<ArticleItem item={item} key={i} type={type} />
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
				return item.name

			default:
				return undefined
		}
	})()

	const link = (() => {
		switch (type) {
			case "post":
				return `/blog/${item.slug}`
			case "product":
			case "service":
				return `/${type + "s"}/${id}`

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
				<figure className={styles.featured_image}>
					<YouTubeVideo
						altText={`${title}'s featured video`}
						url={item.featured_video}
					/>
				</figure>
			) : (
				<Link href={link}>
					<figure className={styles.featured_image}>
						<ImageDynamic photoIn={featured_image} key={id} />
					</figure>
				</Link>
			)}

			<div className="wrapper">
				<header style={{ position: "relative" }}>
					<Link href={`/${item.typeof + "s"}/${id}`} className="title">
						<h3> {title} </h3>
					</Link>

					<div className={styles.meta}>
						{author && (
							<Link className="author" href={`/users/${author?.id}`}>
								<span className="sub-text">
									<IconUserAccountAvatar />
									{/* <CgProfile /> */}
									{author?.name}
								</span>
							</Link>
						)}

						<time
							dateTime={String(dateModified)}
							title="Publication update date"
						>
							<span className="sub-text">
								{/* <FiCalendar /> */}
								<IconCalendar />
								{datePrettyLocal(dateModified, "day")}
							</span>
						</time>
					</div>
				</header>

				<p className={styles.excerpt}>
					{excerpt}{" "}
					<Link className="readmore" href={link}>
						<em>{buttonText}</em>
					</Link>
				</p>

				{/* <div className="menu admin">
	        <Link href={{ pathname: '/shop/products/update', query: { id: id }, }}> Edit ✏️ </Link>
	        <AddToCart id={id} />
	        <ProductDelete id={id}> Delete </ProductDelete>
	      </div> */}
			</div>
		</article>
	)
}
