import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function AddonByIdPage ({ params, searchParams }:Props) {
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<header>
    <h1> AddonByIdPage </h1>
  </header>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <p> AddonByIdPage </p>
      <p> this page is under construction </p>
    </Section>
  </>
}