import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../ecommerce/ProductThumbnail";
import { gql } from '@apollo/client'
import { QueryLoading } from '../menus/QueryLoading';
import { QueryError } from '../menus/QueryError';
import { BlogListItem } from './BlogListItem';
import styles from "@/styles/blog/Blog.module.scss";
import { envvars } from '@lib/envvars';
import { List } from '@components/elements/List';
import { getClient } from '@lib/gqlClient';
import { Post } from '@lib/types';
export const revalidate = 5;

const perPage = envvars.PERPAGE


type ProdProps = {
  posts:Post[]
}

export async function BlogList({ posts }: ProdProps) {



  return (
    <List className={styles.blog} isAnimated={true}>
      {posts?.map((item: any) => (
        <BlogListItem {...item} />
      ))}
    </List>
  )

}



