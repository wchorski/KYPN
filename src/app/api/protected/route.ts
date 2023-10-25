import { nextAuthOptions } from "@/session";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { keystoneContext } from "@ks/context";
import { Post, User } from "@ks/types";
import { fetchProtectedRoute } from "@lib/fetchdata/fetchProtectedRoute";
import { client } from "@lib/request";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const page = 1
const perPage = 5

export async function GET(req:NextRequest, res:NextResponse) {

  const session = getServerSession(nextAuthOptions)

  
  // TODO still don't know what i'm doing
  // const variables = {
    
  // }
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

    // const response = await client.request(query)
    // @ts-ignore
    const response = await fetchProtectedRoute(req, query, variables)
    console.log({response});
    return Response.json({ response })
    
  } catch (error) {

    return Response.json({ error })
  }
}

const query = `
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
`
