import React, { Fragment, useContext } from 'react';
import Link from 'next/link';
import { useGlobalContext } from '../lib/useGlobalContext';
import { useUser } from '../components/menus/Session';
import SearchCarlos from '../components/menus/SearchCarlos';
// import { SessionContext } from './_app';


export default function Home() {
  // const seshCtx = useContext(SessionContext)
  // const {session} = useGlobalContext()
  const session = useUser()

  return (<>
    <h1>Home</h1>
    {session?.name && (
      <p>Welcome, {session.name}</p>
    )}
    <SearchCarlos />

  </>)
}