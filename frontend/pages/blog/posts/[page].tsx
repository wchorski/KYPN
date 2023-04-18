import { Pagination } from "../../../components/Pagination";
import { BlogList } from "../../../components/blog/BlogList";
import { useRouter } from 'next/router'

export default function BlogPageNumber() {

  const { query } = useRouter()

  return (
    <>

      <Pagination route='/blog/posts' page={Number(query.page) || 1} />

      <BlogList page={Number(query.page) || 1} />

      <Pagination route='/blog/posts' page={Number(query.page) || 1} />

    </>
  );
}
