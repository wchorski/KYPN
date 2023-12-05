import fetchAnnouncements from "@lib/fetchdata/fetchAnnouncements"
import { AnnouncementsMarquee } from "./AnnouncementsMarquee"
import { BlockRender } from "@components/blocks/BlockRender"
import { ReactElement } from "react"

type Props = {
  prop?:string
}

// any type is a bug workaround
// @ts-ignore
export async function AnnouncementBanner ({ prop }:Props):ReactElement<any, any> {

  const {announcements, error } = await fetchAnnouncements()

  if (!announcements || announcements.length === 0) return <></>

  return (
    <AnnouncementsMarquee announcement={announcements[0]}>
      <BlockRender document={announcements[0].content.document} />
    </AnnouncementsMarquee>
  )
}