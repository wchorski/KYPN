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

    <Table
      caption='Pokemon'
      route='/pokemon'
      headers={[
        'name',
        'type',
        'height',
        'weight',
        'baseExp',
        'link'
      ]}
      cells={[
        {
          name: 'pikachu',
          type: 'electric',
          height: '0.4',
          weight: '6.0',
          baseExp: '112',
        },
        {
          name: 'Charmander',
          type: 'Fire',
          height: '0.6',
          weight: '8.5',
          baseExp: '62',
        },
      ]}
    />

  </>)
}