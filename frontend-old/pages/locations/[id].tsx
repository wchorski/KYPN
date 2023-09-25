import { useRouter } from "next/router";
import { LocationSingle } from "../../components/locations/LocationSingle";


export default function LocationById() {

  const router = useRouter()

  return (
    <>
      <section className="pad">
        <LocationSingle id={String(router.query.id)}/>
      </section>
    </>
  )
}