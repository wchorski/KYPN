import { Pagination } from "../components/Pagination";
import { BlogList } from "../components/blog/BlogList";
import { useRouter } from 'next/router'
import styles from "@/styles/blog/Blog.module.scss";
import { useQuery, gql } from "@apollo/client";
import ErrorMessage from "@/components/ErrorMessage";
import { QueryLoading } from "@/components/menus/QueryLoading";
import { CategoriesPool } from "@/components/menus/CategoriesPool";
import { TagsPool } from "@/components/menus/TagsPool";

export default function BlogPage() {

  const { query } = useRouter()

  const { error, loading, data } = useQuery(QUERY_CATEGORIES_AND_TAGS)

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const {categories, tags} = data

  return (
    <>
      <div className="container with-sidebar">
        <Pagination route='/blog/posts' page={Number(query.page) || 1} />

        <div className={styles.layout}>
          
          <BlogList page={Number(query.page) || 1} />


          <aside>
            <div className="widget">
              <h2> Categories </h2>
              <CategoriesPool categories={categories}/>

              <h2> Tags </h2>
              <TagsPool tags={tags}/>
            </div>
          </aside>
        </div>

        <Pagination route='/blog/posts' page={Number(query.page) || 1} />
      </div>

    </>
  );
}

const QUERY_CATEGORIES_AND_TAGS = gql`
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