import styled from "styled-components"
import { ImageDynamic } from "./ImageDynamic"
import Link from "next/link"
import { User } from "../../lib/types"

export function UserBadge({user}:{user:User}){

  return(
    <StyledUserBadge>
      <figure>
        <ImageDynamic photoIn={user?.image}/>
      </figure>

      <div className="content">
        <Link href={`/users/${user?.id}`}> {user?.name} {user?.nameLast}</Link>
        <br />
        <small>{user?.email}</small>

      </div>
    </StyledUserBadge>
  )
}

const StyledUserBadge = styled.div`
  display: flex;
  border: solid 2px var(--c-primary);
  border-radius: var(--br-sharp);
  padding: .6rem;
  align-items: center;

  figure{
    border: solid 1px var(--c-accent);
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    margin: 0;
    margin-right: 1rem;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      
    }
  }
`