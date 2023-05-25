import { useRouter } from "next/router";
import { EventCreateForm } from "../../../components/events/EventCreateForm";
import { QUERY_EVENT } from "../../../components/events/EventSingle";
import { QueryLoading } from "../../../components/menus/QueryLoading";
import ErrorMessage from "../../../components/ErrorMessage";
import { useQuery } from "@apollo/client";


export default function EventEditById() {
  
  const router = useRouter()

  const { loading, error, data } = useQuery(
    QUERY_EVENT, {
    variables: { where: { id: router.query.id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  return (
    <>
      <h1> Edit Event </h1>
      <EventCreateForm event={data.event || undefined} />
    </>
  )
}
