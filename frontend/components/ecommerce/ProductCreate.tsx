// import { uploadPrep } from "@/lib/uploadPrep"
import useForm from "@/lib/useForm"
import { StyledForm } from "@/styles/Form.styled"
import { gql, useMutation } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"


export const ProductCreate = () => {

  // const [mutate] = useMutation(FILE_UPLOAD_MUTATION, {
  //   refetchQueries: [{ query: filesQuery}]
  // })

  // function handleOnChange(e: any){
  //   console.log('upload change');
  //   console.log(e.target.files[0]);
    
  // } 

  

  const {inputs, handleChange, clearForm, resetForm} = useForm({
    image: null,
    name: 'will',
    price: 123,
    description: "mydesc"
  })
  
  const [createProduct, {loading, error, data}] = useMutation(
    CREATE_PRODUCT_MUTATION, 
    {variables: {data: {
      photo: {
        create: {
          altText: `${inputs.name} featured image`,
          image: {upload: inputs.image} // TODO HOW DO I DO THIS ********************
        },
      },
      name: inputs.name,
      price: inputs.price,
      description: inputs.description,
    }}}
  )

  async function handleSubmit(e: any) {
    e.preventDefault()
    console.log(inputs)
    const res = await createProduct()
    console.log(res)
    
  }


  return (<>
    {/* <input type="file" multiple required onChange={e => handleOnChange(e)} /> */}

    <StyledForm onSubmit={e => handleSubmit(e)}>

      <ErrorMessage error={error}/>

      <fieldset disabled={loading} aria-busy={loading} >
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" 
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
          Name
          <input required type="text" id="name" name="name" placeholder="name..." 
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input required type="number" id="price" name="price" placeholder="price..." 
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea id="description" name="description" placeholder="description..." 
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit" > + Add </button> 
        <br /> <br />

        <button type="button" onClick={e => clearForm()}> clear form </button>
        <button type="button" onClick={e => resetForm()}> reset form </button>

      </fieldset>
    </StyledForm>
  </>)
}

// const FILE_UPLOAD_MUTATION = gql`
//   mutation ($file: Upload!) {
//     uploadFile(file: $file) {
//       success
//     }
//   }
// `;

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      name
      photo {
        altText
        id
        image {
          extension
          filesize
          height
          id
          url
          width
        }
      }
      id
      description
      price
      status
    }
  }
`
