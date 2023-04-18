import { useRouter } from 'next/router'
import BlogSingle from '../../components/blog/BlogSingle';

export default function BlogByID() {
  const router = useRouter()

  return (
    <BlogSingle slug={router.query.slug} />
  )
}
