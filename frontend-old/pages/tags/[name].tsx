import { TagsSingle } from "@/components/tags/TagsSingle"
import { useRouter } from "next/router"

export default function CategoryByName() {

  const { query } = useRouter()
  
  return (
    <div className="container">
      <TagsSingle name={String(query.name)} />
    </div>
  )
}
