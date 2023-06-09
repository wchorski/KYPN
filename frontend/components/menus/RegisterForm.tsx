import useForm from "../../lib/useForm";
import { StyledForm } from "../../styles/Form.styled";
import { gql, useMutation } from "@apollo/client";
import { QUERY_USER_CURRENT } from "./Session";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterForm() {

  const router = useRouter()
  const [successMsg, setSuccessMsg] = useState<string>()
  // const { session, setSession } = useGlobalContext()

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    nameLast: '',
    email: '',
    password: '',
  })

  const [registerUser, { data, error, loading }] = useMutation(MUTATION_USER_REGSITER)

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (inputs.name === '', inputs.email === '', inputs.password === '') return console.warn('inputs are empty, ', inputs);

    const res = await registerUser({
      variables: { data: inputs },
      refetchQueries: [{ query: QUERY_USER_CURRENT }]
    }).catch(console.error)
    console.log('res', res)

    if (res?.data.createUser.__typename !== "User")
      console.log('REGy FAILED, ', res?.data.authenticateUserWithPassword.message)
    // TODO why is it creating an empty session object
    // console.log(session);


    if (res?.data.createUser.__typename === "User") {
      console.log('Regy SUCCESS, ', res?.data.createUser)
      router.push(`/users/${res.data.createUser.id}`)
      setSuccessMsg(`Success! New account registered: ${inputs.email}`)
    }
    // @ts-ignore
    // setSession(prev => ({...prev, ...res.data.authenticateUserWithPassword.item}) )

    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })    
  }


  return (<>

    <StyledForm method="POST" onSubmit={handleSubmit}>

      <h2> Register </h2>

      <p>{successMsg}</p>

      <ErrorMessage error={error} />
      {!successMsg && (

        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="name">
            First Name
            <input type="text" id="name" name="name" autoComplete="name"
              placeholder="Jake..."
              required
              defaultValue={inputs.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="nameLast">
            Last Name
            <input type="text" id="nameLast" name="nameLast" 
              placeholder="Smith..."
              required
              defaultValue={inputs.nameLast}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email">
            Email
            <input type="email" id="email" name="email" 
              placeholder="email..."
              required
              defaultValue={inputs.email}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
            Password
            <input type="password" id="password" name="password" 
              placeholder="password..."
              required
              defaultValue={inputs.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit"> Create Account </button>
        </fieldset>
      )}

    </StyledForm>
  </>)
}

export const MUTATION_USER_REGSITER = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      email
      password {
        isSet
      }
      name
      isAdmin
      id
      createdAt
    }
  }
`

