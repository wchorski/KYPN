import React, { Fragment, useContext } from 'react';
import { useUser } from '../components/menus/Session';
import { Table } from '../components/elements/Table';




export default function Home() {
  // const seshCtx = useContext(SessionContext)
  // const {session} = useGlobalContext()
  const session = useUser()

  return (<>
    <h1>Home</h1>
    {session && (
      <p>Welcome, {session.name}</p>
    )}

    <Table />

  </>)
}