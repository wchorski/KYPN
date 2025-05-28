import { PriceTag } from "@components/ecommerce/PriceTag"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { List } from "@components/elements/List"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import { Grid } from "@components/layouts/Grid"
import fetchAddon from "@lib/fetchdata/fetchAddon"
import {
	layout_breakout,
	layout_wide,
	page_content,
	page_layout,
	sticky_aside,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { _1_1, grid } from "@styles/grid.module.css"
import { isEmptyDocument } from "@lib/contentHelpers"
import { StatusBadge } from "@components/StatusBadge"
import { IconLink } from "@components/elements/IconLink"
import Flex from "@components/layouts/Flex"
import { tags_list } from "@styles/tags.module.css"
import { category_list } from "@styles/categories.module.css"
import { featured } from "@styles/events/event.module.css"

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { addon, error } = await fetchAddon({ id, session, query: QUERY })

	return {
		title: addon?.name + " | " + envs.SITE_TITLE,
		description: envs.SITE_DESCRIPTION,
	}
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function AddonByIdPage({ params }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { addon, error } = await fetchAddon({ id, query: QUERY, session })

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!addon) return notFound()

	const {
		name,
		excerpt,
		price,
		image,
		services,
		categories,
		tags,
		author,
		status,
	} = addon

	return (
		<main className={page_layout} style={{ paddingTop: "var(--space-l)" }}>
			<article
				className={[grid, _1_1].join(" ")}
				style={{ gridColumn: "layout_wide", gap: "var(--space-ml)" }}
			>
				<header>
					<div
						className={[sticky_aside, grid].join(" ")}
						style={{ gap: "var(--space-ms)" }}
					>
						<figure className={featured}>
							<ImageDynamic
								photoIn={image}
								priority={true}
								alt={`Featured Image for ${name} Service`}
							/>
						</figure>

						<Flex>
							<ul className={category_list}>
								{categories?.map((cat) => (
									<li key={cat.id}>
										<Link href={`/categories?ids=${cat.id}`}>{cat.name}</Link>
									</li>
								))}
							</ul>

							<ul className={tags_list}>
								{tags?.map((tag) => (
									<li key={tag.id}>
										<Link href={`/tags?ids=${tag.id}`}>{tag.name}</Link>
									</li>
								))}
							</ul>
						</Flex>

						{(session?.data.role?.canManagePosts || status !== "PUBLIC") && (
							<Card
								direction={"row"}
								gap={"var(--space-m)"}
								verticleAlign={"center"}
							>
								<StatusBadge type={"service"} status={status} />
								{(author?.id === session?.itemId ||
									session?.data?.role?.canManagePosts) && (
									<IconLink
										icon={"edit"}
										href={envs.CMS_URL + `/services/${id}`}
										label={"edit"}
									/>
								)}
							</Card>
						)}
					</div>
				</header>

				<div className={page_content}>
					<h1> {name} </h1>

					<PriceTag price={price} style={{ fontSize: "var(--space-l)" }} />
					{excerpt && (
						<Card>
							<p>{excerpt}</p>
						</Card>
					)}
				</div>
			</article>

			<hr />
			<footer className={layout_wide}>
				<h2> Related Services </h2>
				<p className={"sub-text"}>
					Upon checkout, customize your packages with this add-ons
				</p>
				<List>
					{services?.map((serv) => (
						<div key={serv.id}>
							<Link href={`/services/${serv.id}`}>{serv.name}</Link>
						</div>
					))}
				</List>
			</footer>
		</main>
	)
}

const QUERY = `
  id
  name
  excerpt
  price
  image
  status
  services {
    id
    name
  }
  categories {
    id
    name
  }
  tags {
    id
    name
  }
  author {
    id
    email
    name
  }
`
