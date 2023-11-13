import styles from '@styles/events/events.module.scss'
import { datePrettyLocalTime, datePrettyLocalDayShort } from "@lib/dateFormatter"
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { ImageDynamic } from "../elements/ImageDynamic";
import { Event } from "@ks/types";
import Image from 'next/image';

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