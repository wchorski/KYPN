import { BlogList } from "@components/blog/BlogList"
import ErrorMessage from "@components/ErrorMessage"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/session"
import { layout_site, layout_wide } from "@styles/layout.module.css"

type Props = {
	header: string
	imageSrc?: string
	color: string
	colorOverlay: string
	categories: { id: string }[]
	authors: { id: string }[]
	style?: any
}

const query = `
  id
  title
  featured_image
  excerpt
`

export async function PostsList({
	header,
	color,
	colorOverlay,
	imageSrc,
	categories,
	authors,
}: Props) {
	const session = await getServerSession(nextAuthOptions)
	const categoryIds = categories.flatMap((cat) => cat.id)
	const authorIds = authors?.flatMap((user) => user.id)

	const { posts, error } = await fetchPosts({
		page: 1,
		categoryIds,
		authorIds,
		session,
		query,
	})

	if (error) return <ErrorMessage error={error} />
	if (posts?.length === 0) return <p>no posts found</p>

	return (
		<section
			className={layout_wide}
			style={{
				// display: "grid",
				// gridTemplateColumns: "subgrid",
				// gridColumn: "layout_site",
				backgroundColor: color,
				backgroundImage: `url(${imageSrc})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			// overlay={colorOverlay}
		>
			{header && (
				<h2 style={{ textAlign: "center", margin: "4rem", zIndex: "1" }}>
					{header}
				</h2>
			)}

			<BlogList posts={posts} style={{ gridColumn: "layout_wide" }} />
		</section>
	)
}
