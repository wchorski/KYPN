

import Link from "next/link"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"
import styled from "styled-components"
import { gql, useQuery } from "@apollo/client"
import { QueryLoading } from "../menus/QueryLoading"
import { QueryError } from "../menus/QueryError"
import { BlockRenderer } from "../blocks/BlocksRenderer"
import { Announcment } from "../../lib/types"

interface Props {
  
}

const now = new Date()

export function AnnouncementsMarquee({ }: Props) {

  const dayLater = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1 ).toISOString()
  // console.log({yearLater});
  // console.log('now: ', now.toISOString());


  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isClosed, setisClosed] = useState<boolean>(false)
  const { loading, error, data } = useQuery(Announcements_QUERY, {
    variables: {
      where: {
        AND: [
          {
            start: {
              lte: now.toISOString(),
            }
          },
          {
            end: {
              gte: now.toISOString(),
            }
          },
        ]
      },
      orderBy: [
        {
          start: 'desc'
        }
      ]
    },
  })
  function handleClose() {
    setisClosed(true)
  }

  if (loading) return null
  if (error) return null
  // if (loading) return <QueryLoading />
  // if (error) return <QueryError error={error} />

  // console.log(data);
  
  const {announcements} = data
  if (data?.announcements.length <= 0) return null
  const {content, start, end, link}:Announcment = announcements[0]
  
  
  return (
    <StyledMarquee
      onMouseOver={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      className={isClosed ? 'closed' : ''}
    >
      <div className="content-cont">

        <BlockRenderer document={content.document} />

      </div>

      <Link href={link} onClick={e => setisClosed(true)}
        className={isFocused ? 'focused btnlink' : 'btnlink'}
      >
        <FiExternalLink />
      </Link>

      <button
        onClick={e => setisClosed(true)}
        className="close"
      >
        <MdClose />
      </button>

    </StyledMarquee>
  )

}

const Announcements_QUERY = gql`
  query Announcements($where: AnnouncementWhereInput!, $orderBy: [AnnouncementOrderByInput!]!) {
    announcements(where: $where, orderBy: $orderBy) {
      start
      end
      id
      link
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`


const StyledMarquee = styled.div`

  --c-banner: #dbdbdb;
  /* width: 100%; */
  /* border: 1px solid var(--c-accent); */
  /* border-radius: 10% 0 0 0 ; */
  border-radius:10px/40%;
  margin: .2rem 1rem;

  &.closed{
    height: 0;
    margin: 0;
    pointer-events: none;
  }

  background-color: var(--c-3);
  
  position: relative;

  /* z-index: 9003; */
  height: 300px;
  /* overflow: hidden; */
  display: flex;
  transition: all .5s;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  .content-cont{
    padding: 0 1rem;
    margin: 0 auto;
  }

  a.btnlink{
    font-size: 2rem;
    margin-left: auto;

    border-bottom: 5px dashed var(--c-accent);
    padding: 1em;
    height: 100%;
    display: flex;
    align-items: center;
    transform: scale(1);
    transition: all .3s;

    &:hover, &:focus{
      background-color: var(--c-accent);
      border-bottom: 2px dashed var(--c-3);
      color: var(--c-txt-rev);
    }

    /* &.focused{
      transform: scale(1.2);
    } */
  }


  button.close{
    /* position: absolute; */
    top: 0;
    right: 0;
    /* margin: 1em; */
    padding: 1em;
    font-size: 20px;
    border: none;
    background-color: transparent;
    transition: all .3s;
    height: 100%;
    
    &:hover{
      background-color: #00000064;
      color: white;
    }
  }


  span.msg {
    flex-grow: 1;
    padding: 1em;
    font-size: 3em;
    color: var(--c-txt);
    /* position: absolute; */
    width: 100%;
    height: 100%;
    margin: 0;
    line-height: 50px;
    text-align: center;
    
    /* transform:translateX(100%); */
    
    /* animation: example1 15s linear infinite; */
  }

  @keyframes example1 {
    0%   { 
    
      transform: translateX(100%); 		
    }
    100% { 
    
      transform: translateX(-100%); 
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    width: 0px;
    height: 0px;
    border-bottom: 70px solid var(--c-accent);
    border-left: 70px solid transparent;
    box-shadow: 7px 2px 7px rgba(0,0,0,0.3);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    width: 0px;
    height: 0px;
    border-top: 69px solid var(--c-bg); 
    border-right: 69px solid transparent;
  }
`