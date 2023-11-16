import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function AddonsPage ({ params, searchParams }:Props) {
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> AddonsPage </h1>
      </Section>
    </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <p> AddonsPage </p>
      <p> under construction </p>
    </Section>
  </>
}