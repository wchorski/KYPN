import { LoadingAnim } from "@components/elements/LoadingAnim"
import { PageTMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"

export default async function LoadingPage () {

  return (
    <PageTMain 
      main={Main()}
    />
  )

}

function Main(){

  return<>
    <Section layout={'1'}>
      <p> Loading ... </p>
      <LoadingAnim />
    </Section>
  </>
}