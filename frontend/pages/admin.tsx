
// create user
// create event
// list of events

import { useState } from "react";
import { PopupModal } from "../components/elements/PopupModal";
import RegisterForm from "../components/menus/RegisterForm";
import { EventCreateUpdateForm } from "../components/events/EventCreateUpdateForm";
import styled from "styled-components";
import { EventTable } from "../components/events/EventTable";
import { UserTable } from "../components/user/UserTable";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "./events/edit/[id]";
import { Location } from "../lib/types"
import { QueryLoading } from "../components/menus/QueryLoading";
import ErrorMessage from "../components/ErrorMessage";
import { BookingsTable } from "../components/booking/BookingsTable";

// list of users
export default function AdminPage() {

  const [registerData, setRegisterData] = useState<any>()
  const [eventData, setEventData] = useState<any>()

  const { loading: loadingLocations, error: errorLocations, data: dataLocations } = useQuery(QUERY_LOCATIONS)
  function getLocationOptions(locations:Location[]){
    return dataLocations.locations.map((loc:Location) => ({value: loc.id, label: loc.name}))
  }

  if (loadingLocations) return <QueryLoading />
  if (errorLocations) return <ErrorMessage error={errorLocations} />


  return (<>
    <StyledAdminDash>
      <PopupModal data={registerData} setData={setRegisterData}>
        <RegisterForm />
      </PopupModal>

      <PopupModal data={eventData} setData={setEventData}>
        <EventCreateUpdateForm locationOptions={getLocationOptions(dataLocations)}/>
      </PopupModal>

      <section className="pad">
        <h2>Quick Edit</h2>

        <div className="quick-edit">

          <button onClick={() => setRegisterData({hey: 'sup'})} className="medium">
            Register User
          </button>

          <button onClick={() => setEventData({hey: 'sup'})} className="medium">
            Create Event
          </button>

        </div>
      </section>
      <hr />

      <section className="pad">
        <BookingsTable />
        <hr />
        
        <EventTable />
        <hr />

        <UserTable />
      </section>

    </StyledAdminDash>
  </>)
}

const StyledAdminDash = styled.div`

  

  .quick-edit{
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin-bottom: 1em;
  }
`
