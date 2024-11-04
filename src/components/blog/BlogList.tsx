import { BlogListItem } from "./BlogListItem"
// import styles from "@styles/blog/blog.module.scss";
import styles from "@styles/articles.module.scss"
import { Post, WidthLayoutSize, WidthLayoutSize2 } from "@ks/types"
import { ReactElement } from "react"
import sLayout, {grid, auto} from '@styles/layout.module.scss'
import { GridList } from "@components/layouts/GridList"
export const revalidate = 5

type ProdProps = {
	posts: Post[] | undefined
}

export function BlogList({ posts }: ProdProps): ReactElement<any, any> {

  const cls = ['unstyled', grid, auto].join(' ')

	if (!posts) return <> no posts found</>

	return (
		<GridList gap="1rem" paddingInline="1rem">
      {posts.map((item: any, i: number) => (
        <BlogListItem {...item} key={i}/>
			))}
    </GridList>
	)
	// return (
	// 	<ul
	// 		className={cls}
	// 		// className={styles.blog + ' unstyled'}
	// 	>
	// 		{posts.map((item: any, i: number) => (
  //       <li key={i}>
  //         <BlogListItem {...item} />
  //       </li>
	// 		))}
	// 	</ul>
	// )
}
