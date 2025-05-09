import { IconLink } from "@components/elements/IconLink"
import ErrorMessage from "@components/ErrorMessage"
import fetchLocation from "@lib/fetchdata/fetchLocation"
import { layout_content, page_layout } from "@styles/layout.module.css"
import styles from "@styles/location.module.css"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/session"

type Props = {
	// searchParams: { q: string }
	params: { id: string }
}

export default async function LocationByIdPage({ params }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { location, error } = await fetchLocation({
		id,
		query: QUERY_LOCATION,
		session,
	})

	if (error) return <ErrorMessage error={error} />
	if (!location) return notFound()

	const { name, address, notes } = location

	function isAddressURL(address: string) {
		if (address.startsWith("/") || address.startsWith("http")) return true

		return false
	}

	return (
		<main className={page_layout}>
			<header className={layout_content}>
				<h1> {name} </h1>
			</header>
			<div className={layout_content}>
				<article className={styles.location}>
					{isAddressURL(address) ? (
						<IconLink icon={"location"} href={address} className={'button medium'}>
							<address>{address}</address>
						</IconLink>
					) : (
						<address>{address}</address>
					)}
					<br />
					<p>{notes}</p>
					{/* {address && <Map address={address} />} */}
				</article>
			</div>
		</main>
	)
}

const QUERY_LOCATION = `
  id
  name
  address
  rooms
  notes
  categories {
    id
    name
  }
  tags {
    id
    name
  }
`
// TODO add events
// const QUERY_LOCATION = `
//   id
//   name
//   address
//   rooms
//   events {
//     id
//     summary
//     start
//   }
//   categories {
//     id
//     name
//   }
//   tags {
//     id
//     name
//   }
// `
