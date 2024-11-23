import { Card } from "@components/layouts/Card"
import fetchPage from "@lib/fetchdata/fetchPage"
import { BlockRender } from "@components/blocks/BlockRender"
import { envs } from "@/envs"
import { ResolvingMetadata } from "next"
import { StatusBadge } from "@components/StatusBadge"
import Link from "next/link"
import {
	page_layout,
	page_content,
	layout_full,
	layout_site,
	layout_content,
} from "@styles/layout.module.scss"
import { AsideBar } from "@components/layouts/AsideBar"
import Flex from "@components/layouts/Flex"
import { TableOfContents } from "@components/menus/TableOfContents"
import { findAllHeadings } from "@lib/contentHelpers"
import { CSSProperties } from "react"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
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
	const { page, error } = await fetchPage(slug, QUERY_PAGE)

	return {
		title: page?.title || "404" + " | " + envs.SITE_TITLE,
		description: envs.SITE_DESC,
	}
}

export default async function PageBySlug({ params }: Props) {
	const { slug } = await params
	const { page, error } = await fetchPage(slug, QUERY_PAGE)

	// if (loading) return <QueryLoading />
	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!page)
		return (
			<NoDataFoundPage>
				<p>No post found</p>
			</NoDataFoundPage>
		)

	const {
		id,
		title,
		status,
		template,
		content,
	} = page

	const tableOfContentLinks = findAllHeadings(content?.document)

	return (
		<main
			className={page_layout}
			style={
				{
					"--sidebar-comp-max-width": "500px",
					"--sidebar-width-footprint": "300px",
				} as CSSProperties
			}
		>
			<header
				className={[
					template !== "FULLWIDTH_WITHHEADER"
						? "screen-reader-text"
						: undefined,
					layout_site,
				].join(" ")}
				//? not accessable
				// style={{
				//   ...(template !== 'FULLWIDTH_WITHHEADER' ? {display: 'none'} : {})
				// }}
			>
				<h1>{title}</h1>
			</header>

			<div
				className={[
					page_content,
					template === "WITH_TABLEOFCONTENTS" ? layout_content : layout_full,
				].join(" ")}
			>
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
			{template === "WITH_TABLEOFCONTENTS" && (
				<AsideBar aria_label="Page Sidebar">
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
		</main>
	)
}

const QUERY_PAGE = `
    id
    slug
    title
    template
    dateCreated
    dateModified
    status
    content {
      document
    }
`