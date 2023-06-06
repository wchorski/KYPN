import EventList from "../events/EventList";

type Props = {
  header:string,
}

export function EventsUpcoming({header}:Props) {
  return (
    <div>
      <h2 style={{textAlign: 'center'}}> 
        {header}
      </h2>
      <EventList page={1} />
    </div>
  )
}
