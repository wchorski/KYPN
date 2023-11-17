import fetchAnnouncements from "@lib/fetchdata/fetchAnnouncements"
import { AnnouncementsMarquee } from "./AnnouncementsMarquee"

type Props = {
  prop?:string
}

export async function AnnouncementBanner ({ prop }:Props) {

  const {announcements, error } = await fetchAnnouncements()
  return (
    <div className="banner_wrap">
      <AnnouncementsMarquee announcements={announcements}/>
    </div>
  )
}