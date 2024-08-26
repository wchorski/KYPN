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
import sLayout, { layout_site, page_content, page_layout } from "@styles/layout.module.scss"
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
import { slugFormat } from "@lib/slugFormat"
import { KSHeading, TOCLink } from "@ks/types"

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

	function findAllHeadings(arr: any) {
		return arr.reduce((acc: TOCLink[], item: KSHeading) => {
			if (item.type === "heading") {
				const newItem = {
					type: item.type,
					level: item.level,
					slug: slugFormat(item.children[0].text),
					text: item.children[0].text,
				}
				acc.push(newItem)
			}

			for (let key in item) {
				const typedKey = key as keyof KSHeading

				if (Array.isArray(item[typedKey])) {
					acc = acc.concat(findAllHeadings(item[typedKey]))
				} else if (
					typeof item[typedKey] === "object" &&
					item[typedKey] !== null
				) {
					acc = acc.concat(findAllHeadings([item[typedKey]]))
				}
			}

			return acc
		}, [])
	}
	const tableOfContentLinks = findAllHeadings(content?.document)

	return (
		<main>
      <div className="siteWrapper" style={{background: 'limegreen'}}>
        site wide block
      </div>
			<article
				className={sLayout.page_layout}
				// className="post-layout"
        >
				<Header bgImage={featured_image} className={page_layout}>
					<figure className={styles.featured_image_wrap}>
						<ImageDynamic photoIn={featured_image} />
						<ImageDynamic photoIn={featured_image} />
					</figure>

					<h1 className={sLayout.page_title}>{title}</h1>
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
						{dateModified && (
							<li>
								<time
									dateTime={String(dateModified)}
									title="Publication update date"
								>
									<span className="sub-text">
										<FiCalendar />
										{datePrettyLocal(String(dateModified), "day")}
									</span>
								</time>
							</li>
						)}
					</ul>
				</Header>
        
        {/* <div className={layout_site}> */}
          <div className={[page_content, sLayout.layout_full].join(" ")}>
            {featured_video && (
              <div className="featured_video">
                <YouTubeVideo url={featured_video} altText="featured video" />
              </div>
            )}

            <BlockRender document={content.document} />
          </div>
          {template === "WITHSIDEBAR" && (
            // <aside className="post-sidebar">
            <aside className={sLayout.page_sidebar}>
              <Flex flexDirection={"column"} alignContent="flex-start">
                <Card>
                  <TableOfContents headerObjs={tableOfContentLinks} />
                </Card>
              </Flex>
            </aside>
          )}
        {/* </div> */}

				<footer className={sLayout.layout_wide}>
					<Flex className={sLayout.layout_wide}>
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
