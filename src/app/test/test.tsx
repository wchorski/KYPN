
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function TestPage({ params, searchParams }:Props) {
  return (
    <h1>This is a PAGE</h1>
  )
}

