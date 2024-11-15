import { envs } from "@/envs"
import { Post } from "@ks/types"
import { layout_content, page_layout } from "@styles/layout.module.scss"
import Link from "next/link"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function Page({ params, searchParams }: Props) {
	const { id } = params

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


	if (!post)
		return (
			<main className={[page_layout, layout_content].join(" ")}>
        <header></header>
				<p>Post Not Found </p>
			</main>
		)

	return (
		<>
			<main className={[page_layout, layout_content].join(" ")}>
        <header></header>
				<p>
					<Link href={`/blog/${post.slug}`}> view post </Link>
				</p>
			</main>
		</>
	)
}
