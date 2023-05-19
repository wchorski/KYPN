import styled from "styled-components"
import { datePrettyLocalDay, datePrettyLocalTime, datePrettyLocalDayShort } from "../../lib/dateFormatter"
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
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

type Event = {
  img:string,
  datetime:string,
  title:string,
  location: {
    name:string,
    link:string,
  }
  link:string,
}

export function EventCard({img, datetime, title, location, link}:Event) {
  return (
    <StyledEventCard>
      <div>
        <img src={img} alt='event thumbnail' />
      </div>

      <div>
        <time dateTime={datetime} className="date-short"> {datePrettyLocalDayShort(datetime)} </time>
      </div>

      <Link href={link} className="details">
        <h4> {title} </h4>

        <time dateTime={datetime}> 
          <IoMdTime />
          {datePrettyLocalDay(datetime)} 
          @ {datePrettyLocalTime(datetime)}
        </time>

        <address>
          <MdLocationOn />
          {location.name} <br />
          {/* {address.street} <br /> */}
          {/* {address.town} <br /> */}
          {/* {address.country} <br /> */}
        </address>
      </Link>

      <a href={link} className="button"> view </a>

    </StyledEventCard>
  )
}

const StyledEventCard = styled.article`
  display: flex;
  flex-wrap: wrap;
  border: solid white 1px;
  padding: 1em;
  transition: border .2s ease-in;

  h4{
    margin: 0;
  }

  img{
    width: 5em;
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

  svg{
    margin-right: .2em;
  }

  a.button {
    margin-left: auto;
  }

  &:hover, &:focus{
    border-left: solid white 4px;
  }

  /* @media (max-width: 500px){
    flex-direction: column;

    .content-cont, .media-cont{
      width: 100%;
    }
  } */
`