import { LoadingAnim } from "@components/elements/LoadingAnim"
import { Section } from "@components/layouts/Section"


export default function AppLoading () {
  return (
    <Section layout={'1'}>
      <p> loading app... </p>
      <LoadingAnim />
    </Section>
  )
}