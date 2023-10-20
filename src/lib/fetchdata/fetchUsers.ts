import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { client } from '@lib/request';
import { gql } from 'graphql-request';
import { parse } from "graphql";
import { Tag, User } from '@ks/types';
import { keystoneContext } from '@ks/context';

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

    const { users } = await client.request(query, variables)

    return { users }
    
  } catch (error) {

    console.log('fetch users: ', error)
    return {error}
  }

}


const query: TypedDocumentNode<{ users:User[] }, never | Record<any, unknown>> = parse(gql`
  query getUsers($take: Int, $skip: Int!, $orderBy: [UserOrderByInput!]!) {
    usersCount
    users(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      nameLast
      email
      role {
        name
      }
    }
  }
`)

// // ? direct query from keystoneContext
// export async function fetchUsers(page = 1, perPage = 25, session:any ){

//   const variables = {
//     skip: page * perPage - perPage,
//     take: perPage,
//     orderBy: [
//       {
//         name: 'asc'
//       }
//     ]
//   }

//   try {

//     const users = await keystoneContext.withSession(session).query.User.findMany({
//       variables,
//       query: query
//     }) as User[]

//     const count = await keystoneContext.withSession(session).query.User.count({
//     }) as number
//     console.log({count});
    

//     return { users }
    
//   } catch (error) {
//     console.log('fetch Users: ', error)
//     return { error }
//   }
// }


// // ? don't include top "query getUser" on top 
// // if query direct from keystoneContext

// const query = gql`
//   id
//   name
//   nameLast
//   email
//   role {
//     name
//   }
// `