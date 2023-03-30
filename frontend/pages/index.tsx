import React, { Fragment, useContext } from 'react';
import Link from 'next/link';
import { useGlobalContext } from '@/lib/useSessionContext';
// import { SessionContext } from './_app';


export default function Home() {
  // const seshCtx = useContext(SessionContext)
  const {session} = useGlobalContext()

  return (<>
    <h1>Home</h1>
    {session?.name && (
      <p>Welcome, {session.name}</p>
    )}

  </>)
}