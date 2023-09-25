import EventList from "../events/EventList";

type Props = {
  header:string,
  imageSrc?:string,
  color?:string
}

export function EventsUpcoming({header, color = "transparent", imageSrc}:Props) {
  return (
    <section style={{
      backgroundColor: color,
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      // todo only add padding on desktop
      // padding: '2em 1em',
    }}>
      <h2 style={{textAlign: 'center'}}> 
        {header}
      </h2>
      <EventList page={1} />
    </section>
  )
}
