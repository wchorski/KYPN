import useForm from "../../lib/useForm";
import { StyledForm } from "../../styles/Form.styled";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
import { QUERY_USER_CURRENT } from "./Session";
import ErrorMessage from "../../components/ErrorMessage";
import { useContext, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../lib/useGlobalContext";
// import { SessionContext } from "../pages/_app";
// import { SessionContext } from "../lib/sessionContext";

export default function PasswordResetRequest() {

  const { session, setSession } = useGlobalContext()

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
  })

  const [passwordReset, { data, error, loading }] = useMutation(MUTATION_PASSWORD_RESET)

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (inputs.email === '') return console.warn('inputs are empty, ', inputs)
    // console.log(inputs)

    const res = await passwordReset({
      variables: { email: inputs.email },
      refetchQueries: [{ query: QUERY_USER_CURRENT }]
    }).catch(console.error)
    console.log('res', res)

    if (!res?.data.sendUserPasswordResetLink)
      console.log('pass reset FAILED, ')

    if (res?.data.sendUserPasswordResetLink)
      console.log('pass reset success, ')


    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })    
  }


  return (<>

    <StyledForm method="POST" onSubmit={handleSubmit}>

      <h2> Password Reset </h2>

      {data?.sendUserPasswordResetLink && <p>A reset link is on it's way to your email</p>}

      <ErrorMessage error={error} />

      <fieldset disabled={loading} aria-busy={loading}>

        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" autoComplete="email"
            placeholder="email..."
            required
            defaultValue={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit"> Send Email </button>

      </fieldset>

    </StyledForm>
  </>)
}

export const MUTATION_PASSWORD_RESET = gql`
  mutation SendUserPasswordResetLink($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`