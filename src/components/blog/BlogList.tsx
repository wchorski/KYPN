import { GridList } from "@components/layouts/GridList"
import type { Post } from "@ks/types"
import type { CSSProperties, ReactElement } from "react"

import { BlogListItem } from "./BlogListItem"
export const revalidate = 5

type ProdProps = {
	posts: Post[] | undefined
	style?: CSSProperties
}

export function BlogList({ posts, style }: ProdProps): ReactElement<any, any> {
	if (!posts) return <>no posts found</>

	return (
		<GridList gap={"var(--space-m)"} style={style}>
			{posts.map((item: any, i: number) => (
				<BlogListItem {...item} key={i} />
			))}
		</GridList>
	)
}
