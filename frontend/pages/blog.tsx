import { Pagination } from "../components/Pagination";
import { BlogList } from "../components/blog/BlogList";
import { useRouter } from 'next/router'

export default function BlogPage() {

  const { query } = useRouter()

  return (
    <>
      <h1>Store Page {query.page}</h1>

      <Pagination page={Number(query.page) || 1} />

      <BlogList page={Number(query.page) || 1} />

      <Pagination page={Number(query.page) || 1} />

    </>
  );
}
