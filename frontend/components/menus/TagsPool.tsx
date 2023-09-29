import Link from "next/link"
import styles from '@/styles/tags.module.scss'

type Props = {
  tags: {
    id:string,
    name:string,
  }[]
}

export function TagsPool({ tags }:Props) {
  return (
    <ul className={styles.tags}>
      {tags.map((t: any) => (
        <Link key={t.name} className='tag' href={`/tags/${t.name}`} >{t.name}</Link>
      ))}
    </ul>
  )
}