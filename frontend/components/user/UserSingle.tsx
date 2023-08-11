import { gql, useQuery } from "@apollo/client"
import { User } from "../../lib/types"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { AccountDetails } from "../menus/AccountDetails"
import EventList from "../events/EventList"
import { UserEvents } from "./UserEvents"
import { useUser } from "../menus/Session"
import { ImageDynamic } from "../elements/ImageDynamic"
import { PostsList } from "../blocks/PostsList"
import { BlogListItem } from "../blog/BlogListItem"
import styled from "styled-components"


export function UserSingle({id}:{id:string}) {  

  const session:User =  useUser()

  const { loading, error, data } = useQuery(
    QUERY_USER_SINGLE, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  
  const {name, nameLast, email, image, isAdmin, tickets, dateCreated, dateModified, posts}:User = data?.user
  

  return (
    <>
      <StyledUserSingle>
        <header>
          <figure>
            <ImageDynamic photoIn={image}/>
          </figure>
          
          <div className="user-cont">
            <h1>{name} {nameLast}</h1>
            <ul className="meta">
              <li>{email}</li>
            </ul>
          </div>
        </header>

        <section className="posts">
          <h2>Blog Posts</h2>
          <ul className="posts">
            {posts && posts.map(post => (
              <li key={post.id}>
                <BlogListItem {...post} buttonText="read more"/>
              </li>
            ))}
          </ul>
        </section>
      </StyledUserSingle>

      {/* //todo show this for admin */}
      {/* <section className="pad">
        <AccountDetails {...data.user}/>
      </section> */}

      <hr />
      
      {session && session.role?.canManageTickets && (
        <section className="admin-panel marg">
          <h2>Admin Events Quick Edit</h2>
          <UserEvents user={data.user}/>
        </section>
      )}
    </>
  )
}

const StyledUserSingle = styled.article`


  header{
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    figure{
      margin: 0;
      border-radius: 50%;
      overflow: hidden;
    }

    .user-cont{
      margin-top: auto;
      padding: 0 1rem;
      h1{
        margin-bottom: 0;
      }
      ul.meta{
        margin-top: 0;
        padding: 0;
        list-style: none;
      }
    }
  }

  section{
    padding: 0 1rem;
  }

  section.posts{
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: var(--c-primary);
    background: var(--cg-primary)
  }

  ul.posts{
    padding: 0;
    list-style: none; 
    display: flex;
    gap: 1rem;

    li{
      max-width: 20rem;
    }
  }
`


export const QUERY_USER_SINGLE = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      nameLast
      email
      isAdmin
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
      tickets {
        id
        status
        holder{
          id
        }
        event {
          summary
          id
          start
          end
          location {
            name
            id
            address
          }
        }
      }
      role {
        id
        name
        canManageProducts
        canSeeOtherUsers
        canManageUsers
        canManageRoles
        canManageCart
        canManageOrders
      }
      dateCreated
      dateModified
    }
  }
`