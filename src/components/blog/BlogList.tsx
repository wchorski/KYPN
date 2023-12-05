import { BlogListItem } from './BlogListItem';
import styles from "@styles/blog/Blog.module.scss";
import { List } from '@components/elements/List';
import { Post } from '@ks/types'
import { ReactElement } from 'react';
export const revalidate = 5;

type ProdProps = {
  posts:Post[]|undefined
}

// any type is a bug workaround
// @ts-ignore
export function BlogList({ posts }: ProdProps):ReactElement<any, any> {

  if(!posts) return <></>

  return (
    <List className={styles.blog} isAnimated={true}>
      {posts.map((item: any, i:number) => (
        <BlogListItem {...item} key={i} />
      ))}
    </List>
  )

}



