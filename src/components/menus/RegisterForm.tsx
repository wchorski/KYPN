'use client'
import useForm from "../../lib/useForm";
import styles from '@styles/menus/form.module.scss'
import { gql, useMutation } from "@apollo/client";
import { QUERY_USER_CURRENT } from "./Session";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MUTATION_USER_LOGIN } from "./LoginForm";
import { InputObj } from "@lib/types";
import useForm2 from "@lib/useForm2";
import { FormInput } from "@components/elements/Forminput";
import { wait } from "@lib/waitTimeout";

const inputs:InputObj[] = [
  {
    name: 'name',
    label: 'name',
    type: 'text',
    placeholder: 'Bobby...',
    errorMessage: 'name error',
    required: true,
    initial: ''
  },
  {
    name: 'nameLast',
    label: 'nameLast',
    type: 'text',
    placeholder: 'Smith...',
    errorMessage: 'nameLast error',
    required: true,
    initial: ''
  },
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
  {
    name: 'passwordConfirm',
    label: 'passwordConfirm',
    type: 'password',
    placeholder: '***',
    errorMessage: 'passwordConfirm error',
    required: true,
    initial: ''
  },
]

export function RegisterForm() {

  const router = useRouter()
  const [successMsg, setSuccessMsg] = useState<string|undefined>()
  const [isPassMatch, setIsPassMatch] = useState<boolean|undefined>(undefined)

  // const { session, setSession } = useGlobalContext()

  const {values, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)
  // const { inputs, handleChange, clearForm, resetForm } = useForm({
  //   name: '',
  //   nameLast: '',
  //   email: '',
  //   password: '',
  //   passwordConfirm: '',
  // })

  const [registerUser, { data, error, loading }] = useMutation(MUTATION_USER_REGSITER)
  const [loginUser, { data: dataLogin, error: errorLogin, loading: loadingLogin }] = useMutation(MUTATION_USER_LOGIN)

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (values.name === '', values.email === '', values.password === '') return console.warn('inputs are empty, ', inputs);

    if(values.password !== values.passwordConfirm) {
      console.warn('passwords do not match')
      setIsPassMatch(false)
      return 
    }
    
    const inputsFormatted = {
      name: values.name,
      nameLast: values.nameLast,
      email: values.email,
      password: values.password,
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
      setSuccessMsg(`Success! New account registered: ${values.email}`)

      const resLogin = await loginUser({
        variables: {
          email: values.email,
          password: values.password
        },
        refetchQueries: [{ query: QUERY_USER_CURRENT }]
      }).catch(console.error)

      console.log(resLogin);

      await wait(1000)
      
      router.push(`/account`)
    }

  }


  return (<>

    <form method="POST" onSubmit={handleSubmit} className={styles.form}>

      <h2> Register </h2>

      <p className="success">{successMsg}</p>

      <ErrorMessage error={error} />

      <fieldset disabled={loading || Boolean(successMsg)} aria-busy={loading}>

        <FormInput 
          {...handleFindProps('name')}
          value={values['name']}
          onChange={handleChange}
        />

        <FormInput 
          {...handleFindProps('nameLast')}
          value={values['nameLast']}
          onChange={handleChange}
        />

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

        <FormInput 
          {...handleFindProps('passwordConfirm')}
          value={values['passwordConfirm']}
          onChange={handleChange}
        />

        {isPassMatch && <p className="error"> password does not match </p>}

        <button 
          type="submit"
          disabled={loading || Boolean(successMsg)}
        > 
          Create Account 
        </button>
      </fieldset>

    </form>
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
    }
  }
`

