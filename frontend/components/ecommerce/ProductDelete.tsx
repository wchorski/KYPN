import { gql, useMutation } from "@apollo/client";

export const ProductDelete = ({id, children}: any) => {

  const [deleteProduct, {loading}] = useMutation(MUTATION_PRODUCT_DELETE)

  async function handleDelete() {

    if(! confirm('delete product?')) return 

    try {
      const res = await deleteProduct({
        variables: {where: {id: id}},
        update: handleCache,
      })
      // console.log({res});
      
      
    } catch (err) {
      console.warn(err);
    }
  }

  function handleCache(cache:any, payload:any) {
    // console.log({payload})
    cache.evict(cache.identify(payload.data.deleteProduct))
    
  }

  return (
    <button 
      type="button"
      onClick={() => handleDelete()}
    >
      {children}
    </button>
  )
}

const MUTATION_PRODUCT_DELETE = gql`
  mutation Mutation($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      id
      name
    }
  }
`