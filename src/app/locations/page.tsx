import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { Card } from "@components/layouts/Card"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { StatusBadge } from "@components/StatusBadge"
import fetchLocations from "@lib/fetchdata/fetchLocations"
import { layout_content, page_layout } from "@styles/layout.module.css"
import { getServerSession } from "next-auth"
import Link from "next/link"
type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function LocationsPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { locations, error } = await fetchLocations({
		query: LOCATIONS_QUERY,
		session,
	})

	if (error) return <ErrorMessage error={error} />

	if (!locations)
		return (
			<NoDataFoundPage>
				<p>No Locations Found</p>
			</NoDataFoundPage>
		)

	return (
		<main className={page_layout}>
			<header className={layout_content} >
				<h1> Locations </h1>
			</header>
			<div className={layout_content}>
				{locations?.map((loc) => (
					<Card key={loc.id}>
						<article>
              {loc.status !== 'PUBLIC' && <StatusBadge type={'any'} status={loc.status}/>}
              
							<Link href={`/locations/${loc.id}`}>
								<h4>{loc.name}</h4>
							</Link>
							<Link href={`/locations/${loc.id}`}>
								<address>{loc.address}</address>
							</Link>
              <br/>
							<p>{loc.notes}</p>

							{/* {address && (
                <Map address={address}/>
              )} */}
						</article>
					</Card>
				))}
			</div>
		</main>
	)
}

const LOCATIONS_QUERY = `
  id
  name
  address
  rooms
  notes
  status
  categories {
    id
    name
  }
  tags {
    id
    name
  }
`
// TODO add Events
// const LOCATIONS_QUERY = `
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
