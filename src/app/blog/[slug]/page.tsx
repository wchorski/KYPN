import type { PostCreateInput as Post } from ".keystone/types"
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
import { Header } from "@components/elements/Header"
import Flex from "@components/layouts/Flex"
import { TableOfContents } from "@components/menus/TableOfContents"

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
		// @ts-ignore
		title: title,
		description: String(excerpt),
		openGraph: {
			images: [String(featured_image), ...previousImages],
			// @ts-ignore
			title: title,
			// @ts-ignore
			description: excerpt,
			url: envs.FRONTEND_URL + "/blog/" + params.slug,
			type: "article",
		},
		// @ts-ignore
		keywords: tags?.map((tag) => tag.name).join(", "),
		// @ts-ignore
		authors: [{ name: author?.name, url: author?.url }],
	}
}

export default async function BlogPostBySlug({ params }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const slug = String(params.slug)
	const { post, error } = await fetchPost(slug, session)

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
		// allow_comments,
		author,
		categories,
		tags,
		content,
	} = post

	// const tableOfContentLinks = content?.document.find(
	// 	(block: any) => block.type === "heading"
	// )
	function findAllHeadings(arr: any) {
		return arr.reduce((acc: any, item: any) => {
			if (item.type === "heading") {
				acc.push(item)
			}

			for (let key in item) {
				if (Array.isArray(item[key])) {
					acc = acc.concat(findAllHeadings(item[key]))
				} else if (typeof item[key] === "object" && item[key] !== null) {
					acc = acc.concat(findAllHeadings([item[key]]))
				}
			}

			return acc
		}, [])
	}
	const tableOfContentLinks = findAllHeadings(content?.document)

	return (
		<main>
			<article
				//className={styles.post_article}
				className="post-layout"
			>
				<Header bgImage={featured_image} className={styles.post_header}>
					<figure className={styles.featured_image_wrap}>
						<ImageDynamic photoIn={featured_image} />
						<ImageDynamic photoIn={featured_image} />
					</figure>

					<h1 className={"post-title"}>{title}</h1>
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
				</Header>

				<div className="content width-full">
					{featured_video && (
						<div className="featured_video">
							<YouTubeVideo url={featured_video} altText="featured video" />
						</div>
					)}

					<BlockRender document={content.document} />
				</div>
				{template === "WITHSIDEBAR" && (
					<aside className="post-sidebar">
						<Flex flexDirection={"column"} alignContent="flex-start">
							<Card>
								<TableOfContents
									headerObjs={tableOfContentLinks}
									hrefBase={`/blog/${slug}`}
								/>
							</Card>
						</Flex>
					</aside>
				)}

				<footer className="width-wide">
					<Flex className="width-wide">
						<Card maxWidth="20rem">
							<h4 className="categories">Categories: </h4>
							<CategoriesPool />
						</Card>

						<Card maxWidth="20rem">
							<h4 className="tags">Tags:</h4>
							<TagsPool />
						</Card>
					</Flex>
				</footer>
			</article>
		</main>
	)
}
