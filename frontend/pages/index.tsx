import React, { Fragment, useContext } from 'react';
import { useUser } from '../components/menus/Session';




export default function Home() {
  // const seshCtx = useContext(SessionContext)
  // const {session} = useGlobalContext()
  const session = useUser()

  return (<>
    <h1>Home</h1>
    {session && (
      <p>Welcome, {session.name}</p>
    )}

  </>)
}