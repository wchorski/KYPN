import { BlockRender } from "@components/blocks/BlockRender"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import { Header } from "@components/elements/Header"
import { IconLink } from "@components/elements/IconLink"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { NoData } from "@components/elements/NoData"
import { ShareButton } from "@components/elements/ShareButton"
import { AsideBar } from "@components/layouts/AsideBar"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { CategoriesPool } from "@components/menus/CategoriesPool"
import { TableOfContents } from "@components/menus/TableOfContents"
import { TagsPool } from "@components/menus/TagsPool"
import { StatusBadge } from "@components/StatusBadge"
import { findAllHeadings, isEmptyDocument } from "@lib/contentHelpers"
import { datePrettyLocal } from "@lib/dateFormatter"
import { fetchPost } from "@lib/fetchdata/fetchPost"
import sArticles from "@styles/articles.module.css"
import { featured_image_wrap } from "@styles/blog/blogpost.module.css"
import {
	layout_full,
	layout_wide,
	page_content,
	page_layout,
	page_title,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import type { CSSProperties } from "react"
import { CgProfile } from "react-icons/cg"
import { TbCalendarMonth, TbCalendarUp } from "react-icons/tb"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

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
	const { slug } = await params
	// fetch data
	const session = await getServerSession(nextAuthOptions)
	const { post } = await fetchPost(String(slug), session)

	if (!post)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESCRIPTION,
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
			url: envs.FRONTEND_URL + "/posts/" + slug,
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
	const { slug } = await params
	const { post, error } = await fetchPost(String(slug), session)

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!post) return notFound()

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

	const tableOfContentLinks = findAllHeadings(content?.document)

	return (
		<main>
			<article
				className={page_layout}
				style={
					{
						//todo why is this not working?
						"--sidebar-comp-max-width": "500px",
						"--sidebar-width-footprint": "300px",
						// maxWidth,
					} as CSSProperties
				}
			>
				<Header bgImage={featured_image} className={page_layout}>
					<figure
						className={featured_image_wrap}
						style={
							{
								// backgroundImage: "url('/assets/question.png')",
								"--bg-image-url": `url('${featured_image}')`,
							} as CSSProperties
						}
					>
						{/* <ImageDynamic photoIn={featured_image} className="background" alt="post background"/> */}
						<ImageDynamic
							photoIn={featured_image}
							alt="featured image for post"
						/>
					</figure>

					<h1
						className={page_title}
						style={{ marginBottom: "var(--space-ms)" }}
					>
						{title}
					</h1>

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
						{dateCreated && (
							<li>
								<time dateTime={String(dateCreated)} title="date first posted">
									<span className="sub-text">
										<TbCalendarMonth />
										{datePrettyLocal(String(dateCreated), "day")}
									</span>
								</time>
							</li>
						)}
						{dateModified && (
							<li>
								<time
									dateTime={String(dateModified)}
									title="date last modified"
								>
									<span className="sub-text">
										<TbCalendarUp />
										{datePrettyLocal(String(dateModified), "day")}
									</span>
								</time>
							</li>
						)}
						<li>
							<ShareButton textToCopy={envs.FRONTEND_URL + `/posts/id/${id}`} />
						</li>
					</ul>
					{(session?.data.role?.canManagePosts || status !== "PUBLIC") && (
						<Flex alignItems={"center"}>
							<StatusBadge type={"post"} status={status} />
							{(author?.id === session?.itemId ||
								session?.data?.role?.canManagePosts) && (
								<IconLink
									icon={"edit"}
									href={envs.BACKEND_URL + `/posts/${id}`}
									label={"edit"}
								/>
							)}
						</Flex>
					)}
					<hr />
				</Header>

				<div className={[page_content, layout_full].join(" ")}>
					{featured_video && (
						<div className="featured_video">
							<YouTubeVideo url={featured_video} altText="featured video" />
						</div>
					)}
					{/* {JSON.stringify(content, null, 2)} */}
					{/* //? warns reader that there is no content writen into the post */}
					{isEmptyDocument(content.document) ? (
						<p>
							<NoData />
							This post is still in the works. Check back later when more
							content is published
						</p>
					) : (
						<BlockRender document={content.document} />
					)}
				</div>
				{template === "WITHSIDEBAR" && (
					<AsideBar aria_label="Post Sidebar">
						<Flex
							flexDirection={"column"}
							alignItems="flex-start"
							style={{ marginLeft: "var(--space-m)" }}
						>
							<Card>
								<TableOfContents headerObjs={tableOfContentLinks} />
							</Card>
						</Flex>
					</AsideBar>
				)}

				<footer className={layout_wide}>
					<Flex>
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
