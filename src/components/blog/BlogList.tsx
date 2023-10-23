import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../ecommerce/ProductThumbnail";
import { gql } from '@apollo/client'
import { QueryLoading } from '../menus/QueryLoading';
import { QueryError } from '../menus/QueryError';
import { BlogListItem } from './BlogListItem';
import styles from "@styles/blog/Blog.module.scss";
import { envs } from "@/envs";
import { List } from '@components/elements/List';
import { Post } from '@ks/types'
export const revalidate = 5;

const perPage = envs.PERPAGE


type ProdProps = {
  posts:Post[]|undefined
}

export async function BlogList({ posts }: ProdProps) {

  if(!posts) return null

  return (
    <List className={styles.blog} isAnimated={true}>
      {posts.map((item: any, i:number) => (
        <BlogListItem {...item} key={i} />
      ))}
    </List>
  )

}



