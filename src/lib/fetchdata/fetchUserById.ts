import { nextAuthOptions } from "@/session";
import { keystoneContext } from "@ks/context";
import { User } from "@ks/types";
import { getServerSession } from "next-auth";

export async function fetchUserById(id:string){

  try {
    const session = await getServerSession(nextAuthOptions)
    const user = await keystoneContext.withSession(session).query.User.findOne({
      query, 
      where: { id: id }
    }) as User

    return { user }
    
  } catch (error) {
    console.log('fetch user by ID: ', error);
    return {error}
  }
}

export const query = `

  id
  name
  nameLast
  email
  isActive
  image
  posts {
    id
    status
    slug
    title
    featured_image
    excerpt
    dateCreated
  }
  role {
    id
    name
    canManageProducts
    canViewUsers
    canManageUsers
    canManageRoles
    canManageCart
    canManageOrders
  }
  dateCreated
  dateModified

`