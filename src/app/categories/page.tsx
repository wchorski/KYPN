import { BlogList } from "@components/blog/BlogList"
import { NoData } from "@components/elements/NoData"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { CategoriesPool } from "@components/menus/CategoriesPool"
import fetchCategories from "@lib/fetchdata/fetchCats"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
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
	title: `Categoires | ` + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default async function CategoriesPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { page, ids } = await searchParams
	const currPage = Number(page) || 1
	const categoryIds = ids?.split(",") || []
  
	const {
		posts,
		count,
		error: postsError,
	} = await fetchPosts({
		query: QUERY_POSTS_ARTICLES,
		page: currPage,
		categoryIds,
		session,
	})
	const { categories, error: catsError } = await fetchCategories(categoryIds)

	if (postsError || catsError)
		return (
			<ErrorPage error={postsError || catsError}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!posts || !categories)
		return (
			<NoDataFoundPage>
				<p>No data found</p>
			</NoDataFoundPage>
		)

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1 style={{ marginBottom: 0 }}>
					{" "}
					Categories {categories ? ":" : null}
				</h1>
				<p style={{ marginTop: 0, color: "var(--c-primary)" }}>
					{categories?.map((c) => c.name).join(", ")}
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
						<h4> All Categories</h4>
						<CategoriesPool />
					</Card>
				</Flex>
			</footer>
		</main>
	)
}
const QUERY_POSTS_ARTICLES = `
  id
  title
  featured_image
  featured_video
  author {
    id
    name
    nameLast
  }
  dateModified
  excerpt
  pinned
  slug
  status
  template
  tags {
    id
    name
  }
  categories {
    id
    name
  }
`
