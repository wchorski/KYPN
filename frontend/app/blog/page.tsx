import { Pagination } from "@components/Pagination";
import { BlogList } from "@components/blog/BlogList";
import { useRouter } from 'next/navigation'
import styles from "@/styles/blog/Blog.module.scss";
import { gql } from "@apollo/client";
import { getClient } from '@lib/gqlClient';
import ErrorMessage from "@/components/ErrorMessage";
import { QueryLoading } from "@/components/menus/QueryLoading";
import { CategoriesPool } from "@/components/menus/CategoriesPool";
import { TagsPool } from "@/components/menus/TagsPool";

type Props = {
  params:{
    page:string | string[] | undefined,
  },
}



export default async function BlogFeedPage({ params }:Props) {

  const client = getClient()
  const { data, error, loading } = await client.query({query})


  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const {categories, tags} = data

  return (
    <>
      <div className="container with-sidebar">
        <Pagination route='/blog/posts' page={Number(params.page) || 1} />

        <div className={styles.layout}>
          
          {/* <BlogList page={Number(params.page) || 1} /> */}


          <aside>
            <div className="widget">
              <h2> Categories </h2>
              <CategoriesPool categories={categories}/>

              <h2> Tags </h2>
              <TagsPool tags={tags}/>
            </div>
          </aside>
        </div>

        <Pagination route='/blog/posts' page={Number(params.page) || 1} />
      </div>

    </>
  );
}

export const query = gql`
  query Query {
    categories {
      id
      name
    }
    tags {
      id
      name
    }
  }
`