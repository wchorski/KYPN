import { Pagination } from "@components/Pagination"
import { BlogList } from "@components/blog/BlogList"
import ErrorMessage from "@components/ErrorMessage"
import { CategoriesPool } from "@components/menus/CategoriesPool"
import { TagsPool } from "@components/menus/TagsPool"
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates"
import { Category, Post, Tag } from "@ks/types"
import { envs } from "@/envs"
import { Metadata } from "next"
import { Card } from "@components/layouts/Card"
import { InfoCard } from "@components/blocks/InfoCard"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { Section } from "@components/blocks/Section"
import { NoData } from "@components/elements/NoData"
import { CSSProperties } from "react"
import { BlockLayout } from "@components/layouts/BlockLayout"
import styles from "@styles/page.module.scss"
import Flex from "@components/layouts/Flex"
import {
	page_layout,
	layout_full,
	layout_wide,
	page_sidebar,
	content,
	layout_site_to_wide,
} from "@styles/layout.module.scss"

type Props = {
	params: {
		page: string | string[] | undefined
	}
	searchParams: {
		[key: string]: string | string[] | undefined
		categories: string | undefined
		page: string | undefined
	}
}

export const metadata: Metadata = {
	title: `Blog | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

export default async function BlogFeedPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { page, categories } = searchParams
	const currPage = Number(page) || 1
	const categoryIds = categories?.split(",") || []

	const { posts, count, error } = await fetchPosts({
		page: currPage,
		categoryIds,
		session,
	})

	if (error) return <ErrorMessage error={error} />
	if (!posts) return <p>no posts found</p>

	return (
		<main className={page_layout}>
			<header className={layout_full}>
				<div className={layout_wide}>
					<h1 style={{textAlign: 'center'}}> Blog </h1>
				</div>
				<hr className={layout_full} />
			</header>

			{/* <div className={"content layout-full"}> */}
			<div className={[content, layout_site_to_wide].join(" ")}>
				{/* <Pagination route="/blog" page={currPage} count={count} /> */}

				<BlogList posts={posts} />
				{posts?.length === 0 && <NoData name="posts" />}

				<Pagination route="/blog" page={currPage} count={count} />
			</div>
			<aside className={page_sidebar}>
				<Flex flexDirection={"column"} alignContent="flex-start">
					<Card>
						<h2 style={styleHeader}> Categories </h2>
						<CategoriesPool activeIds={categoryIds} />
					</Card>

					<Card>
						<h2 style={styleHeader}> Tags </h2>
						<TagsPool />
					</Card>
				</Flex>
			</aside>
		</main>
	)
}

// function Header() {
// 	return (
// 		<>
// 			<h1> Blog </h1>
// 		</>
// 	)
// }

// type Main = {
// 	page: number
// 	posts: Post[] | undefined
// 	count: number | undefined
// }

// function Main({ posts, page, count }: Main) {
// 	if (!posts) <p> no posts found </p>

// 	return (
// 		<>
// 			<Pagination route="/blog" page={page || 1} count={count} />

// 			<BlogList posts={posts} />
// 			{posts?.length === 0 && <NoData name="posts" />}

// 			<Pagination route="/blog" page={page || 1} count={count} />
// 		</>
// 	)
// }

// function Aside(categoryIds?: string[]) {
// 	return (
// 		<>
// 			<Card>
// 				<h2 style={styleHeader}> Categories </h2>
// 				<CategoriesPool activeIds={categoryIds} />
// 			</Card>

// 			<Card>
// 				<h2 style={styleHeader}> Tags </h2>
// 				<TagsPool />
// 			</Card>
// 		</>
// 	)
// }
const styleHeader: CSSProperties = {
	fontSize: "1.3rem",
	marginBottom: 0,
}
