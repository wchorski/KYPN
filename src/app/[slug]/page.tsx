import { BlockRender } from "@components/blocks/BlockRender"
import { IconLink } from "@components/elements/IconLink"
import { AsideBar } from "@components/layouts/AsideBar"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { TableOfContents } from "@components/menus/TableOfContents"
import { StatusBadge } from "@components/StatusBadge"
import { findAllHeadings } from "@lib/contentHelpers"
import fetchPage from "@lib/fetchdata/fetchPage"
import {
	layout_content,
	layout_full,
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"

import { envs } from "@/envs"
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
	const { slug } = await params
	const { page, error } = await fetchPage(slug, QUERY_PAGE)

	return {
		title: page?.title || "404" + " | " + envs.SITE_TITLE,
		description: envs.SITE_DESCRIPTION,
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
	if (!page) return notFound()

	const { id, title, status, template, content } = page

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
						// className={"siteWrapper"}
						style={{ marginInline: "auto", marginBlock: "1rem" }}
						direction={"row"}
						gap={"var(--space-m)"}
					>
						<StatusBadge type={"page"} status={status} />
						<IconLink
							href={envs.BACKEND_URL + `/pages/${id}`}
							target={"_blank"}
							label={"edit page"}
							icon={"edit"}
						/>
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
