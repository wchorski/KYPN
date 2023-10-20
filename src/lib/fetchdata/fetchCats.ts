import { gql } from 'graphql-request';
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Category } from "@ks/types";
import { client } from "@lib/request";
import { parse } from "graphql";

export default async function fetchCategories(){

  try {
    // const client = getClient()
    // const { data, error, loading } = await client.query({query})
    const variables = {}
    const { categories } = await client.request(query, variables)
    
    return { categories }
    
  } catch (error) {
    console.log('fetch Cats: ', error)
    return { error }
  }
}


const query: TypedDocumentNode<{ categories:Category[] }, never | Record<any, never>> = parse(gql`
  query getCats {
    categories {
      id
      name
    }
  }
`)