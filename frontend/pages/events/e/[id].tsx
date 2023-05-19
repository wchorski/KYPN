import { useRouter } from 'next/router'
import EventSingle from '../../../components/events/EventSingle';

export default function EventByID() {

  const router = useRouter()
  console.log(router.query);
  
  
  return (
    <>
      <EventSingle id={String(router.query.id)}/>
    </>
  )
}
