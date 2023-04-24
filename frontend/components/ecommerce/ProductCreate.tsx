// import { uploadPrep } from "../lib/uploadPrep"
import Router from "next/router";
import useForm from "../../lib/useForm"
import { StyledForm } from "../../styles/Form.styled"
import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import ErrorMessage from "../ErrorMessage"
import { GET_ALL_PRODUCTS } from "./ProductsList"


export const ProductCreate = () => {

  // const [mutate] = useMutation(FILE_UPLOAD_MUTATION, {
  //   refetchQueries: [{ query: filesQuery}]
  // })

  // function handleOnChange(e: any){
  //   console.log('upload change');
  //   console.log(e.target.files[0]);

  // } 

  const [isSuccess, setIsSuccess] = useState(false)

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: undefined,
    name: '',
    price: 0,
    description: ''
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log(inputs.image)
    // todo move this to backend
    const autoSlug = inputs.name.toLowerCase().replace(' ', '-').replace(/[&#\@\!, +()$~%'":*?<>{}]/g, '')
    // console.log({ autoSlug });

    let inputData = {
      name: inputs.name,
      slug: autoSlug,
      price: inputs.price,
      description: inputs.description,
    }

    if (inputs.image) {
      inputData = {
        ...inputData,
        // @ts-ignore
        photo: {
          create: {
            altText: `${inputs.name} featured image`,
            filename: `${inputs.name}.png`,
            image: { upload: inputs.image }
          },
        },
      }
    }

    const res = await gqlMutation({
      variables: {
        data: inputData
      },
      // ? after new product is added, fetch re runs in background so client doesn't half to hard refresh
      refetchQueries: [{ query: GET_ALL_PRODUCTS }]
    })

    console.log('res', res)
    if (res.data.createProduct) clearForm(); setIsSuccess(true)
    Router.push({
      pathname: `/shop/product/${res.data.createProduct.id}`,
    })
  }


  const [gqlMutation, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION)


  return (<>
    {/* <input type="file" multiple required onChange={e => handleOnChange(e)} /> */}

    <StyledForm onSubmit={(e: FormEvent) => handleSubmit(e)}>

      <ErrorMessage error={error} />
      {isSuccess && <p>product created</p>}

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

        <button type="submit" > Add </button>
        <br /> <br />

        <button type="button" onClick={e => clearForm()}> clear form </button>
        {/* <button type="button" onClick={e => resetForm()}> reset form </button> */}

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

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      name
      photo {
        altText
        id
        image {
          publicUrlTransformed
        }
      }
      id
      description
      price
      status
    }
  }
`

// ? localy stored  image
// export const CREATE_PRODUCT_MUTATION = gql`
//   mutation CreateProduct($data: ProductCreateInput!) {
//     createProduct(data: $data) {
//       name
//       photo {
//         altText
//         id
//         image {
//           extension
//           filesize
//           height
//           id
//           url
//           width
//         }
//       }
//       id
//       description
//       price
//       status
//     }
//   }
// `
