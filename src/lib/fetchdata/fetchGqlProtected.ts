import { nextAuthOptions } from "@/session";
import { keystoneContext } from "@ks/context";
import { getServerSession } from "next-auth";

export async function fetchGqlProtected(query:string, variables:any) {
  
  try {
    const session = await getServerSession(nextAuthOptions)

    // todo figure out raw graphql queries through context
    const data = await keystoneContext.withSession(session).graphql.run({
      query: query,
      variables: variables
    }) as object
    console.log('GQL PROTECTED ROUTE');
    // console.log({data})

    return { data }
    
  } catch (error) {

    console.log('graphql context protected ERROR: ', error);
    return { error }
    
  }
}