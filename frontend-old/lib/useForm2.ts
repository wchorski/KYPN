import { useState, useEffect } from "react";
import { InputObj } from "./types";

// type Props = {
//   initial: any,
//   inputArray:InputObj[],
// }

export default function useForm2(inputArray:InputObj[]) {

  const initialValues = inputArray.reduce((obj:any, item:InputObj) => {
    obj[item.name] = item.initial
    return obj
  }, {})

  const [values, setValues] = useState(initialValues)

  function handleChange(e: any) {
    // console.log(e.target);
    
    let { value, name, type } = e.target
    // console.log(name + ' : ' + value + ' : ' + type);

    if (type === 'number') value = Number(value)
    if (type === 'file') value = e.target.files[0]

    setValues({
      ...values,
      [name]: value
    })
  }

  function handleFindProps(name:string){
    const foundObj = inputArray.find(obj => {
      return obj.name === name
    })

    return foundObj
  }

  function resetForm() {
    setValues(initialValues)
  }

  function clearForm() {
    const blankStateArr = Object.entries(values).map(([key, value]: any) => [key, ''])
    const blankStatObj = Object.fromEntries(blankStateArr)
    setValues(blankStatObj)
  }

  return {
    values,
    setValues,
    handleChange,
    handleFindProps,
    resetForm,
    clearForm,
  }
}