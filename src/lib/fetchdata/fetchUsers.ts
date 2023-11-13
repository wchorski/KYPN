import { User } from '@ks/types';
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
    
    const  users  = await keystoneContext.withSession(session).query.User.findMany({
      query: q_users,
      // ...variables
    }) as User[]
    

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