import { envs } from '@/envs'
import { PageTMain } from '@components/layouts/PageTemplates'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

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
