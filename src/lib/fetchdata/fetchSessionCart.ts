import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
import { getServerSession } from "next-auth"

export default async function fetchSessionCart() {

  const session = await getServerSession(nextAuthOptions)

  try {

    const user = await keystoneContext.withSession(session).query.User.findOne({
      query: query,
      where: {
        id: session?.itemId
      }
    }) as User

    const { cart } = user

    return { cart }
    
  } catch (error) {

    console.log('fetch session cart ERROR: ', error);
    return { error }
    
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