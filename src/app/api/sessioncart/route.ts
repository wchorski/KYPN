import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
import { getServerSession } from "next-auth"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  const request = await req.json()
  // console.log({request});
  
  // const { variables } = request
  const session = await getServerSession(nextAuthOptions)
  console.log('*** session ID: ', session?.itemId);
  

  try {

    const user = await keystoneContext.withSession(session).query.User.findOne({
      query: query,
      where: {
        id: session?.itemId
      }
    }) as User
    // todo figure out raw graphql queries through context
    // const response = await keystoneContext.withSession(session).graphql.run({
    //   query: query,
    //   variables: {
    //     where: {
    //       id: session.itemId
    //     }
    //   }
    // })
  
    console.log('graphql context protected SUCCESS: ')
    // console.log({user});
    
    // return Response.json(response)
    return NextResponse.json({
      user,
    }, {
      status: 222
    })
    
  } catch (error) {

    console.log('graphql context protected ERROR: ', error);
    return NextResponse.json({
      error,
    }, {
      status: 555
    })
    
  }
}

const query = `

  cart {
    id
    quantity
    product {
      id
      price
      name
      image
    }
  }
`
// const query = `
//   query getUserCart($where: UserWhereUniqueInput!) {
//     user(where: $where) {
//       cart {
//         id
//         quantity
//         product {
//           id
//           price
//           name
//           image
//         }
//       }
//     }
//   }
// `