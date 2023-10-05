
import { cookies } from 'next/headers'
 
export async function POST(request: Request) {

  console.log('auth API POST');
  

  const body = await request.json()

  console.log({body});
  
  
  // const cookieStore = cookies()
  // const token = cookieStore.get('token')

  // console.log({token});
  

  const oneDay = 24 * 60 * 60 * 1000

  cookies().set({
    name: 'keystonejs-session',
    value: body.token,
    httpOnly: true,
    path: '/',
    maxAge: Date.now() - oneDay,
    expires: Date.now() - oneDay,
  })
 
  return  Response.json({message: 'auth api POST success'})
  // return new Response('Hello, Next.js!', {
  //   status: 200,
  //   // headers: { 'Set-Cookie': `noken=${token?.value}` },
  //   headers: { 'Set-Cookie': `keystonejs-session=${body.token || 'NO_TOKEN_FOUND'}` },
  // }) 

}

export async function GET(request: Request) {
  
  
  // const cookieStore = cookies()
  // const token = cookieStore.get('token')

  console.log('auth api GET');
  const cookieStore = cookies()
  const authCookie = cookieStore.get('keystonejs-session')
  console.log({authCookie});
  
 return Response.json({message: 'auth api get'})
  // return new Response(`token: ${JSON.stringify(token, null, 2)}`, {
  //   status: 200,
  //   headers: { 'Set-Cookie': `keystonejs-session=${token?.value}` },
  // })
}