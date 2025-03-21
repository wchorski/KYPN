import { BlockRender } from "@components/blocks/BlockRender"
import { AnnouncementsMarquee } from "@components/elements/AnnouncementMarquee"
import { isEmptyDocument, plainObj } from "@lib/contentHelpers"
import fetchAnnouncements from "@lib/fetchdata/fetchAnnouncements"
import { getServerSession } from "next-auth"
import type { ReactElement } from "react"

import { nextAuthOptions } from "@/session"

type Props = {
  prop?:string
}

// any type is a bug workaround
// @ts-ignore
export async function AnnouncementBanner ({ prop }:Props):ReactElement<any, any> {

  const session = await getServerSession(nextAuthOptions)
  const {announcements, error } = await fetchAnnouncements(session)
  
  
  if(error) return <></>
  if (
    !announcements 
    || announcements.length === 0 
    || isEmptyDocument(announcements[0].content.document)
  ) return <></>

  return (
    <AnnouncementsMarquee announcement={plainObj(announcements[0])}>
      <BlockRender document={plainObj(announcements[0].content.document)} />
    </AnnouncementsMarquee>
  )
}