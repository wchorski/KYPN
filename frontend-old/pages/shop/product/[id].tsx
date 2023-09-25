import { ProductSingle } from '../../../components/ecommerce/ProductSingle';
import { useRouter } from 'next/navigation'

export default function ProductByID() {
  const router = useRouter()

  return (
    <div className="container">
      <ProductSingle id={router.query.id} />
    </div>
  )
}
