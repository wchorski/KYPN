import { nextAuthOptions } from "@/session";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { keystoneContext } from "@ks/context";
import { User } from "@ks/types";
import { fetchProtectedRoute } from "@lib/fetchdata/fetchProtectedRoute";
import { parse } from "graphql";
import { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const page = 1
const perPage = 5

export async function GET(req:NextRequest, res:NextResponse) {

  const session = getServerSession(nextAuthOptions)

  
  // TODO still don't know what i'm doing
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
    // @ts-ignore
    const data = await fetchProtectedRoute(req, query, variables)
    console.log({data});
    return Response.json({ data })
    
  } catch (error) {

    return Response.json({ error })
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