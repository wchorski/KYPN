import { envs } from "@/envs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Orders | ' +  envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function OrdersPage ({ params, searchParams }:Props) {
  return (<>
      OrdersPage
  </>)
}