"use client"
import Flex from "@components/layouts/Flex"
import type { Announcement } from "@ks/types"
import { getColorTheme } from "@lib/styleHelpers"
import { layout_wide, page_layout } from "@styles/layout.module.css"
import {
	btnClose,
	btnlink,
	sAnnouncement,
	sOpened,
} from "@styles/menus/announcement.module.css"
import Link from "next/link"
import type { ReactNode } from "react"
import { useState } from "react"
import { FiExternalLink } from "react-icons/fi"
import { MdClose } from "react-icons/md"

type Props = {
	announcement: Announcement
	children: ReactNode
}

// const now = new Date()

export function AnnouncementsMarquee({ announcement, children }: Props) {
	// console.log({announcements});

	// const dayLater = new Date(
	// 	now.getFullYear(),
	// 	now.getMonth(),
	// 	now.getDay() + 1
	// ).toISOString()
	// console.log({yearLater});
	// console.log('now: ', now.toISOString());

	const [isClosed, setisClosed] = useState<boolean>(false)

	// function handleClose() {
	// 	setisClosed(true)
	// }

	const { link, colorTheme = "bg_c_plain", type } = announcement
	const clrTheme = getColorTheme(colorTheme)

	return (
		<section
			// style={{
			// 	backgroundColor: color,
			// }}
			className={[
				page_layout,
				sAnnouncement,
				"banner_wrap",
				isClosed ? "" : sOpened,
				clrTheme,
				type,
			].join(" ")}
		>
			<div className={layout_wide}>
				<Flex alignItems={"stretch"} paddingBlock={"m"} paddingInline={"m"}>
					<div>{children}</div>

					{link && (
						<Link
							href={link}
							onClick={(e) => setisClosed(true)}
							className={btnlink}
						>
							<FiExternalLink />
						</Link>
					)}

					<button onClick={(e) => setisClosed(true)} className={btnClose}>
						<MdClose />
					</button>
				</Flex>
			</div>
		</section>
	)
}
