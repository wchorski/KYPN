import Link from "next/link"
import styles from '@/styles/categories.module.scss'

type Props = {
  categories: {
    id:string,
    name:string,
  }[]
}

export function CategoriesPool({ categories }:Props) {
  return (
    <ul className={styles.categories}>
      {categories.map((c: any) => (
        <Link key={c.name} className='cat' href={`/categories/${c.name}`} >{c.name}</Link>
      ))}
    </ul>
  )
}
