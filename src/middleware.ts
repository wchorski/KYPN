// cred - https://www.youtube.com/watch?v=xrvul-JrKFI
// other tips - https://borstch.com/blog/development/middleware-usage-in-nextjs-14
import type { Post } from '@ks/types';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {

  //todo set user chosen theme here? from cookies

  if (request.nextUrl.pathname.startsWith('/posts/id')) {

    try {
      const url = new URL(request.url)
      const postId = url.pathname.split('/posts/id/')[1]

      const res = await fetch( url.origin + `/api/gql/noauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query Post($where: PostWhereUniqueInput!) {
              post(where: $where) {
                slug
              }
            }
          `,
          variables: {
            where: {
              id: postId
            }
          }
        }),
      })
      const {post} = await res.json() as {post: Post}
      if(!post.slug) return console.log('no post:slug found');
      
      return NextResponse.redirect(new URL(`/posts/${post?.slug}`, request.url))
      
    } catch (err:any) {
      return new Response('Error processing request: ' + err.toString(), { status: 500 });
    }
  }
}
 
// See "Matching Paths" https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
  matcher:[ '/posts/id/:id*'],
}
