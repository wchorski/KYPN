import { gql } from "@apollo/client";
import { getClient } from "@lib/gqlClient";

export default async function fetchTags(){

  try {
    const client = getClient()
    const { data, error, loading } = await client.query({query})

    if(error) return error
    
    return data
    
  } catch (error) {
    console.log('fetch CatsNTags: ', error)
  }
}

const query = gql`
  query Query {

    tags {
      id
      name
    }
  }
`