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
    const response = await client.request(query)
    console.log({response});
    
    const  users  = await keystoneContext.withSession(session).query.User.findMany({
      query: q_users,
      // ...variables
    })
    // console.log({users});
    

    return { users }
    
  } catch (error) {

    console.log('fetch users: ', error)
    return {error}
  }

}

const q_users = `
  id
  name
  email
  role {
    name
  }
`


const query: TypedDocumentNode<{ users:User[] }, never | Record<any, unknown>> = parse(`
  query getUsers {
    usersCount
    users {
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
// const query: TypedDocumentNode<{ users:User[] }, never | Record<any, unknown>> = parse(`
//   query getUsers($take: Int, $skip: Int!, $orderBy: [UserOrderByInput!]!) {
//     usersCount
//     users(take: $take, skip: $skip, orderBy: $orderBy) {
//       id
//       name
//       nameLast
//       email
//       role {
//         name
//       }
//     }
//   }
// `)

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