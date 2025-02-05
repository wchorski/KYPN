import { BlogListItem } from "./BlogListItem"
import { Post } from "@ks/types"
import { ReactElement } from "react"
import {grid, auto} from '@styles/layout.module.css'
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
