import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { ReactNode } from 'react'

type Props = {
  children:ReactNode,
  status:string,
}

export default async function NotPublicPage ({ status, children}:Props) {
  return (
    <PageTHeaderMain
      header={Header(status)}
      main={Main(children)}
    />
  )
}

function Header(status:string){

  return<>
    <Section layout={'1'}>
      <h1> {status} </h1>
    </Section>
  </>
}

function Main(children:ReactNode){

  return<>
    <Section layout={'1'}>
      {children}
    </Section>
  </>
}