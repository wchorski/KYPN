import styled from "styled-components"
import { datePrettyLocalDay, datePrettyLocalTime, datePrettyLocalDayShort } from "../../lib/dateFormatter"
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { ImageDynamic } from "../elements/ImageDynamic";
import { Event } from "../../lib/types";

// import Image from "next/image";

// const img = 'https://cdn.pixabay.com/photo/2022/05/19/19/09/avocado-7207993_960_720.jpg'
// const datetime = '2011-11-18T14:00:00.000'
// const title = 'Event Title'
// const location = {
//   name: 'Party Town',
//   street: '840 Deering Ct W', 
//   town: 'West Chicago, Illinois, 60185', 
//   country: 'USA',
//   link: '/locations/1'
// }
// const url = '/events/1'

// type Event = {
//   photo:string,
//   start:string,
//   summary:string,
//   location?: {
//     name:string,
//     id:string,
//   }
//   id:string,
// }

export function EventCard({photo, start, summary, location, id}:Event) {
  return (
    <StyledEventCard>
      <div>
        <ImageDynamic photoIn={photo}/>
      </div>

      <div>
        <time dateTime={start} className="date-short"> 
          {datePrettyLocalDayShort(start || '')} 
        </time>
      </div>

      <div className="details">
        <Link href={`/events/e/${id}`}>
          <h4> {summary} </h4>
        </Link>

        <time dateTime={start}> 
          <IoMdTime />
          {/* {datePrettyLocalDay(start)}  */}
          {/* @  */}
          {datePrettyLocalTime(start || '')}
        </time>

        {location && (
          <Link href={`/locations/${location.id}`}>
              <address>
                <MdLocationOn />
                {location?.name} 
                <br />
                {location?.address}
                {/* {address.street} <br /> */}
                {/* {address.town} <br /> */}
                {/* {address.country} <br /> */}
              </address>
          </Link>
        )}
      </div>

      <a href={`/events/e/${id}`} className="view button medium"> view </a>

    </StyledEventCard>
  )
}

export const StyledEventCard = styled.article`
  display: flex;
  flex-wrap: wrap;
  border: solid white 1px;
  padding: 1em;
  transition: border .2s ease-in;
  color: var(--c-txt);

  h4{
    margin: 0;
  }

  img{
    width: 5em;
    height: auto;
  }

  time.date-short{
    padding: 0 1em;
    width: 1em;
    display: inline-table;
  }

  a.details{
    color: var(--c-txt);
    text-decoration: none;

    &:hover{
      text-decoration: revert;
    }    
  }

  a.button{
    margin-left: auto;
  }

  a.view{
    background-color: transparent;
  }

  svg{
    margin-right: .2em;
  }

  .actions-cont {
    margin-left: auto;
  }

  &:hover, &:focus{
    border-left: solid white 4px;
  }

  address{
    overflow:hidden;
    width: 100%; //can also use calc function as per Yudi's answer
    display: inline-block;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  /* @media (max-width: 500px){
    flex-direction: column;

    .content-cont, .media-cont{
      width: 100%;
    }
  } */
`