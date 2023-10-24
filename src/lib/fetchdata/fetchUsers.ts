import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { client } from '@lib/request';
import { gql } from 'graphql-request';
import { parse } from "graphql";
import { Tag, User } from '@ks/types';
import { keystoneContext } from '@ks/context';
import { fetchProtectedRoute } from './fetchProtectedRoute';

// ? query from yoga client
export async function fetchUsers(page = 1, perPage = 25, session:any ){

  const variables = {
    skip: page * perPage - perPage,
    take: perPage,
    orderBy: [
      {
        name: 'asc'
      }
    ]
  }

  try {

    // const response = await fetchProtectedRoute(query, variables)
    // console.log({response});
    // const response = await client.request(query)
    // console.log({response});
    
    const  users  = await keystoneContext.withSession(session).query.User.findMany({
      query: q_users,
      // ...variables
    }) as User[]
    // console.log({users});
    

    return { users }
    
  } catch (error) {

    console.log('fetch users: ', error)
    return {error}
  }

}

const q_users = gql`
  id
  name
  email
  role {
    name
  }
`