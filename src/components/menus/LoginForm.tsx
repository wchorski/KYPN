'use client'
import styles from '@styles/menus/form.module.scss'
import { FaGithub, FaFacebookSquare, FaTwitter, FaGoogle, FaTwitterSquare } from "react-icons/fa";
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"
import { useRef } from 'react';
import { LoadingAnim } from '@components/elements/LoadingAnim';
import { signIn } from 'next-auth/react';

type Fields = {
  email: string,
  password:string,
}

type FormState = {
  message: string,
  status: 'success'|'error',
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type Props = {
  providers:any,
}

export function LoginForm({providers}:Props) {

  // const { session, setSession } = useGlobalContext()
  const defaultFormData = {
    message: '',
    errors: undefined,
    fieldValues: {
      email: '',
      password: '',
    }
  }
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(onSubmit, defaultFormData)


  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{
    const email = data.get('email') as string
    const password = data.get('password') as string

    const inputValues = {
      email,
      password,
    }

    try {

      console.log({
        email,
        password
      });

      const res = await signIn("credentials", { email, password, callbackUrl: '/account'})
      // console.log(res);
      
      
      return {
        ...formState,
        status: 'success',
        message: 'login successful',
      }
      
    } catch (error:any) {
      console.log('!!! Login Form ERROR: ', error.message);
      return {
        status: 'error',
        message: error?.message,
        // TODO validate each field
        errors: {
          email: '',
          password: '',
        },
        fieldValues: inputValues
      }
      
    }
  }
  
  const getIcon =(id:string) => {
    switch (id) {
      case 'github':
        return <FaGithub />

      case 'facebook':
        return <FaFacebookSquare />

      case 'twitter':
        return <FaTwitterSquare />

      case 'google':
        return <FaGoogle />
    
      default:
        return null
    }
  }


  return (<>

    <form action={formAction} className={styles.form}>

      <fieldset>

        <label htmlFor="email">
          Email
          <input 
            name={'email'}
            id={'email'}
            placeholder="sam@hotmail.com"
            type={'text'}
            defaultValue={formState.fieldValues.email}
            autoComplete={'email'}
          />
        </label>

        <label htmlFor="password">
          Password
          <input 
            name={'password'}
            id={'password'}
            placeholder="***"
            type={'password'}
            defaultValue={formState.fieldValues.password}
          />
        </label>

        <p className={formState.status}> 
          {formState.message} 
        </p>

        <SubmitButton />

      </fieldset>

      <fieldset>
        <legend> or with Social </legend>

        
        {Object.values(providers).filter((prov:any) => prov.id !== 'credentials').map((provider:any) => (

            <button 
              key={provider.name}
              type='button'
              className={'button large'}
              onClick={() => signIn(provider.id)}
            >
              Login with {provider.name} {getIcon(provider.id)}
            </button>
        ))}
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
      {pending ? <LoadingAnim /> : 'Login'}
    </button>
  )
}