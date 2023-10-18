import React from 'react';
import { keystoneContext } from '../keystone/context';
import { DocumentRender } from './DocumentRender';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from '../../session'
import type { Post } from "../keystone/types";
import LoginForm from '../components/LoginForm';


export default async function HomePage(params:any) {
  console.log(params);
  
  // WARNING: this does nothing for now
  //   you will probably use getServerSession from 'next/auth'
  //   https://next-auth.js.org/configuration/nextjs#in-app-directory
  const session = await getServerSession(nextAuthOptions);
  console.log('==== app page SESSION ====');
  console.log({session});
  
  // const session = {};
  const users = await keystoneContext.withSession(session).query.User.findMany({
    query: `
      id 
      name 
      email
      dateCreated
    `,
  });
  console.log({users})

  const posts = await keystoneContext.withSession(session).query.Post.findMany({
    query: `
      id
      title
      content { document } 
      author {
        name
      }
    `,
  });
  

  return (
    <section>
      {session ? (<>
        <h3> Authenticated user</h3>
        <p> User: {session.user?.name} </p>
        <p> email: {session.user?.email} </p>
        <div>
          <p>Signed in as {session.user && session.user.name}</p>
          <a target='_blank' href={process.env.NEXT_PUBLIC_BACKEND_URL+`/`}> backend UI </a>
          <br />
          <a href="/api/auth/signout">Sign out</a>
        </div>
      </>
      ) : (<>
        <p> login user </p>
        <LoginForm />
      </>
      )}
      <h1>Keystone 🤝 Next.js</h1>
      <ul>
        <li>Below you can see the names of users in the database.</li>
      </ul>

      <div>
        <p>
          <strong>Users fetched from the server</strong>
        </p>
        <ol>
          {users.map(u => {
            return (
              <li key={u.id}>
                <span>{u.name} </span>
                <span>{u.email} </span>
                <span>{u.dateCreated} </span>
                {/* {u.about && (
                  <>
                    <hr />
                    <DocumentRender document={u.about?.document} />
                  </>
                )} */}
              </li>
            );
          })}
        </ol>
      </div>

      <h2>Posts</h2>

      {posts.length <= 0 && <p>no posssts </p>}
      <ul>
        {posts?.map((post:any) => (
          <li key={post.id}>
            {post?.title} | by: {post.author?.name}
            <DocumentRender document={post.content?.document} />
          </li>
        ))}
      </ul>
   
    </section>
  );
}

// export async function getServerSideProps(context:any) {
//   const session = await getServerSession(context.req, context.res, nextAuthOptions)

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       session,
//     },
//   }
// }