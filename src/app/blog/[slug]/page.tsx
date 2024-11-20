import Link from "next/link"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
import { datePrettyLocal } from "@lib/dateFormatter"
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
import {
	layout_full,
	layout_wide,
	page_content,
	page_layout,
	page_title,
} from "@styles/layout.module.scss"
import sArticles from "@styles/articles.module.scss"
import { StatusBadge } from "@components/StatusBadge"
import { CgProfile } from "react-icons/cg"
import { Header } from "@components/elements/Header"
import Flex from "@components/layouts/Flex"
import { TableOfContents } from "@components/menus/TableOfContents"
import { CSSProperties } from "react"
import { AsideBar } from "@components/layouts/AsideBar"
import { NoData } from "@components/elements/NoData"
import { findAllHeadings } from "@lib/contentHelpers"
import { TbCalendarMonth, TbCalendarUp } from "react-icons/tb"
import { ShareButton } from "@components/elements/ShareButton"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { IconLink } from "@components/elements/IconLink"

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

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!post)
		return (
			<NoDataFoundPage>
				<p> Post not found</p>
			</NoDataFoundPage>
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
				// className="post-layout"
			>
				<Header bgImage={featured_image} className={page_layout}>
					<figure className={styles.featured_image_wrap}>
						<ImageDynamic photoIn={featured_image} />
						<ImageDynamic photoIn={featured_image} />
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
							<ShareButton textToCopy={envs.FRONTEND_URL + `/blog/id/${id}`} />
						</li>
					</ul>
					{(session?.data.role?.canManagePosts || status !== 'PUBLIC') && (
						<Card>
							<Flex alignItems={'center'}>
								<StatusBadge type={"post"} status={status} />
                {(author.email === session?.user.email || session?.data?.role?.canManagePosts) && (
                  <IconLink
                    icon={"edit"}
                    href={envs.BACKEND_URL + `/posts/${id}`}
                    label={"edit"}
                  />
                )}
							</Flex>
						</Card>
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
					{content.document[0].type === "paragraph" &&
					!content.document[0].children[0].text ? (
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
