import { envs } from "../../envs"
import jwt from 'jsonwebtoken'

type User = {
  id:string,
  email:string
}

export async function tokenEmailVerify(user:User){
  const payload = {
    id: user.id,
    email: user.email
  }
  const secret = envs.NEXTAUTH_SECRET + user.id
  const token = await jwt.sign(payload, secret, {expiresIn: '25m'})

  return token
} 