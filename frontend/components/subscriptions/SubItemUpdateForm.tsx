import styled from "styled-components"
import { FormInput } from "../elements/Forminput"
import useForm2 from "../../lib/useForm2"


const statusOptions = [
  {value: 'ACTIVE', label: 'Active'},
  {value: 'CANCELED', label: 'Cancele'},
  {value: 'SUSPENDED', label: 'Suspend'},
]

export function SubItemUpdateForm() {

  const inputs = [

    {
      id: 2,
      name: 'status',
      type: 'select',
      options: statusOptions,
      errorMessage: 'must select a service',
      label: 'Status',
      initial: '',
      // defaultValue: "",
      required: true,
    },
    
  ]

  const {values, setValues, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)

  return (
    <StyledSubItemForm>
      <legend> Update Subscription </legend>

      <fieldset>
        <FormInput />
      </fieldset>
    </StyledSubItemForm>
  )
}


const StyledSubItemForm = styled.form`
  
`