import { keystoneContext } from "@ks/context";
import { NextResponse } from "next/server";

export async function fetchVerifyEmail(email:string, token:string){

  try {

    const data = await keystoneContext.graphql.run({
      query: `
        mutation VerifyEmail($token: String!, $email: String!) {
          verifyEmail(token: $token, email: $email) {
            dateModified
          }
        }
      `,
      variables: {
        token,
        email,
      }
    }) as any

    return { data }
    
  } catch (error) {
    // console.log('!!! fetchVerifyEmail ERROR: ', error);
    return {error}
  }
}