import { gql, useMutation } from "@apollo/client";
import { StyledForm } from "../../styles/Form.styled";
import { useRouter } from "next-router-mock";
import { Dispatch, SetStateAction, useState } from "react";
import useForm from "../../lib/useForm";
import { QUERY_USER_SINGLE } from "./UserSingle";
import { INPUT_TYPES, InputObj, User } from "../../lib/types";
import useForm2 from "../../lib/useForm2";
import ErrorMessage from "../ErrorMessage";
import { FormInput } from "../elements/Forminput";

type Props = {
  user:User,
  setUser: any,
}

export function UserUpdateForm({user, setUser}:Props) {

  const router = useRouter()
  const [successMsg, setSuccessMsg] = useState<string>()
  // const { session, setSession } = useGlobalContext()

  const inputs:InputObj[] = [
    {
      name: 'name',
      type: INPUT_TYPES.TEXT,
      placeholder: '', 
      label: 'First Name',
      errorMessage: 'first name error',
      required: true,
      initial: user?.name || '',
    },
    {
      name: 'nameLast',
      type: INPUT_TYPES.TEXT,
      placeholder: '', 
      label: 'Last Name',
      errorMessage: 'last name error',
      required: true,
      initial: user?.nameLast || '',
    },
    {
      name: 'email',
      type: INPUT_TYPES.EMAIL,
      placeholder: '', 
      label: 'Email',
      errorMessage: 'name error',
      required: true,
      initial: user?.email || '',
    },
  ]
  const {values, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)

  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER)

  async function handleSubmit(e:any) {
    e.preventDefault()
    // console.log({values});
    

    try {
      
      // const formattedValues = {
      //   ...values,
      //   // ...{ }
      // }
      
      // if id exists, then update existing event
      if(user){
        const res = await updateUser({
          variables: {
            where: {
              id: user.id
            },
            data: values,
            // refetchQueries: [{ query: QUERY_USER_SINGLE, variables: { where: { id: user?.id }}, },]
          },
        })
        console.log('update user success, ', {res});
        setUser(undefined)
        // router.push(`/events/e/${res.data.updateEvent.id}`)

      } 
      // else {
      //   const res = await createEvent({
      //     variables: {
      //       data: formattedValues
      //     },
      //     // refetchQueries: [{ query: QUERY_EVENTS_ALL }, { query: QUERY_USER_SINGLE, variables: { where: { id: user?.id }}, },]
      //   })
      //   console.log('create event success, ', {res});
      //   router.push(`/events/e/${res.data.createEvent.id}`)
      // }
        // setIsShown(false)
  
      } catch (err) {
        console.warn('create event error: ', err);
      }
    }
  
  return (
    <StyledForm method="PUT" onSubmit={handleSubmit}>

      <h2> Update User </h2>
      <p>{successMsg}</p>
      <ErrorMessage error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
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


        <button type="submit"> Update User </button>
      </fieldset>

    </StyledForm>
  )
}


const UPDATE_USER = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      name
      nameLast
      email
    }
  }
`