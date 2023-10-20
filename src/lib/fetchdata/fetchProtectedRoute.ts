// cred - https://github.com/egilkenson/keystone-next-auth
// cred - https://github.com/egilkenson/keystone-next-auth/blob/main/frontend/src/lib/fetchProtectedRoute.js


import { envs } from '@/envs';
import { GraphQLClient } from 'graphql-request'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server';


// /**
//  * Pass an API request to the GraphQL server with sessionToken from cookies
//  *
//  * @param {Object } req - the request object, containing sessionToken cookie
//  * @param {string} query - the GraphQL query or mutation string
//  * @param {Object} variables - any variables to be passed with the GraphQL request
//  *
//  * @returns {Promise<any>} - response from the GraphQL query or mutation
//  *
//  * @link https://github.com/prisma-labs/graphql-request#passing-headers-in-each-request
//  */
export async function fetchProtectedRoute(req:NextRequest, query:string, variables = {}): Promise<unknown> {


  const cookieStore = cookies()
  const token = cookieStore.get('next-auth.session-token')
  console.log({token});

  const client = new GraphQLClient(envs.FRONTEND_URL + '/api/graphql')
  const requestHeaders = {
    ...req.headers,
    Authorization: `Bearer ${token?.value}`
  }
  return client.request(query, variables, requestHeaders)
}