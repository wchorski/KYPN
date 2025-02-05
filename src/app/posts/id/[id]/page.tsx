import { envs } from "@/envs"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { Post } from "@ks/types"
import { layout_content, page_layout } from "@styles/layout.module.css"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

// TODO metadata

export default async function Page({ params, searchParams }: Props) {
	const { id } = await params

	const { post, error } = await fetchPostId(id)
	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!post) return notFound()

	return (
		<>
			<main className={[page_layout, layout_content].join(" ")}>
				<header></header>
				<p>
					<Link href={`/posts/${post.slug}`}> view post </Link>
				</p>
			</main>
		</>
	)
}

async function fetchPostId(id: string) {
	try {
		const res = await fetch(envs.FRONTEND_URL + `/api/gql/noauth`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          query Post($where: PostWhereUniqueInput!) {
            post(where: $where) {
              slug
            }
          }
        `,
				variables: {
					where: {
						id,
					},
				},
			}),
		})
		const { post } = (await res.json()) as { post: Post }
		return { post }
	} catch (error: any) {
		console.log("!!! blog/id/page Error: ", +error)

		return { error }
	}
}
