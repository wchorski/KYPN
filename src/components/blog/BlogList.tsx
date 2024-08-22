import { BlogListItem } from "./BlogListItem"
// import styles from "@styles/blog/blog.module.scss";
import styles from "@styles/articles.module.scss"
import { Post } from "@ks/types"
import { ReactElement } from "react"
export const revalidate = 5

type ProdProps = {
	posts: Post[] | undefined
}

export function BlogList({ posts }: ProdProps): ReactElement<any, any> {
	if (!posts) return <></>

	return (
		<ul
			className={styles.list + ' unstyled'}
			// className={styles.blog + ' unstyled'}
		>
			{posts.map((item: any, i: number) => (
				<BlogListItem {...item} key={i} />
			))}
		</ul>
	)
}
