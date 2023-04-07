import useForm from "../../lib/useForm";
import { StyledForm } from "../../styles/Form.styled";
import { gql, useMutation } from "@apollo/client";
import { QUERY_USER_CURRENT } from "./Session";
import ErrorMessage from "../../components/ErrorMessage";
import { useGlobalContext } from "../../lib/useSessionContext";

export default function RegisterForm() {

  const { session, setSession } = useGlobalContext()

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
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


    if (res?.data.createUser.__typename !== "User")
      console.log('Regy SUCCESS, ', res?.data.createUser)
    // @ts-ignore
    // setSession(prev => ({...prev, ...res.data.authenticateUserWithPassword.item}) )

    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })    
  }


  return (<>

    <StyledForm method="POST" onSubmit={handleSubmit}>

      <h2> Register </h2>

      <ErrorMessage error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" autoComplete="name"
            placeholder="your name..."
            required
            defaultValue={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" autoComplete="email"
            placeholder="email..."
            required
            defaultValue={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Email
          <input type="password" id="password" name="password" autoComplete="password"
            placeholder="password..."
            required
            defaultValue={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit"> Create Account </button>
      </fieldset>

    </StyledForm>
  </>)
}

const MUTATION_USER_REGSITER = gql`
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

