import { CategoriesSingle } from "@/components/categories/CategoriesSingle"
import { useRouter } from "next/router"

export default function CategoryByName() {

  const { query } = useRouter()
  
  return (
    <div className="container">
      <CategoriesSingle name={String(query.name)} />
    </div>
  )
}
