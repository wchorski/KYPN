import useForm from "@/lib/useForm"
import { StyledForm } from "@/styles/Form.styled"
import { gql, useMutation, useQuery } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"

export const ProductUpdate = ({id}: any) => {

  const { loading: qLoading, error: qError, data: qData } = useQuery(
    SINGLE_PRODUCT_QUERY, {
    variables: { where: { id: id}}
  })

  const {inputs, handleChange, clearForm, resetForm} = useForm(qData?.product)

  const [updateProduct, {loading: uLoading, error: uError, data: uData}] = useMutation(MUTATE_PRODUCT_UPDATE)

  async function handleSubmit(e: any) {
    e.preventDefault()
    // console.log(inputs)
    const res = await updateProduct({
      variables: {
        where: {id: id}, 
        data: inputs
      }
    }).catch(console.error)

    console.log('res', res)

    // if(res.data.createProduct) clearForm();
    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })    
  }

  if (qLoading || uLoading) return <QueryLoading />

  return (<>
    <div>ProductUpdate {id} </div>
    <StyledForm onSubmit={e => handleSubmit(e)}>

      <ErrorMessage error={qError || uError}/>

      <fieldset disabled={uLoading} aria-busy={uLoading} >
        {/* <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" 
            onChange={handleChange}
          />
        </label> */}

        <label htmlFor="name">
          Name
          <input required type="text" id="name" name="name" placeholder="name..." 
            defaultValue={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input required type="number" id="price" name="price" placeholder="price..." 
            defaultValue={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea id="description" name="description" placeholder="description..." 
            defaultValue={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit" > Update Product </button> 
        <br /> <br />


        {/* <button type="button" onClick={e => clearForm()}> clear form </button> */}
        {/* <button type="button" onClick={e => resetForm()}> reset form </button> */}

      </fieldset>
    </StyledForm>
  </>)
}

const SINGLE_PRODUCT_QUERY = gql`
  query Query($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      name
      photo {
        altText
        id
        image {
          extension
          filesize
          id
          height
          url
          width
        }
      }
      price
      status
      description
    }
  }
`

const MUTATE_PRODUCT_UPDATE = gql`
  mutation Mutation($where: ProductWhereUniqueInput!, $data: ProductUpdateInput!) {
    updateProduct(where: $where, data: $data) {
      status
    }
  }
`