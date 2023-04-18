import { ProductSingle } from '../../../components/ecommerce/ProductSingle';
import { useRouter } from 'next/router'

export default function ProductByID() {
  const router = useRouter()

  return (
    <ProductSingle id={router.query.id} />
  )
}
