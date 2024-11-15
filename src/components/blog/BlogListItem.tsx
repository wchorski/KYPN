import React from "react"
import Link from "next/link"
import { datePrettyLocal } from "@lib/dateFormatter"
import { FiCalendar } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { ImageDynamic } from "../elements/ImageDynamic"
import { Post, User } from "@ks/types"
// import styles from "@styles/blog/blog.module.scss";
import styles from "@styles/articles.module.scss"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import { StatusBadge } from "@components/StatusBadge"

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
  key?:number
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
  key
}: Props) => {
	return (
		<article className={styles.post_card}>
			<figure className={styles.featured_image}>
				{featured_video ? (
					<YouTubeVideo
						altText={`${title}'s featured video`}
						url={featured_video}
					/>
				) : (
					<Link href={`/blog/${slug}`}>
						<ImageDynamic photoIn={featured_image} key={key}/>
						{/* <Image
              src={featured_image}
              alt={`post featured image`}
              width={300}
              height={300}
            /> */}
					</Link>
				)}
			</figure>

			<div className="wrapper">
				<header style={{ position: "relative" }}>
					{status !== "PUBLIC" && (
						<div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
							<StatusBadge type={"post"} status={status} />
						</div>
					)}
					<Link href={`/blog/${slug}`} className="title">
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
					<Link className="readmore" href={`/blog/${slug}`}>
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
