import { nextAuthOptions } from "@/session"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/blocks/Section"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import fetchTags from "@lib/fetchdata/fetchTags"
import { getServerSession } from "next-auth"
import { Post, Tag } from "@ks/types"
import { Card } from "@components/layouts/Card"
import { BlogList } from "@components/blog/BlogList"
import { TagsPool } from "@components/menus/TagsPool"
import ErrorMessage from "@components/ErrorMessage"
import { envs } from "@/envs"
import { Metadata } from "next"
import {
	layout_full,
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { NoData } from "@components/elements/NoData"
import Flex from "@components/layouts/Flex"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"

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
	description: envs.SITE_DESC,
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
