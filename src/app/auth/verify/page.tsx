import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
type Props = {
  searchParams:{email:string}
}

export default async function VerifyPage ({ searchParams }:Props) {

  const { email } = searchParams

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(email)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> VerifyPage </h1>
    </Section>
  </>
}

function Main(email:string){

  return<>
    <Section layout={'1'}>
      <h3> {`//TODO finish this flow`}</h3>
      <p> VerifyPage </p>
      <p> email: {email}</p>
    </Section>
  </>
}