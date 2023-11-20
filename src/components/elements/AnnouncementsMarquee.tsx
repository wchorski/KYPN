'use client'
import Link from "next/link"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"
import { BlockRender } from "@components/blocks/BlockRender"
import { Announcement } from "@ks/types"
import styles from '@styles/menus/annoucement.module.scss'

type Props = {
  announcements:Announcement[]|undefined
}

const now = new Date()

export function AnnouncementsMarquee({ announcements }: Props) {
  // console.log({announcements});

  const dayLater = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1 ).toISOString()
  // console.log({yearLater});
  // console.log('now: ', now.toISOString());


  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isClosed, setisClosed] = useState<boolean>(false)

  function handleClose() {
    setisClosed(true)
  }
  
  if (!announcements || announcements.length === 0) return null
  const {content, start, end, link}:Announcement = announcements[0]
  
  
  return (
    <div
      onMouseOver={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      className={isClosed ? 'closed ' + styles.announcement  : styles.announcement}
    >
      <div className="content-cont">

        {/* <BlockRender document={content.document} /> */}

      </div>

      <Link href={link} onClick={e => setisClosed(true)}
        className={isFocused ? 'focused btnlink' : 'btnlink'}
      >
        <FiExternalLink />
      </Link>

      <button
        onClick={e => setisClosed(true)}
        className="close"
      >
        <MdClose />
      </button>

    </div>
  )
}