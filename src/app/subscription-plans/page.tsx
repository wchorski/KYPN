import { NoData } from "@components/elements/NoData"
import { ArticleList } from "@components/layouts/ArticleList"
import { AsideBar } from "@components/layouts/AsideBar"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { CategoriesPool } from "@components/menus/CategoriesPool"
import { TagsPool } from "@components/menus/TagsPool"
import { Pagination } from "@components/Pagination"
import fetchSubscriptonPlans from "@lib/fetchdata/fetchSubscriptonPlans"
import {
	layout_full,
	layout_site_to_wide,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import type { CSSProperties } from "react"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

type Props = {
	searchParams: {
		[key: string]: string | string[] | undefined
		categories: string | undefined
		page: string | undefined
	}
}

export const metadata: Metadata = {
	title: `Subscription Plans | ` + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default async function SubscriptionPlansPage({ searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { page, categories } = await searchParams
	const currPage = Number(page) || 1
	const categoryIds = categories?.split(",") || []

	const { subscriptionPlans, error, count } = await fetchSubscriptonPlans({
		session,
		query,
		page: currPage,
	})

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!subscriptionPlans) return notFound()

	return (
		<main
			//todo maybe i want to use a simple grid system instead of `.page_layout` just cuz
			className={page_layout}
			style={
				{
					//todo why is this not working?
					"--sidebar-comp-max-width": "300px",
					"--sidebar-width-footprint": "10px",
					// maxWidth,
				} as CSSProperties
			}
		>
			<header className={layout_full} style={{ marginTop: "3rem" }}>
				<div className={layout_wide}>
					<h1 style={{ textAlign: "center" }}> Subscription Plans </h1>
					<hr className={layout_full} />
				</div>
			</header>

			<div className={[page_content, layout_site_to_wide].join(" ")}>
				{/* <Pagination route="/blog" page={currPage} count={count} /> */}

				{subscriptionPlans?.length > 0 ? (
					<ArticleList items={subscriptionPlans} type={'subscriptionPlan'} buttonText="view more"/>
				) : (
					<NoData name="Subscription Plans" />
				)}

				<Pagination route="/subscription-plans" page={currPage} count={count} />
			</div>
			<AsideBar aria_label="Subscription Plans List Sidebar">
				<Flex
					flexDirection={"column"}
					alignItems="flex-start"
					style={{ marginLeft: "var(--space-m)" }}
				>
					<Card>
						<h2 style={styleHeader}> Categories </h2>
						<CategoriesPool activeIds={categoryIds} />
					</Card>

					<Card>
						<h2 style={styleHeader}> Tags </h2>
						<TagsPool />
					</Card>
				</Flex>
			</AsideBar>
		</main>
	)
}

const styleHeader: CSSProperties = {
	fontSize: "1.3rem",
	marginBottom: 0,
}

const query = `
  id
  typeof
  image
  name
  slug
  excerpt
  status
  price
  billing_interval
  stockMax
  dateCreated
  dateModified
`
