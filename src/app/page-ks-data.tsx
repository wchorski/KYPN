import { keystoneContext } from '../keystone/context';
import { BlockRender } from '../components/blocks/BlockRender';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from '../../session'
import type { Post, User } from "../keystone/types";


export default async function HomePage() {

  const session = await getServerSession(nextAuthOptions);
  console.log('==== app page SESSION ====');
  console.log({session});

  // const users = await keystoneContext.withSession(session).query.User.findMany({
  const users = await keystoneContext.withSession(session).query.User.findMany({
    query: `
      id
      name
      email
    `
  });
  const posts = await keystoneContext.withSession(session).query.Post.findMany({
    query: `
      id
      title
      author {
        name
        email
      }
    `
  });
  // console.log({users});

  // const users:User[] = []
  

  return (
    <section>

      {session ? (
        <div>
          <h3> session </h3>
          <p> {session?.user?.name} </p>
          <p> {session?.user?.email} </p>
        </div>

      ) : (
        <p> no session </p>
      )}

      <h2>Users</h2>
      {users.length <= 0 && (
        <p> no users </p>
      )}
      <ol>
        {users?.map((u:any) => (
            <li key={u.id}>
              <span>{u.name} </span>
              <span>{u.email} </span>
            </li>
          )
        )}
      </ol>

      <h2> Posts </h2>
      {posts.length <= 0 && (
        <p> no posts </p>
      )}
      <ol>
        {posts?.map((post:any) => (
            <li key={post.id}>
              <span>{post.title} </span> <br />
              <span>{post.author?.email} </span>
            </li>
          )
        )}
      </ol>
   
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