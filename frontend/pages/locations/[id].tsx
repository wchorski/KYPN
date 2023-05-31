import { useRouter } from "next/router";
import { LocationSingle } from "../../components/locations/LocationSingle";


export default function LocationById() {

  const router = useRouter()

  return (
    <>
      <LocationSingle id={String(router.query.id)}/>
    </>
  )
}
