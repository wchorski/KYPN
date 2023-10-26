import { User } from "@ks/types"

export default async function fetchSessionCart() {
  try {

    const res = await fetch(`/api/sessioncart`, {
      method: 'POST',
      body: JSON.stringify({})
    }) 
    const { user } = await res.json() as { user:User }

    return { user }
    
  } catch (error) {
    return { error }
  }
}
