'use client'
import { useRouter } from 'next/navigation'
import { Callout } from '@components/blocks/Callout'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import Link from 'next/link'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
// type Props = {
//   searchParams:{q:string}
//   params:{id:string}
// }

export async function NoDataOrPermissionPage() {
  
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<>
  </>
}

function Main(){

  const router = useRouter()

  const handleBack = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    router.back()
  }

  return<>
    <Section layout={'1'}>
      <Callout  intent={'error'}>
        <p>The item could not be found or you don't have access to it.</p>
        <br />
        <Link href="#" onClick={handleBack}> <MdOutlineKeyboardArrowLeft /> Go Back </Link>
      </Callout>
    </Section>
  </>
}