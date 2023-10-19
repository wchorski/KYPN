import { PageTMain } from '@components/layouts/PageTemplates'

export default function Home() {
  return (

    <PageTMain 
      main={Main()}
    />

  )
}

function Main(){

  return <>
    <p> should redirect to /home route </p>
  </>
}
