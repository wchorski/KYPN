"use client"
import { useUrlHash } from "@hooks/useUrlHash"
import { dashnav } from "@styles/menus/dashboard.module.css"
import styles from "@styles/menus/dashboard.module.css"
import { type ReactNode } from "react"

import { DashNavLink } from "./DashNavLink"

type Props = {
	dashNavData: DashNavData
}

export type DashNavData = {
	slug: string
	text?: string
	isCount: boolean
	icon: ReactNode
}[]

export function DashNav({ dashNavData }: Props) {
	const { hash, setHash, removeHash } = useUrlHash()

	const navListItems = (navData: DashNavData): JSX.Element[] => {
		return navData
			.filter((item) => item.isCount)
			.map((item, i) => (
				<li
					key={i}
					//? i have to use this components `currHash` to trigger rerender because using plain `<a>` tag
					className={hash === item.slug ? styles.linkactive : ""}
				>
					<DashNavLink
						key={i}
						onClick={handleAnchorClick}
						text={item.text}
						slug={item.slug}
						icon={item.icon}
					/>
				</li>
			))
	}

	const handleAnchorClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		hash: string
	) => {
		setHash(hash)

		//todo doing this looses out on using the `:target` class and have to use class switch `.targeted` instead
		//todo but i want to keep history clean of inner page navigation
		// e.preventDefault()
		// router.replace(`#${hash}`)
	}

	return (
		<nav className={dashnav}>
			{/* <p>{dashState}</p> */}
			<ul>
				{navListItems(dashNavData)}
				{/* <DashNavLink
					onClick={setHash}
					slug="main"
					text="Dashboard"
					icon={<IconAccountBox />}
				/>

				{user.bookings.length > 0 && (
					<DashNavLink
						onClick={setHash}
						slug="bookings"
						icon={<IconBookmark />}
					/>
				)}
				{tickets && tickets?.length > 0 && (
					<DashNavLink
						onClick={setHash}
						slug="tickets"
						icon={<IconTicketOutlined />}
					/>
				)}
				{gigs.length > 0 && (
					<DashNavLink onClick={setHash} slug="gigs" icon={<IconCalendar />} />
				)}
				{gig_requests.length > 0 && (
					<DashNavLink
						onClick={setHash}
						slug="gig_requests"
						text="Gig Requests"
						icon={<IconCalendarOutlined />}
					/>
				)}
				{orders.length > 0 && (
					<DashNavLink
						onClick={setHash}
						slug="orders"
						icon={<IconShoppingBag />}
					/>
				)} */}
				{/* {rentals.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=rentals#rentals"}
										className={
											dashState === "rentals"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Rentals <BsSignpost />
									</Link>
								</li>
							)} */}
				{/* {user.subscriptions.length > 0 && (
								<li>
									<Link
										href={"/account?dashState=subscriptions#subscriptions"}
										className={
											dashState === "subscriptions"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Subscriptions <MdAutorenew />
									</Link>
								</li>
							)} */}
				{/* //todo when downloads are added */}
				{/* {false && (
								<li>
									<Link
										href={"/account?dashState=downloads#downloads"}
										className={
											dashState === "downloads"
												? styles.linkactive
												: styles.dashlink
										}
									>
										Downloads <MdOutlineDownload />
									</Link>
								</li>
							)} */}
			</ul>
		</nav>
	)
}
