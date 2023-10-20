import Link from "next/link"
import styles from '@styles/tags.module.scss'
import fetchTags from "@lib/fetchdata/fetchTags"


export async function TagsPool() {

  const {tags} = await fetchTags()

  return (
    <ul className={styles.tags}>
      {tags?.map((t: any) => (
        <Link key={t.name} className='tag' href={`/tags/${t.name}`} >{t.name}</Link>
      ))}
    </ul>
  )
}