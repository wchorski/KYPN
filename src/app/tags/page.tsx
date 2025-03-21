import { BlogList } from "@components/blog/BlogList"
import { NoData } from "@components/elements/NoData"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { TagsPool } from "@components/menus/TagsPool"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import fetchTags from "@lib/fetchdata/fetchTags"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

type Props = {
	params: {
		page: string | string[] | undefined
	}
	searchParams: {
		[key: string]: string | string[] | undefined
		ids: string | undefined
		page: string | undefined
	}
}

export const metadata: Metadata = {
	title: `Tags | ` + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default async function TagsPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { page, ids } = await searchParams
	const currPage = Number(page) || 1
	const tagIds = ids?.split(",") || []
	const {
		posts,
		count,
		error: postsError,
	} = await fetchPosts({ page: currPage, tagIds, session })
	const { tags, error: tagsError } = await fetchTags(tagIds)

	if (postsError || tagsError) return <ErrorPage error={postsError || tagsError} ><p>data fetch error </p></ErrorPage>
	if (!posts || !tags) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1 style={{ marginBottom: 0 }}> Tags {tags ? ":" : null}</h1>
				<p style={{ marginTop: 0, color: "var(--c-primary)" }}>
					{tags?.map((t) => t.name).join(", ")}
				</p>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<h4>Posts: </h4>
				{posts && posts?.length > 0 ? <BlogList posts={posts} /> : <NoData />}
			</div>
			<hr />
			<footer className={layout_site}>
				<Flex>
					<Card>
						<h4> All Tags </h4>
						<TagsPool />
					</Card>
				</Flex>
			</footer>
		</main>
	)
}
