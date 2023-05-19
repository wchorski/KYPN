import { ProductSingle } from '../../../components/ecommerce/ProductSingle';
import { useRouter } from 'next/router'

export default function ProductByID() {
  const router = useRouter()
  console.log(router.query);

  return (
    <ProductSingle id={router.query.id} />
  )
}
