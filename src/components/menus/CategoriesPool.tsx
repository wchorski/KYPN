import type {  Category  } from "@ks/types"
import fetchCategories from "@lib/fetchdata/fetchCats"
import styles from '@styles/categories.module.css'
import Link from "next/link"

type Props = {
  activeIds?:string[]
}

export async function CategoriesPool({activeIds}:Props) {

  const {categories, error} = await fetchCategories()

  return (
    <ul className={styles.categories}>
      {categories?.map((c:Category, i:number) => (
        <li key={i}>
          <Link 
            key={c.name} 
            className={styles.link + ' ' + (activeIds?.includes(c.id) ? styles.active : '')} 
            href={`/categories?ids=${c.id}`} 
          >
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
