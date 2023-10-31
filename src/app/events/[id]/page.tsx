import { useRouter } from 'next/navigation'
// import EventSingle from '@components/events/EventSingle';

type Props = {
  params:{
    id:string | string[] | undefined,
  },
  searchParams: { 
    [key: string]: string | string[] | undefined, 
    q: string | undefined, 
  }
}

export default function EventByID({ params }:Props) {

  const { id } = params
  
  return (
    <>
      <h1> Event By Id: {id} </h1>
      <div className="container">
        {/* <EventSingle id={String(router.query.id)} /> */}
      </div>
    </>
  )
}
