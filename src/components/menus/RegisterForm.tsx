'use client'
import styles from '@styles/menus/form.module.scss'

import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"
import { useRef } from 'react';
import { LoadingAnim } from '@components/elements/LoadingAnim';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { envs } from '@/envs';

type Fields = {
  name:string,
  email:string,
  password: string,
  passwordConfirm: string,
}

type FormState = {
  message: string,
  status: 'success'|'error',
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type Props = {
  id?:string,
}

export function RegsiterForm({id}:Props) {


  const defaultFormData = {
    message: '',
    errors: undefined,
    fieldValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  }
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(onSubmit, defaultFormData)


  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{

    const name = data.get('name') as string
    const email = data.get('email') as string
    const password = data.get('password') as string
    const passwordConfirm = data.get('passwordConfirm') as string

    const inputValues = {
      name,
      email,
      password,
      passwordConfirm,
    }

    try {

      if(password !== passwordConfirm) return {
        ...formState,
        status: 'error',
        message: 'Passwords do not Match',
        errors: {
          password: '',
          passwordConfirm: '',
        },
      }

      const res = await fetch(`/api/gql/noauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateUser($data: UserCreateInput!) {
              createUser(data: $data) {
                dateCreated
              }
            }
          `,
          variables: {
            data: {
              name,
              email,
              authId: email,
              password
            }
          }
        }),
      })

      const data = await res.json()
      console.log(data);
      
      const { error } = data

      if(error) return {
        ...formState,
        status: 'error',
        message: error.message,
      }

      const signRes = await signIn("credentials", { email, password, callbackUrl: envs.FRONTEND_URL + '/account' })
      
      return {
        ...formState,
        status: 'success',
        message: 'New account successfully created',
      }
      
    } catch (error:any) {
      console.log('!!! Regsiter Form ERROR: ', error.message);
      return {
        status: 'error',
        message: error?.message,
        // TODO validate each field
        errors: {
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
        },
        fieldValues: inputValues
      }
      
    }
  }


  return (<>

    <form action={formAction} className={styles.form}>


        <fieldset>
          <legend> Register New Account </legend>

          <label htmlFor="name">
            Name
            <input 
              name={'name'}
              id={'name'}
              placeholder=""
              type={'text'}
              required={true}
              defaultValue={formState.fieldValues.name}
              autoComplete={'name'}
            />
          </label>

          <label htmlFor="email">
            Email
            <input 
              name={'email'}
              id={'email'}
              placeholder=""
              type={'email'}
              required={true}
              defaultValue={formState.fieldValues.email}
              autoComplete={'email'}
            />
          </label>

          <label htmlFor="password">
            New Password
            <input 
              name={'password'}
              id={'password'}
              placeholder=""
              type={'password'}
              required={true}
              defaultValue={formState.fieldValues.password}
            />
          </label>
          <label htmlFor="passwordConfirm">
            Confirm Password 
            <input 
              name={'passwordConfirm'}
              id={'passwordConfirm'}
              placeholder=""
              type={'password'}
              required={true}
              defaultValue={formState.fieldValues.passwordConfirm}
            />
          </label>

          <p className={formState.status}> 
            {formState.message}
          </p>

          {formState.status !== 'success' ? (
            <SubmitButton />
          ) : (
            <Link href={`/account`}> view account </Link>
          )}

        </fieldset>
    </form>
  </>)
}

function SubmitButton(){

  const { pending, } = useFormStatus()

  return(
    <button
      disabled={pending}
      type={'submit'}
    >
      {pending ? <LoadingAnim /> : 'Create'}
    </button>
  )
}

// export const MUTATION_PASSWORD_RESET = `
//   mutation SendUserPasswordResetLink($email: String!) {
//     sendUserPasswordResetLink(email: $email)
//   }
// `