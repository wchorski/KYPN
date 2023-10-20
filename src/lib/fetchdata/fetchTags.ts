// cred - https://github.com/jasonkuhrt/graphql-request/blob/HEAD/examples/typescript-typed-document-node.ts
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { client } from '@lib/request';
import { gql } from 'graphql-request';
import { parse } from "graphql";
import { Tag } from '@ks/types';


export default async function fetchTags(){

  try {

    const variables = {}

    const { tags } = await client.request(query, variables)
    // const data = await request(endpoint, query)
    

    // if(error) return error
    
    return { tags }
    
  } catch (error) {
    console.log('!!! !!! !!! fetch Tags: ', error)
    return { error }
    
  }
}



const query: TypedDocumentNode<{ tags:Tag[] }, never | Record<any, never>> = parse(gql`
  query getTags {
    tags {
      id
      name
    }
  }
`)