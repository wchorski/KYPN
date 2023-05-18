import { FormEvent, useState } from "react"
import useForm from "../../lib/useForm"
import { StyledForm } from "../../styles/Form.styled"
import ErrorMessage from "../ErrorMessage"

type Form = {
  title:string,
  color:string,
  submitText:string,
}

export function ContactForm({title, color, submitText}:Form) {

  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState({message: ''})
  const [loading, setLoading] = useState(false)

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    email: '',
    phone: '',
    date: '',
    description: ''
  })

  function handleSubmit(e: FormEvent){
    e.preventDefault()
    console.table({inputs})
  }

  return (
    <StyledForm onSubmit={(e: FormEvent) => handleSubmit(e)}>

      <ErrorMessage error={error} />

      {successMsg && <p>{successMsg}</p>}

      <h2>{title}</h2>

      <fieldset disabled={loading} aria-busy={loading} >

        <label htmlFor="name">
          Name
          <input required type="text" id="name" name="name" placeholder="name..."
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

        <label htmlFor="phone">
          Phone Number
          <input required type="phone" id="phone" name="phone" placeholder="123 234-3456..."
            value={inputs.phone}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="date">
          Day of Event
          <input required type="date" id="date" name="date" 
            value={inputs.date}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea id="description" name="description" placeholder="explain your event in more detail..."
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit" > {submitText} </button>
      </fieldset>
    </StyledForm>
  )
}
