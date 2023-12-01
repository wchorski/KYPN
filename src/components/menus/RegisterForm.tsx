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
import { passwordRegExp } from '@lib/regexPatterns';
import { Card } from '@components/layouts/Card';

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

      if(!passwordRegExp.test(password)) throw new Error('password does not meet requirements')
      // return {
      //   ...formState,
      //   status: 'error',
      //   message: 'password does not meet requirements',
      //   errors: {
      //     password: 'try a different password',
      //     passwordConfirm: '',
      //   },
      // }

      if(password !== passwordConfirm) throw new Error('passwords do not match')
      // return {
      //   ...formState,
      //   status: 'error',
      //   message: 'Passwords do not Match',
      //   // errors: {
      //   //   password: '',
      //   //   passwordConfirm: '',
      //   // },
      // }

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
          password: passwordRegExp.test(password) ? '' : 'try a different password',
          passwordConfirm: (password !== passwordConfirm) ? 'check this password' : '',
        },
        fieldValues: inputValues
      }
      
    }
  }


  return (<>

    <form action={formAction} className={styles.form}>


        <fieldset>
          <legend> Register New Account </legend>

          <label htmlFor="name" className='required'>
            <span title='is required'>Name</span>
            <input 
              name={'name'}
              id={'name'}
              placeholder=""
              type={'text'}
              required={true}
              pattern='.{3,}'
              defaultValue={formState.fieldValues.name}
              autoComplete={'name'}
            />
            <span className='error'>{formState.errors?.name}</span>
          </label>

          <label htmlFor="email" className='required'>
            <span title='is required'>Email</span>
            <input 
              name={'email'}
              id={'email'}
              placeholder=""
              type={'email'}
              required={true}
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              defaultValue={formState.fieldValues.email}
              autoComplete={'email'}
            />
            <span className='error'>{formState.errors?.email}</span>
          </label>

          <label htmlFor="password" className='required'>
            <span title='is required'> New Password </span>
            <input 
              name={'password'}
              id={'password'}
              placeholder=""
              type={'password'}
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:<>?~-]).{8,32}'
              required={true}
              defaultValue={formState.fieldValues.password}
            />
            <span className='error'>{formState.errors?.password}</span>
          </label>

          <Card bgColor='#252525'>
            <h5> requirements </h5>
            <ul className='unstyled'>
              <li> 8 - 32 characters </li>
              <li> one Capital letter </li>
              <li> one special character !@#$&* </li>
              <li> one number </li>
              <li> three lower case letters </li>
            </ul>
            
          </Card>
          <label htmlFor="passwordConfirm" className='required'>
            <span title='is required'> Confirm Password  </span>
            <input 
              name={'passwordConfirm'}
              id={'passwordConfirm'}
              placeholder=""
              type={'password'}
              required={true}
              defaultValue={formState.fieldValues.passwordConfirm}
            />
            <span className='error'>{formState.errors?.passwordConfirm}</span>
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