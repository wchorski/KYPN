//? thinking that server actions are not always what i want to use for forms?
import { useFormState } from 'react-dom'
import { useState } from 'react'

type FormState = { error?: string }

type SubmitAction<T> = (prevState: FormState, formData: T) => Promise<FormState>

export function useSubmit<T extends Record<string, any>>(onSubmit: SubmitAction<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [state, formAction] = useFormState<FormState, FormData>(async (prevState, formData) => {
    setIsSubmitting(true)
    const data = Object.fromEntries(formData.entries()) as T

    try {
      const result = await onSubmit(prevState, data)
      return result
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An unknown error occurred' }
    } finally {
      setIsSubmitting(false)
    }
  }, {})

  return { formAction, isSubmitting, error: state?.error }
}

//* example
// 'use client'

// import { useSubmit } from '@/hooks/useSubmit'

// interface FormData {
//   name: string
//   email: string
// }

// export default function MyForm() {
//   async function handleFormSubmit(prevState: { error?: string }, data: FormData): Promise<{ error?: string }> {
//     console.log('Submitting:', data)
//     await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

//     if (data.email.includes('error')) {
//       return { error: 'Invalid email address' }
//     }

//     return {}
//   }

//   const { formAction, isSubmitting, error } = useSubmit<FormData>(handleFormSubmit)

//   return (
//     <form action={formAction} sub>
//       <input name="name" type="text" placeholder="Name" required />
//       <input name="email" type="email" placeholder="Email" required />
//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? 'Submitting...' : 'Submit'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   )
// }
