import { Category } from "@ks/types"
import styles from "@styles/categories.module.css"
import Link from "next/link"

type Props = {
  categories:Category[]
}

export function CategoriesList ({ categories }:Props) {
  return (
    <ul className={styles.categories}>
      {categories?.map((c:Category, i:number) => (
        <li key={i}>
          <Link 
            key={c.name} 
            className={styles.link} 
            href={`/categories?ids=${c.id}`} 
          >
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}