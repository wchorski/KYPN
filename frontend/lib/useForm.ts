import { useState, useEffect } from "react";

export default function useForm(initial: any = {}){
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join('') //? work around to avoid dependancy loop

  useEffect(() => {
    setInputs(initial)
  
    // return () => 
  }, [initialValues])
  

  function handleChange(e: any){

    let {value, name, type} = e.target

    if(type === 'number') value = Number(value)
    if(type === 'file')   value = e.target.files[0]

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  function resetForm(){
    setInputs(initial)
  }

  function clearForm(){
    const blankStateArr = Object.entries(inputs).map(([key, value]: any) => [key, ''])
    const blankStatObj = Object.fromEntries(blankStateArr)
    setInputs(blankStatObj)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}