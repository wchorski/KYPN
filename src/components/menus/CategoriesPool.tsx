import Link from "next/link"
import styles from '@styles/categories.module.scss'
import fetchCategories from "@lib/fetchdata/fetchCats"

export async function CategoriesPool() {

  const data = await fetchCategories()

  return (
    <ul className={styles.categories}>
      {data?.categories.map((c: any) => (
        <Link key={c.name} className='cat' href={`/categories/${c.name}`} >{c.name}</Link>
      ))}
    </ul>
  )
}
