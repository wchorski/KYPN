import { envs } from '@/envs'
import { nextAuthOptions } from '@/session'
import { ActionForm } from '@components/ActionForm'
import { ContactForm } from '@components/blocks/ContactForm'
import { ActionRegsiterForm } from '@components/forms/ActionRegisterForm'
import { ReactForm } from '@components/forms/ReactForm'
import { FormState } from '@components/FormState'
import {
  layout_content,
  layout_site,
  page_content,
  page_layout,
  } from '@styles/layout.module.css'
import { getServerSession } from 'next-auth'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

const page = 1
const perPage = envs.PERPAGE
export default async function Page ({ params, searchParams }:Props) {
  const session = await getServerSession(nextAuthOptions)
  // const { data, error } = await fetch()
  // if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
  // if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

  return (
    <main className={[page_layout].join(' ')}>
      <header className={layout_content}>
        <h1>Temporary Page</h1>
      </header>
      <div className={[page_content, layout_content].join(' ')}>
        {/* <ActionForm/>
        <ActionButtonId id={'wc_123'}/> */}
        {/* <ReactForm /> */}
        {/* <ActionRegsiterForm /> */}
        {/* <FormState /> */}
        {/* <ActionButtonTest id={'wc_123'}/> */}
        <ContactForm header={'Contact'} />
      </div>
    </main>
  )
}