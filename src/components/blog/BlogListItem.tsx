import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import { StatusBadge } from "@components/StatusBadge"
import type {  Post, User  } from "@ks/types"
import { datePrettyLocal } from "@lib/dateFormatter"
// import styles from "@styles/blog/blog.module.scss";
import styles from "@styles/articles.module.css"
import Link from "next/link"
import React from "react"
import { CgProfile } from "react-icons/cg"
import { FiCalendar } from "react-icons/fi"

import { ImageDynamic } from "../elements/ImageDynamic"

type Props = {
	id: string
	slug: string
	title: string
	excerpt: string
	featured_image: string
	featured_video: string
	dateModified: string
	author: User
	status: Post["status"]

	buttonText?: string
	keyI?: number
}

export const BlogListItem = ({
	id,
	slug,
	title,
	excerpt,
	featured_image,
	featured_video,
	dateModified,
	author,
	buttonText = "read more",
	status,
}: Props) => {
	return (
		<article className={styles.post_card}>
			{status !== "PUBLIC" && (
				<div
					style={{
						position: "absolute",
						top: "var(--space-s)",
						left: "var(--space-s)",
						zIndex: "2",
					}}
				>
					<StatusBadge type={"post"} status={status} />
				</div>
			)}

			{featured_video ? (
				<figure className={styles.featured_image}>
					<YouTubeVideo
						altText={`${title}'s featured video`}
						url={featured_video}
					/>
				</figure>
			) : (
				<Link href={`/posts/${slug}`}>
					<figure className={styles.featured_image}>
						<ImageDynamic photoIn={featured_image} key={id} />
						{/* <Image
              src={featured_image}
              alt={`post featured image`}
              width={300}
              height={300}
            /> */}
					</figure>
				</Link>
			)}

			<div className="wrapper">
				<header style={{ position: "relative" }}>
					<Link href={`/posts/${slug}`} className="title">
						<h3> {title} </h3>
					</Link>

					<div className={styles.meta}>
						{author && (
							<Link className="author" href={`/users/${author?.id}`}>
								<span className="sub-text">
									{" "}
									<CgProfile />
									{author?.name}
								</span>
							</Link>
						)}
						<time dateTime={dateModified} title="Publication update date">
							<span className="sub-text">
								<FiCalendar />
								{datePrettyLocal(dateModified, "day")}
							</span>
						</time>
					</div>
				</header>

				<p className="excerpt">
					{excerpt}{" "}
					<Link className="readmore" href={`/posts/${slug}`}>
						<em>{buttonText}</em>
					</Link>{" "}
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
