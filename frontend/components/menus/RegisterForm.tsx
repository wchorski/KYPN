import useForm from "../../lib/useForm";
import { StyledForm } from "../../styles/Form.styled";
import { gql, useMutation } from "@apollo/client";
import { QUERY_USER_CURRENT } from "./Session";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/router";
import { MUTATION_USER_LOGIN } from "./LoginForm";

export default function RegisterForm() {

  const router = useRouter()
  const [successMsg, setSuccessMsg] = useState<string>()
  const [isPassMatch, setIsPassMatch] = useState<boolean|undefined>(undefined)

  // const { session, setSession } = useGlobalContext()

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    nameLast: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [registerUser, { data, error, loading }] = useMutation(MUTATION_USER_REGSITER)
  const [loginUser, { data: dataLogin, error: errorLogin, loading: loadingLogin }] = useMutation(MUTATION_USER_LOGIN)

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (inputs.name === '', inputs.email === '', inputs.password === '') return console.warn('inputs are empty, ', inputs);

    if(inputs.password !== inputs.passwordConfirm) {
      console.warn('passwords do not match')
      setIsPassMatch(false)
      return 
    }
    

    const inputsFormatted = {
      name: inputs.name,
      nameLast: inputs.nameLast,
      email: inputs.email,
      password: inputs.password,
    }

    const resRegister = await registerUser({
      variables: { data: inputsFormatted },
      refetchQueries: [{ query: QUERY_USER_CURRENT }]
    }).catch(console.error)
    console.log('res', resRegister)

    if (resRegister?.data.createUser.__typename !== "User")
      console.log('REGy FAILED, ', resRegister?.data.authenticateUserWithPassword.message)
    // TODO why is it creating an empty session object
    // console.log(session);


    if (resRegister?.data.createUser.__typename === "User") {
      console.log('Regy SUCCESS, ', resRegister?.data.createUser)
      setSuccessMsg(`Success! New account registered: ${inputs.email}`)

      const resLogin = await loginUser({
        variables: {
          email: inputs.email,
          password: inputs.password
        },
        refetchQueries: [{ query: QUERY_USER_CURRENT }]
      }).catch(console.error)

      console.log(resLogin);

      router.push(`/account`)
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
            <span className="label"> First Name </span>
      
            <input type="text" id="name" name="name" autoComplete="name"
              placeholder="Jake..."
              required
              defaultValue={inputs.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="nameLast">
            <span className="label"> Last Name </span>

            <input type="text" id="nameLast" name="nameLast" 
              placeholder="Smith..."
              required
              defaultValue={inputs.nameLast}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email">
            <span className="label"> Email </span>

            <input type="email" id="email" name="email" 
              placeholder="email..."
              required
              defaultValue={inputs.email}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
            <span className="label"> Password </span>
            
            <input type="password" id="password" name="password" 
              placeholder="password..."
              required
              defaultValue={inputs.password}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="passwordConfirm">
            <span className="label"> Confirm Password </span>
            
            <input type="password" id="passwordConfirm" name="passwordConfirm" 
              placeholder="confirm password..."
              required
              defaultValue={inputs.passwordConfirm}
              onChange={handleChange}
            />
          </label>

          {isPassMatch === false && <p className="error"> password does not match </p>}

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

