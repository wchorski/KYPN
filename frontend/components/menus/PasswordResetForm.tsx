import useForm from "@/lib/useForm";
import { StyledForm } from "@/styles/Form.styled";
import { gql, useMutation } from "@apollo/client";
import  Router  from "next/router";
import { QUERY_USER_CURRENT } from "./Session";
import  ErrorMessage  from "@/components/ErrorMessage";
import { useContext, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/lib/useSessionContext";
// import { SessionContext } from "@/pages/_app";
// import { SessionContext } from "@/lib/sessionContext";

export default function PasswordResetForm({token}:{token:string|string[]}) {

  const {session, setSession} = useGlobalContext()

  const {inputs, handleChange, clearForm, resetForm} = useForm({
    email: '',
    password: '',
  })

  const [mutate, {data, error, loading}] = useMutation(MUTATION_REDEEM_TOKEN)

  let validationError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined

  async function handleSubmit(e: any) {
    e.preventDefault()
    
    if(inputs.email === '') return console.warn('inputs are empty, ', inputs)
    console.log(inputs)
    
    const res = await mutate({
      variables: {
        email: inputs.email,
        token: token,
        password: inputs.password,
      },
      refetchQueries: [{query: QUERY_USER_CURRENT}]
    }).catch(console.error)
    console.log('res', res)

    // if(res?.data.redeemUserPasswordResetToken.code === "FAILURE")
    //   console.log('pass reset FAILED, ')
    //   validationError = res?.data.redeemUserPasswordResetToken.message

    // if(res?.data.sendUserPasswordResetLink)
    //   console.log('pass reset success, ')


    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })    
  }

  
  return (<>

    <StyledForm method="POST" onSubmit={handleSubmit}>

      <h2> Create New Password </h2>

      {data?.redeemUserPasswordResetToken.code === "FAILURE" && (
        <ErrorMessage error={error || validationError}/>
      )}

      <ErrorMessage error={error}/>

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

        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" autoComplete="password"
            placeholder="new password..."
            required
            defaultValue={inputs.password} 
            onChange={handleChange}
          />
        </label>

        <button type="submit"> Send Email </button>

      </fieldset>

    </StyledForm>
  </>)
}

const MUTATION_REDEEM_TOKEN = gql`
  mutation RedeemUserPasswordResetToken($email: String!, $token: String!, $password: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      code
      message
    }
  }
`