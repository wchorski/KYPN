'use client'

export const ProductDelete = ({id, children}: any) => {

  async function handleDelete() {

    if(! confirm('delete product?')) return 

    try {

      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        body: JSON.stringify({
          query, 
          variables: {where: {id: id}}
        })
      }) 

      const data = await res.json()
      console.log({data});
      
      
    } catch (err) {
      console.warn(err);
    }
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

const query = `
  mutation Mutation($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      id
      name
    }
  }
`