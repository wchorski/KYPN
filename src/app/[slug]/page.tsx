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
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"

import { envs } from "@/envs"
const { SITE_TITLE } = envs
export const revalidate = 5

type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props) {
	// parent: ResolvingMetadata
	const { slug } = await params
	const { page, error } = await fetchPage(slug, QUERY_PAGE)
	if (error)
		return {
			title: "error | " + SITE_TITLE,
		}
	return {
		title: slug === "home" ? SITE_TITLE : `${page?.title} | ${SITE_TITLE}`,
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

	const { id, title, status, template = "FULLWIDTH", content } = page

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
					// template !== "FULLWIDTH_WITHHEADER"
					// 	? "screen-reader-text"
					// 	: undefined,
					layout_site,
				].join(" ")}
				//? not accessable
				style={{
					...(!["FULLWIDTH_WITHHEADER", "WITH_TABLEOFCONTENTS"].includes(
						template
					)
						? { visibility: "collapse", height: "0" }
						: {}),
				}}
			>
				<h1 style={{ textAlign: "center" }}>{title}</h1>
				<hr className={layout_wide} />
			</header>

			<div
				id="main-page-content"
				className={[
					page_content,
					// template === "WITH_TABLEOFCONTENTS" ? layout_content : layout_full,
				].join(" ")}
			>
				{/* <p className={"screen-reader-text"}>Start of main page content</p> */}

				{status !== "PUBLIC" && (
					<Card
						// className={"siteWrapper"}
						style={{ marginInline: "auto", marginBlock: "1rem" }}
						direction={"row"}
						gap={"var(--space-m)"}
					>
						<StatusBadge type={"page"} status={status} />
						<IconLink
							href={envs.CMS_URL + `/pages/${id}`}
							target={"_blank"}
							label={"edit page"}
							icon={"edit"}
						/>
					</Card>
				)}

				<BlockRender document={content?.document} />

				{/* <DocumentContentClientFetch slug={slug} /> */}
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
