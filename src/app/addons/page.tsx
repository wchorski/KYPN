import { List } from "@components/elements/List"
import ErrorMessage from "@components/ErrorMessage"
import fetchAddons from "@lib/fetchdata/fetchAddons"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { ArticleList } from "@components/layouts/ArticleList"

export const metadata: Metadata = {
	title: "Addons | " + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function AddonsPage({}: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { addons, error } = await fetchAddons({ session, query: QUERY })

	if (error) return <ErrorMessage error={error} />
	if (!addons) return notFound()

	return (
		<main className={page_layout}>
			<header className={layout_content}>
				<h1> Addons </h1>
			</header>
			<div className={page_content}>
				{/* <List>
					{addons.map((ad, i) => (
						<Link key={i} href={`/addons/${ad.id}`}>
							{ad.name}
						</Link>
					))}
				</List> */}
				<ArticleList type="addon" items={addons} />
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
