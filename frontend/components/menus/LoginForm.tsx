// 'use client'
import useForm from "../../lib/useForm";
import PasswordReset from '@components/menus/PasswordResetRequest';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import  {QUERY_USER_CURRENT}  from '@lib/queries/session';
import Link from "next/link";
import styles from '@styles/menus/form.module.scss'
// import { useState } from "react";
import useForm2 from "@lib/useForm2";
import { InputObj } from "@lib/types";
import { FormInput } from "@components/elements/Forminput";
import { cookies } from "next/headers";
// import { PopupAnim } from "./PopupAnim";


export default function LoginForm() {

  // const { session, setSession } = useGlobalContext()
  const router = useRouter()
  const nextCookies = cookies()

  // const [isReset, setIsReset] = useState(false)
  // const [isPopup, setIsPopup] = useState(false)

  const inputs:InputObj[] = [
    {
      name: 'email',
      label: 'email',
      type: 'text',
      placeholder: 'Link@hyrule.net',
      errorMessage: 'email error',
      required: true,
      initial: ''
    },
    {
      name: 'password',
      label: 'password',
      type: 'password',
      placeholder: '***',
      errorMessage: 'password error',
      required: true,
      initial: ''
    },
  ]

  const {values, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)

  const [loginUser, { data, error, loading }] = useMutation(MUTATION_USER_LOGIN)

  async function handleSubmit(e: any) {
    e.preventDefault()
    // console.log(inputs)
    const res = await loginUser({
      variables: values,
      // refetchQueries: [{ query: QUERY_USER_CURRENT }]
    })
    // console.log('res', res)

    if (res.data.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure")
      console.log('LOGIN FAILED, ', res.data.authenticateUserWithPassword.message)
    // TODO why is it creating an empty session object
    // console.log(session);


    if (res.data.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordSuccess"){
      console.log('LOGIN SUCCESS, ', res.data.authenticateUserWithPassword)
      // console.log('token, ', res.data.authenticateUserWithPassword.sessionToken)
      const token = res.data.authenticateUserWithPassword.sessionToken
      // const resAPI = await fetch(`/api/auth`, {
      //   method: 'POST',
      //   body: JSON.stringify({token})
      // })

      // const dataAPI = await resAPI.json()
      // console.log(dataAPI)

      let cookie = `keystonejs-session=${token}`
      cookie += `path=/`
      cookie += `max-age=${ 60 * 60 * 24 * 1}`

      document.cookie = cookie
      
      router.refresh()
      // router.push(`/home`)
    }
    // @ts-ignore
    // TODO setting local storage
    // setSession(prev => ({...prev, ...res.data.authenticateUserWithPassword.item}) )
    // localStorage.setItem('session', JSON.stringify(res.data.authenticateUserWithPassword))
    // useLocalStorage('session', JSON.stringify(res.data.authenticateUserWithPassword))
  }


  return (<>

    {nextCookies.get(`keystonejs-session`) 
      ? <p>cookie found: {'blabla'}</p>
      : <p> no cookie</p>}

    <form method="POST" onSubmit={handleSubmit} className={styles.form} >

      <h2> Login </h2>

      <p className="error">{data?.authenticateUserWithPassword?.message}</p>

      <fieldset>
        <FormInput 
          {...handleFindProps('email')}
          value={values['email']}
          onChange={handleChange}
        />

        <FormInput 
          {...handleFindProps('password')}
          value={values['password']}
          onChange={handleChange}
        />


        <button type="submit"> Login </button>
        <button type="button" className="forgot-password"> Forgot your password? </button>
      </fieldset>

    </form>
    
    {/* <PopupAnim isPopup={isReset} setIsPopup={setIsReset}>
      <PasswordReset />
    </PopupAnim> */}
  </>)
}

export const MUTATION_USER_LOGIN = gql`
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