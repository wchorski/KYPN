import Link from "next/link"
import styles from '@styles/tags.module.scss'
import fetchTags from "@lib/fetchdata/fetchTags"
import { Tag } from "@ks/types"

// any is a bug workaround
// @ts-ignore
export async function TagsPool():any {

  const {tags} = await fetchTags()

  return (
    <ul className={styles.tags}>
      {tags?.map((t:Tag, i:number) => (
        <li key={i}>
          <Link key={t.name} className='tag' href={`/tags?ids=${t.id}`} >{t.name}</Link>
        </li>
      ))}
    </ul>
  )
}