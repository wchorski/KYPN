import Link from "next/link"
import styles from '@/styles/tags.module.scss'
import fetchTags from "@lib/fetchdata/fetchTags"

type Props = {
  tags?: {
    id:string,
    name:string,
  }[]
}

export async function TagsPool({ tags }:Props) {

  const data = await fetchTags()

  return (
    <ul className={styles.tags}>
      {data?.tags.map((t: any) => (
        <Link key={t.name} className='tag' href={`/tags/${t.name}`} >{t.name}</Link>
      ))}
    </ul>
  )
}