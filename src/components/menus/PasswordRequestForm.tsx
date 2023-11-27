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

type Fields = {
  email: string,
}

type FormState = {
  message: string,
  status: 'success'|'error',
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

export function PasswordRequestForm() {

  // const { session, setSession } = useGlobalContext()
  const defaultFormData = {
    message: '',
    errors: undefined,
    fieldValues: {
      email: '',
    }
  }
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(onSubmit, defaultFormData)

  // async function handleSubmit(e: any) {
  //   e.preventDefault()

  //   if (inputs.email === '') return console.warn('inputs are empty, ', inputs)
  //   // console.log(inputs)

  //   const res = await passwordReset({
  //     variables: { email: inputs.email },
  //     refetchQueries: [{ query: QUERY_USER_CURRENT }]
  //   }).catch(console.error)
  //   console.log('res', res)

  //   if (!res?.data.sendUserPasswordResetLink)
  //     console.log('pass reset FAILED, ')

  //   if (res?.data.sendUserPasswordResetLink)
  //     console.log('pass reset success, ')


  //   // Router.push({
  //   //   pathname: `/shop/product/${res.data.createProduct.id}`,
  //   // })    
  // }

  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{
    const email = data.get('email') as string

    const inputValues = {
      email,
    }

    try {

      console.log(email);

      const res = await fetch(`/api/gql/noauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation Mutation($email: String!) {
              passwordRequestLink(email: $email) {
                dateModified
              }
            }
          `,
          variables: {
            email: email
          }
        }),
      })
      
      return {
        ...formState,
        status: 'success',
        message: 'Request sent. \n\n If an account with the submitted email is found, an email will be sent out with instructions to reset account password',
      }
      
    } catch (error:any) {
      console.log('!!! password Request Form ERROR: ', error.message);
      return {
        status: 'error',
        message: error?.message,
        // TODO validate each field
        errors: {
          email: 'double check spelling of this field',
        },
        fieldValues: inputValues
      }
      
    }
  }


  return (<>

    <form action={formAction} className={styles.form}>


        <fieldset>
          <legend> Password Reset Request </legend>

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

          <p className={(formState.status === 'success') ? 'success' : 'error'}> 
            {formState.message} 
          </p>

          <SubmitButton />

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
      {pending ? <LoadingAnim /> : 'Submit'}
    </button>
  )
}