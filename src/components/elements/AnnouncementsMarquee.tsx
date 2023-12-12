'use client'
import Link from "next/link"
import { ReactNode, useState } from "react"
import { MdClose } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"
import { BlockRender } from "@components/blocks/BlockRender"
import { Announcement } from "@ks/types"
import styles from '@styles/menus/annoucement.module.scss'

type Props = {
  announcement:Announcement,
  children:ReactNode,
}

const now = new Date()

export function AnnouncementsMarquee({ announcement, children }: Props) {
  // console.log({announcements});

  const dayLater = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1 ).toISOString()
  // console.log({yearLater});
  // console.log('now: ', now.toISOString());


  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isClosed, setisClosed] = useState<boolean>(false)

  function handleClose() {
    setisClosed(true)
  }
  
  const {link, color} = announcement

  return (
    <div
      onMouseOver={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      style={{
        backgroundColor: color,
      }}
      className={isClosed ? [styles.closed, 'banner_wrap', styles.announcement].join(' ') : [styles.announcement, 'banner_wrap'].join(' ')}
    >
      <div className="content-cont">

        {children}

      </div>
      
      {link && (
        <Link href={link} onClick={e => setisClosed(true)}
          className={isFocused ? 'focused btnlink' : 'btnlink'}
        >
          <FiExternalLink />
        </Link>
      )}

      <button
        onClick={e => setisClosed(true)}
        className="close"
      >
        <MdClose />
      </button>

    </div>
  )
}