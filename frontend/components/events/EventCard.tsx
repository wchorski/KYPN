import styles from '@styles/events/events.module.scss'
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

export function EventCard({image, start, summary, location, id}:Event) {
  return (
    <article className={styles.event} >
      <div>
        <ImageDynamic photoIn={image}/>
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

    </article>
  )
}