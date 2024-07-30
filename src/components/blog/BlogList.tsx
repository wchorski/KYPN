import { BlogListItem } from './BlogListItem';
import styles from "@styles/blog/blog.module.scss";
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
    <ul 
      className={styles.blog + ' unstyled'} 
      // isAnimated={true} 
      // style={{gridTemplateColumns: 'repeat(auto-fill, minmax(calc(var(--w-sitemax)/2), 1fr))'}}
    >
      {posts.map((item: any, i:number) => (
        <BlogListItem {...item} key={i} />
      ))}
    </ul>
  )

}



