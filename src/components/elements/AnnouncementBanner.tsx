import fetchAnnouncements from "@lib/fetchdata/fetchAnnouncements"
import { AnnouncementsMarquee } from "./AnnouncementsMarquee"
import { BlockRender } from "@components/blocks/BlockRender"

type Props = {
  prop?:string
}

export async function AnnouncementBanner ({ prop }:Props) {

  const {announcements, error } = await fetchAnnouncements()

  if (!announcements || announcements.length === 0) return null

  return (
    <AnnouncementsMarquee announcement={announcements[0]}>
      <BlockRender document={announcements[0].content.document} />
    </AnnouncementsMarquee>
  )
}