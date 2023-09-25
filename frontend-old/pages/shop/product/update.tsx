import { ProductUpdate } from '../../../components/ecommerce/ProductUpdate'
import { QueryLoading } from '../../../components/menus/QueryLoading'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'


const ProductUpdatePage = () => {

  const { query } = useRouter()

  return (
    <div>
      <ProductUpdate id={query.id} />
    </div>
  )
}

export default ProductUpdatePage