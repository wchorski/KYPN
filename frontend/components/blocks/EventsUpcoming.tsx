import EventList from "../events/EventList";

type Props = {
  header:string,
  imageSrc:string,
  color:string
}

export function EventsUpcoming({header, color, imageSrc}:Props) {
  return (
    <section style={{
      backgroundColor: color,
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <h2 style={{textAlign: 'center'}}> 
        {header}
      </h2>
      <EventList page={1} />
    </section>
  )
}
