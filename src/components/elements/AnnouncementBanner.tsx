import fetchAnnouncements from "@lib/fetchdata/fetchAnnouncements"
import { AnnouncementsMarquee } from "./AnnouncementsMarquee"
import { BlockRender } from "@components/blocks/BlockRender"
import { ReactElement } from "react"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { plainObj } from "@lib/utils"

type Props = {
  prop?:string
}

// any type is a bug workaround
// @ts-ignore
export async function AnnouncementBanner ({ prop }:Props):ReactElement<any, any> {

  const session = await getServerSession(nextAuthOptions)
  const {announcements, error } = await fetchAnnouncements(session)

  if(error) return <></>
  if (!announcements || announcements.length === 0) return <></>

  return (
    <AnnouncementsMarquee announcement={plainObj(announcements[0])}>
      <BlockRender document={plainObj(announcements[0].content.document)} />
    </AnnouncementsMarquee>
  )
}