import Link from "next/link"
import ErrorMessage from "@components/ErrorMessage"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import {
	datePrettyLocal,
	datePrettyLocalDay,
	datePrettyLocalTime,
} from "@lib/dateFormatter"
import { TagsPool } from "@components/menus/TagsPool"
import { CategoriesPool } from "@components/menus/CategoriesPool"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { Post, User } from "@ks/types"
import { envs } from "@/envs"
import { BlockRender } from "@components/blocks/BlockRender"
import { fetchPost } from "@lib/fetchdata/fetchPost"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { Metadata, ResolvingMetadata } from "next"
import { Card } from "@components/layouts/Card"
import styles from "@styles/blog/blogpost.module.scss"
import sArticles from "@styles/articles.module.scss"
import { PostTHeaderContentFooter } from "@components/layouts/PostTemplates"
import { StatusBadge } from "@components/StatusBadge"
import Error404 from "../../not-found"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { FiCalendar } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"

export const revalidate = 5

type Props = {
	params: {
		slug: string | string[] | undefined
	}
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params

	// fetch data
	const session = await getServerSession(nextAuthOptions)
	const { post } = await fetchPost(String(params?.slug), session)

	if (!post)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESC,
		}

	const { title, excerpt, featured_image, tags, author } = post

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: title,
		description: String(excerpt),
		openGraph: {
			images: [String(featured_image), ...previousImages],
			title: title,
			description: excerpt,
			url: envs.FRONTEND_URL + "/blog/" + params.slug,
			type: "article",
		},
		keywords: tags?.map((tag) => tag.name).join(", "),
		authors: [{ name: author?.name, url: author?.url }],
	}
}

export default async function BlogPageBySlug({ params }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { post, error } = await fetchPost(String(params.slug), session)

	if (error) return <ErrorMessage error={error} />

	if (!post)
		return (
			<Error404>
				{" "}
				<p>
					{" "}
					The post could not be found, or you do not have permission to view.{" "}
				</p>
			</Error404>
		)

	const {
		id,
		title,
		pinned,
		status,
		featured_image,
		featured_video,
		excerpt,
		dateModified,
		dateCreated,
		template,
		allow_comments,
		author,
		categories,
		tags,
		content,
	} = post

	// return (
	//   <PostTHeaderContentFooter
	//     headerBgImg={featured_image}
	//     header={Header({ title, featured_image, author, dateCreated, status })}
	//     content={Content(post)}
	//     footer={Footer()}
	//   />
	// );
	return (
		<main>
			<article className={styles.post_article}>
				<header
					className={styles.post_header}
					style={{
						...(featured_image
							? { backgroundImage: `url(${featured_image})` }
							: {}),
						// backgroundColor: headerBgColor,
						// display: headerIsDisplayed ? 'grid' : 'none',
					}}
				>
					<BlockLayout layout="1">
						<figure className={styles.featured_image_wrap}>
							<ImageDynamic photoIn={featured_image} />
							<ImageDynamic photoIn={featured_image} />
						</figure>

						<div className={styles.title_wrap}>
							<h1>{title}</h1>
							{status !== "PUBLIC" && (
								<div>
									<StatusBadge type={"post"} status={status} />
								</div>
							)}
							<ul className={sArticles.meta + " unstyled"}>
								{author && (
									<li>
										<Link className="author" href={`/users/${author?.id}`}>
											<span className="sub-text">
												{" "}
												<CgProfile />
												{author?.name}
											</span>
										</Link>
									</li>
								)}
								<li>
									<time dateTime={dateModified} title="Publication update date">
										<span className="sub-text">
											<FiCalendar />
											{datePrettyLocal(String(dateModified), "day")}
										</span>
									</time>
								</li>
							</ul>
						</div>
					</BlockLayout>
				</header>

				<section>
					<BlockLayout layout="1" className={styles.page_content}>
						{featured_video && (
							<div className="featured_video">
								<YouTubeVideo url={featured_video} altText="featured video" />
							</div>
						)}

						<BlockRender document={content.document} />
					</BlockLayout>
				</section>

				<footer className="siteWrapper">
					<Card maxWidth="20rem">
						<h4 className="categories">Categories: </h4>
						<CategoriesPool />
					</Card>

					<Card maxWidth="20rem">
						<h4 className="tags">Tags:</h4>
						<TagsPool />
					</Card>
				</footer>
			</article>
		</main>
	)
}
