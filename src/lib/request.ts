'use client'
import { envs } from '@/envs';
// import { GraphQLClient } from 'graphql-request';

// ? can use on client side
// import { cookies } from 'next/headers'
// const cookieStore = cookies()
// const token = cookieStore.get('next-auth.session-token')
// console.log({token});


// export const client = new GraphQLClient(
//   envs.FRONTEND_URL + '/api/graphql',
//   // {
//   //   headers: {
//   //     authorization: `Bearer ${token}`,
//   //   },
//   // }

// );

export const client = {}