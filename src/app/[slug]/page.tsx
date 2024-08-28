import { Card } from "@components/layouts/Card"
import {
	PageTHeaderMain,
	PageTHeaderMainAside,
	PageTMain,
} from "@components/layouts/PageTemplates"

import Error404 from "../not-found"
import ErrorMessage from "@components/ErrorMessage"
import { Page } from "@ks/types"
import { datePrettyLocal } from "@lib/dateFormatter"
import fetchPage from "@lib/fetchdata/fetchPage"
import { BlockRender } from "@components/blocks/BlockRender"
import { envs } from "@/envs"
import { Metadata, ResolvingMetadata } from "next"
import { StatusBadge } from "@components/StatusBadge"
import Link from "next/link"
import { BlockLayout } from "@components/layouts/BlockLayout"
import {
	page_layout,
	page_content,
	layout_full,
} from "@styles/layout.module.scss"
import { Header } from "@components/elements/Header"
export const revalidate = 5

type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
) {
	const { slug } = params
	const { page, error } = await fetchPage(slug)

	return {
		title: page?.title || "404" + " | " + envs.SITE_TITLE,
		description: envs.SITE_DESC,
	}
}

export default async function PageBySlug({ params }: Props) {
	const { page, error } = await fetchPage(params.slug)

	// if (loading) return <QueryLoading />
	if (error) return <ErrorMessage error={error} />
	if (!page)
		return (
			<Error404>
				{" "}
				<p>
					{" "}
					This page could not be found, or you do not have permission to view.{" "}
				</p>
			</Error404>
		)

	const {
		id,
		title,
		slug,
		status,
		featured_image,
		featured_video,
		excerpt,
		dateModified,
		dateCreated,
		template,
		author,
		categories,
		tags,
		content,
	} = page

	// console.log(data)

	// if (status === 'PRIVATE') return (
	//   <NotPublicPage status={status}>
	//     <p>This blog post is private</p>
	//   </NotPublicPage>
	// )

	// if (template === "FULLWIDTH" || template === "FULLWIDTH_WITHHEADER")
	// 	return (
	// 		<PageTHeaderMain
	// 			header={Header({
	// 				dateCreated,
	// 				dateModified,
	// 				title,
	// 				author,
	// 				featured_image,
	// 				template,
	// 			})}
	// 			main={Main(content, status, id)}
	// 			headerStyles={{
	// 				backgroundImage: `url(${featured_image})`,
	// 				backgroundPosition: "center",
	// 				backgroundRepeat: "no-repeat",
	// 				backgroundSize: "cover",
	// 				display: template === "FULLWIDTH_WITHHEADER" ? "block" : "none",
	// 			}}
	// 		/>
	// 	)

	// return (
	// 	<PageTHeaderMainAside
	// 		header={Header({
	// 			dateCreated,
	// 			dateModified,
	// 			title,
	// 			author,
	// 			featured_image,
	// 			template,
	// 		})}
	// 		main={Main(content, status, id)}
	// 		aside={Aside()}
	// 	/>
	// )

	return (
		<main className={page_layout}>
			<Header
				className={
					template !== "FULLWIDTH_WITHHEADER" ? "screen-reader-text" : undefined
				}
				//? not accessable
				// style={{
				//   ...(template !== 'FULLWIDTH_WITHHEADER' ? {display: 'none'} : {})
				// }}
			>
				<h1>{title}</h1>
			</Header>

			<div className={[page_content, layout_full].join(" ")}>
				{status !== "PUBLIC" && (
					<Card
						className={"siteWrapper"}
						style={{ marginInline: "auto", marginBlock: "1rem" }}
						direction={"row"}
					>
						<StatusBadge type={"page"} status={status} />
						<Link
							href={envs.BACKEND_URL + `/pages/${id}`}
							className={"button"}
							target={"_blank"}
						>
							{" "}
							edit page{" "}
						</Link>
					</Card>
				)}
				<BlockRender document={content?.document} />
			</div>

		</main>
	)
}

type Header = {
	title: string
	dateCreated: string
	dateModified: string
	featured_image: string
	template:
		| "FULLWIDTH"
		| "FULLWIDTH_WITHHEADER"
		| "WITHSIDEBAR"
		| "BLANK"
		| string
	author?: {
		name?: string
	}
}

//? Content
function HeaderOld({
	dateCreated,
	dateModified,
	title,
	author,
	featured_image,
	template,
}: Header) {
	// console.log(dateCreated);

	return (
		<>
			<BlockLayout layout={"1"}>
				<h1>{title}</h1>

				<span>
					<em> Published on {datePrettyLocal(dateCreated, "day")}</em>
					<br />
					<em> Modified on {datePrettyLocal(dateModified, "day")}</em>
				</span>
				<br />

				{author?.name && (
					<span>
						<em> · by {author?.name}</em>
					</span>
				)}

				{/* <span>View Count : 12345</span> */}
			</BlockLayout>
		</>
	)
}

function Main(content: any, status: Page["status"], id: string) {
	return (
		<>
			{status !== "PUBLIC" && (
				<Card
					className={"siteWrapper"}
					style={{ marginInline: "auto", marginBlock: "1rem" }}
					direction={"row"}
				>
					<StatusBadge type={"page"} status={status} />
					<Link
						href={envs.BACKEND_URL + `/pages/${id}`}
						className={"button"}
						target={"_blank"}
					>
						{" "}
						edit page{" "}
					</Link>
				</Card>
			)}
			<BlockRender document={content.document} />
		</>
	)
}

function Aside() {
	return (
		<>
			<Card>
				<h2> Aside</h2>
			</Card>
		</>
	)
}
