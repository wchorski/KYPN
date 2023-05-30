
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

// list of users
export default function AdminPage() {

  const [registerData, setRegisterData] = useState<any>()
  const [eventData, setEventData] = useState<any>()

  return (<>
    <StyledAdminDash>
      <PopupModal data={registerData} setData={setRegisterData}>
        <RegisterForm />
      </PopupModal>

      <PopupModal data={eventData} setData={setEventData}>
        <EventCreateUpdateForm />
      </PopupModal>

      <h2>Quick Edit</h2>

      <div className="quick-edit">

        <button onClick={() => setRegisterData({hey: 'sup'})} className="medium">
          Register User
        </button>

        <button onClick={() => setEventData({hey: 'sup'})} className="medium">
          Create Event
        </button>

      </div>
      <hr />

      
      <EventTable />
      <hr />

      <UserTable />

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
