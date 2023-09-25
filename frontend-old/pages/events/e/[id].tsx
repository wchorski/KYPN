import { useRouter } from 'next/navigation'
import EventSingle from '../../../components/events/EventSingle';

export default function EventByID() {

  const router = useRouter()
  
  
  return (
    <>
      <div className="container">
        <EventSingle id={String(router.query.id)} />
      </div>
    </>
  )
}
