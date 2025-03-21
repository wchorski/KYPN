"use client"
import { cgql, useFetchGraphQL } from "@hooks/useFetchGraphql"
import Link from "next/link"

type Data = {
	posts: {
		id: string
		title: string
		excerpt: string
	}[]
}

type Variables = {
	orderBy: [
		{
			title: "asc"
		}
	]
}

export function PostsListClient() {
	const { data, loading, error } = useFetchGraphQL(
		cgql`
			query Posts($orderBy: [PostOrderByInput!]!) {
				posts(orderBy: $orderBy) {
					id
					title
					excerpt
				}
			}
		`,
		{
			orderBy: [
				{
					title: "asc",
				},
			],
		}
	)

	if (loading) return <Loading />
	if (error) return <p>error</p>
	if (!data?.posts || data.posts.length === 0) return <NoData />

	// return <pre>{JSON.stringify(data, null, 2)}</pre>
	return <Posts posts={data.posts} />
}

const Loading = () => <p className={'anim_border_spin'} >Loading...</p>
const NoData = () => <p>No posts found</p>

function Posts({ posts }: Data) {
	return (
		<ol>
			{posts.map((p) => (
				<li key={p.id} className="card">
					<h5 title={p.id}>{p.title}</h5>
					<p>{p.excerpt}</p>
					<Link href={`/posts/${p.id}`}>read more...</Link>
				</li>
			))}
		</ol>
	)
}
