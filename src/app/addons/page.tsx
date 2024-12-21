import { envs } from "@/envs"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { Metadata } from "next"
import NoDataFoundError404 from "../not-found"
import ErrorMessage from "@components/ErrorMessage"
import { Addon } from "@ks/types"
import { List } from "@components/elements/List"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import fetchAddons from "@lib/fetchdata/fetchAddons"
import { notFound } from "next/navigation"
import { layout_content, layout_site, page_layout } from "@styles/layout.module.css"

export const metadata: Metadata = {
	title: "Addons | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function AddonsPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { addons, error } = await fetchAddons({ session, query: QUERY })

	if (error) return <ErrorMessage error={error} />
	if (!addons) return notFound()

	return (
		<main className={page_layout}>
			<header className={layout_content} style={{marginTop: '5rem'}}>
				<h1> Addons </h1>
			</header>
			<div className={layout_content}>
				<List>
					{addons.map((ad, i) => (
						<Link key={i} href={`/addons/${ad.id}`}>
							{ad.name}
						</Link>
					))}
				</List>
			</div>
		</main>
	)
}

const QUERY = `
  id
  name
  image
  excerpt
  price
  services {
    id
  }
`
