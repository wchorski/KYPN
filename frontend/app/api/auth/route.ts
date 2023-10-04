import { cookies } from 'next/headers'
 
export async function POST(request: Request) {


  const body = await request.json()

  console.log(body);
  
  
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  // console.log({token});
  

  const oneDay = 24 * 60 * 60 * 1000

  cookies().set({
    name: 'HEHEHEHE',
    value: 'HAHAHAHA',
    httpOnly: true,
    path: '/',
    expires: Date.now() - oneDay
  })
 
  return new Response('Hello, Next.js!', {
    status: 200,
    // headers: { 'Set-Cookie': `noken=${token?.value}` },
    headers: { 'Set-Cookie': `keystonejs-session=${body.token || 'NO_TOKEN_FOUND'}` },
  }) 
}

export async function GET(request: Request) {
  
  
  // const cookieStore = cookies()
  // const token = cookieStore.get('token')

  // console.log({token});
  
 
  return new Response('Hello, Next.js!', {
    status: 200,
    // headers: { 'Set-Cookie': `noken=${token?.value}` },
    headers: { 'Set-Cookie': `fakeazztoken=${'just_kidding'}` },
  }) 
}