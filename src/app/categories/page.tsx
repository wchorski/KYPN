import { envs } from "@/envs"
import { Metadata } from "next"
import fetchCategories from "@lib/fetchdata/fetchCats"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import { CategoriesPool } from "@components/menus/CategoriesPool"
import { BlogList } from "@components/blog/BlogList"
import { Card } from "@components/layouts/Card"
import {
	page_layout,
	page_content,
	layout_site,
} from "@styles/layout.module.scss"
import Flex from "@components/layouts/Flex"
import { NoData } from "@components/elements/NoData"
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
	title: `Categoires | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

export default async function CategoriesPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { page, ids } = searchParams
	const currPage = Number(page) || 1
	const categoryIds = ids?.split(",") || []
	const {
		posts,
		count,
		error: postsError,
	} = await fetchPosts({ page: currPage, categoryIds, session })
	const { categories, error: catsError } = await fetchCategories(categoryIds)

  if (postsError || catsError) return <ErrorPage error={postsError || catsError} ><p>data fetch error </p></ErrorPage>
	if (!posts || !categories) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	return (
		<>
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
			{/* <PageTHeaderMain 
      header={Header(categories)}
      main={Main({posts, categories})}
    /> */}
		</>
	)
}

// function Aside() {

//   return<>
//     <Card>
//       <h2> Categories </h2>
//       <CategoriesPool />

//     </Card>

//     <Card>
//       <h2> Tags </h2>
//       <TagsPool />
//     </Card>
//   </>
// }
