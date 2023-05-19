import { FormEvent, useState } from "react"
import useForm from "../../lib/useForm"
import { StyledForm } from "../../styles/Form.styled"
import ErrorMessage from "../ErrorMessage"
import { gql, useMutation } from "@apollo/client"
import { QueryLoading } from "../menus/QueryLoading"
import nProgress from "nprogress"

type Form = {
  title:string,
  color:string,
  submitText:string,
  isName?: boolean,
  isPhone?: boolean,
  isDate?: boolean,
  isNotes?: boolean,
}

export function ContactForm({title, color, submitText, isName=true, isPhone=true, isDate=true, isNotes=true}:Form) {

  const [successMsg, setSuccessMsg] = useState<string|undefined>(undefined)
  // const [error, setError] = useState({message: ''})
  // const [loading, setLoading] = useState(false)

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: ''
  })

  const [mutate, { error, loading, data }] = useMutation(MUTATE_CONTACT)

  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    // console.table({inputs})
    
    try {
      nProgress.start()
      const theDate = inputs.date ? new Date(inputs.date) : new Date()
      inputs.date = theDate.toISOString()
      console.log({inputs});
      

      const res = await mutate({
        variables: inputs,
      })
      console.log({res});
      nProgress.done()
      setSuccessMsg('Thanks for your inquiry. We will reach out shortly')

    } catch (err) {
      console.warn('contact form error: ', err);
    }
  }

  if(error) return <ErrorMessage error={error} />
  if(loading) return <QueryLoading />

  return (
    <StyledForm onSubmit={(e: FormEvent) => handleSubmit(e)}>


      <h2>{title}</h2>

      {successMsg && <p>{successMsg}</p>}

      <fieldset disabled={loading || successMsg ? true : false} aria-busy={loading} >


        <label htmlFor="name" className={isName ? '' : 'hidden'}>
          Name
          <input type="text" id="name" name="name" placeholder="name..."
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">
          Email
          <input required type="email" id="email" name="email" placeholder="johnwick@emal.com..."
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="phone" className={isPhone ? '' : 'hidden'}>
          Phone Number
          <input type="phone" id="phone" name="phone" placeholder="123 234-3456..."
            value={inputs.phone}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="date" className={isDate ? '' : 'hidden'}>
          Day of Event
          <input type="date" id="date" name="date" 
            value={inputs.date}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="notes" className={isNotes ? '' : 'hidden'}>
          Description
          <textarea id="notes" name="notes" placeholder="explain your event in more detail..."
            value={inputs.notes}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={loading || successMsg ? true : false}> {submitText} </button>
      </fieldset>
    </StyledForm>
  )
}


const MUTATE_CONTACT = gql`
mutation Contact($name: String!, $email: String!, $phone: String!, $date: String!, $notes: String!) {
  contact(name: $name, email: $email, phone: $phone, date: $date, notes: $notes) {
    dateCreated
  }
}
`