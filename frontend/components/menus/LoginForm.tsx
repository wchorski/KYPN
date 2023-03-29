import useForm from "@/lib/useForm";
import { StyledForm } from "@/styles/Form.styled";
import { gql, useMutation } from "@apollo/client";
import  Router  from "next/router";
import { QUERY_USER_CURRENT } from "./User";
import  ErrorMessage  from "@/components/ErrorMessage";
import { useState } from "react";

export default function LoginForm() {


  const {inputs, handleChange, clearForm, resetForm} = useForm({
    email: '',
    password: '',
  })

  const [loginUser, {data, error, loading}] = useMutation(MUTATION_USER_LOGIN)

  async function handleSubmit(e: any) {
    e.preventDefault()
    // console.log(inputs)
    const res = await loginUser({
      variables: inputs,
      refetchQueries: [{query: QUERY_USER_CURRENT}]
    })
    console.log('res', res)

    // if(res.data.createProduct) clearForm(); 
    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })    
  }
  
  return (
    <StyledForm method="POST" onSubmit={handleSubmit}>

      <h2> Login </h2>

      <p>{data?.authenticateUserWithPassword?.message}</p>

      <fieldset>
        <label htmlFor="email">
            Email
            <input type="email" id="email" name="email" autoComplete="email"
              placeholder="email..."
              required
              defaultValue={inputs.name}
              onChange={handleChange}
            />
          </label>

        <label htmlFor="password">
            Email
            <input type="password" id="password" name="password" autoComplete="password"
              placeholder="password..."
              required
              defaultValue={inputs.name}
              onChange={handleChange}
            />
          </label>

          <button type="submit"> Login </button>
      </fieldset>

    </StyledForm>
  )
}

const MUTATION_USER_LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
          isAdmin
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`