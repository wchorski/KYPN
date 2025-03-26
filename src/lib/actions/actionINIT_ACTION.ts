"use server"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function actionINIT_ACTION(
  prevState: INIT_ACTIONState,
  formData: FormData
): Promise<INIT_ACTIONState> {
  
  const values = Object.fromEntries(formData) as INIT_ACTIONValues
  // // @ts-ignore
  // delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
  const {  } = values
  console.log({values});
  

  const valueErrors = validateValues(values)
  if (valueErrors)
    return { valueErrors, values, error: "Check for errors in form fields" }

  //? use if form data needs to be modified before db query
  // const variables = values as INIT_ACTIONVariables
  try {

    const session = await getServerSession(nextAuthOptions)

    const data = (await keystoneContext.withSession(session).graphql.run({
      query: `
        
      `,
      variables: values,
      
    })) as { INIT_ACTION: { id: string } }
    console.log({data});

    return {
      //@ts-ignore
      // values: {
        
      // },
      id: data.INIT_ACTION.id,
      // url: envs.FRONTEND_URL + `/users/${data.INIT_ACTION.id}`,
      url: envs.FRONTEND_URL + `/INIT_ACTION`,
      success: `Success! INIT_ACTION`,
    }
  } catch (error) {
    console.log("!!! actionINIT_ACTION: ", error)
    return {
      error: "INIT_ACTION failed: " + error,
      success: undefined,
    }
  }
}

function validateValues({}: INIT_ACTIONValues) {
  // @ts-ignore
  let valueErrors: INIT_ACTIONState["valueErrors"] = {}
  if (!valueErrors) return undefined

  //TODO add custom validation rules

  if (Object.keys(valueErrors).length === 0) return undefined
  return valueErrors
}

export type INIT_ACTIONValues = {
  //TODO #1 add values here
}

export type INIT_ACTIONState = {
  url?: string
  id?: string
  values?: INIT_ACTIONValues
  valueErrors?: Record<keyof INIT_ACTIONValues, string> | undefined
  error?: string
  success?: string
  //? possibly return whole object of data like `product` or `user`
  // data:any
}
