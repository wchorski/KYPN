import Link from "next/link"
import styles from '@styles/categories.module.scss'
import fetchCategories from "@lib/fetchdata/fetchCats"
import { Category } from "@ks/types"

// any is a bug workaround
// @ts-ignore
export async function CategoriesPool():any {

  const {categories, error} = await fetchCategories()

  return (
    <ul className={styles.categories}>
      {categories?.map((c:Category, i:number) => (
        <li key={i}>
          <Link key={c.name} className='cat' href={`/categories/${c.name}`} >{c.name}</Link>
        </li>
      ))}
    </ul>
  )
}
