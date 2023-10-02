import Link from "next/link"
import styles from '@/styles/categories.module.scss'
import fetchCatsNTags from "@lib/fetchdata/fetchCats"
import fetchCategories from "@lib/fetchdata/fetchCats"

type Props = {
  categories?: {
    id:string,
    name:string,
  }[]
}


export async function CategoriesPool({ categories }:Props) {

  const data = await fetchCategories()

  return (
    <ul className={styles.categories}>
      {data?.categories.map((c: any) => (
        <Link key={c.name} className='cat' href={`/categories/${c.name}`} >{c.name}</Link>
      ))}
    </ul>
  )
}
