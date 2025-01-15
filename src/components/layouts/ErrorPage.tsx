
import ErrorMessage from '@components/ErrorMessage'

import {
  layout_site,
  page_content,
  page_layout,
  } from '@styles/layout.module.css'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

type Props = {
  children?:ReactNode
  error:object | null | undefined | unknown,
}

export default async function ErrorPage ({ error, children }:Props) {

  return (
    <main className={[page_layout].join(' ')}>
      <header className={layout_site}>
        <h1>Error</h1>
      </header>
      <div className={[page_content, layout_site].join(' ')}>
        {children}
        <ErrorMessage  error={error}/>
      </div>
    </main>
  )
}