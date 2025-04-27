import { BlockRender } from "@components/blocks/BlockRender"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { IconLink } from "@components/elements/IconLink"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { StatusBadge } from "@components/StatusBadge"
import { isEmptyDocument } from "@lib/contentHelpers"
import { daysOfWeek } from "@lib/dateCheck"
import { timePretty } from "@lib/dateFormatter"
import fetchService from "@lib/fetchdata/fetchService"
import { category_list } from "@styles/categories.module.css"
import { featured } from "@styles/events/event.module.css"
import { _1_1, grid } from "@styles/grid.module.css"
import {
	layout_wide,
	page_content,
	page_layout,
	sticky_aside,
} from "@styles/layout.module.css"
import { tags_list } from "@styles/tags.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { service } = await fetchService({ id, query: QUERY, session })

	if (!service)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESCRIPTION,
		}

	const { name, excerpt, image, categories, tags } = service

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || []

	return {
		metadataBase: new URL(envs.FRONTEND_URL),
		title: name,
		description: excerpt,
		openGraph: {
			images: [String(image), ...previousImages],
			title: name,
			description: excerpt,
			url: envs.FRONTEND_URL + "/bookings?serviceId=" + id,
			type: "article",
		},
		keywords:
			tags?.map((tag) => tag.name).join(", ") +
			" " +
			categories?.map((cat) => cat.name).join(", "),
		// authors: [{name: author?.name, url: author?.url}]
	}
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function ServiceByIdPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params

	const { service, error } = await fetchService({ id, query: QUERY, session })

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!service) return notFound()

	const {
		name,
		description,
		price,
		image,
		durationInHours,
		buisnessHourClosed,
		buisnessHourOpen,
		buisnessDays,
		addons,
		locations,
		categories,
		tags,
		author,
		status,
	} = service

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
										<Link href={`/search?categories=${cat.id}`}>
											{cat.name}
										</Link>
									</li>
								))}
							</ul>

							<ul className={tags_list}>
								{tags?.map((tag) => (
									<li key={tag.id}>
										<Link href={`/search?tags=${tag.id}`}>{tag.name}</Link>
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
					<Link
						href={`/book-a-service?serviceId=${id}`}
						className="button large"
					>
						Book this Service
					</Link>
					<table>
						<tbody>
							<tr>
								<td>Base Price: </td>
								<td>
									<PriceTag price={price} />
								</td>
							</tr>
							<tr>
								<td> Service Duration: </td>
								<td>
									{" "}
									{String(durationInHours)}{" "}
									<small className="sub-text"> hours </small>{" "}
								</td>
							</tr>
							<tr>
								<td> Buisness Days: </td>
								<td> {daysOfWeek(buisnessDays as number[]).join(", ")} </td>
							</tr>
							<tr>
								<td> Buisness Hours: </td>
								<td>
									{" "}
									{timePretty(buisnessHourOpen || "")} -{" "}
									{timePretty(buisnessHourClosed || "")}{" "}
								</td>
							</tr>
						</tbody>
					</table>
					{!isEmptyDocument(description?.document) && (
						<Card>
							<BlockRender document={description.document} />
						</Card>
					)}
				</div>
			</article>
			<footer className={layout_wide}>
				<hr />
				<Flex>
					{addons.length > 0 && (
						<Card>
							<h2 id="addons"> Add-Ons </h2>
							<p className="sub-text">available for this package</p>
							<ul>
								{addons?.map((ad) => (
									<li key={ad.id}>
										<Link href={`/addons/${ad.id}`}> {ad.name}</Link>
									</li>
								))}
							</ul>
						</Card>
					)}
					{addons.length > 0 && (
						<Card>
							<h2 id="locations"> Locations </h2>
							<p className="sub-text">available for this package</p>
							<ul>
								{locations?.map((item) => (
									<li key={item.id}>
										<Link href={`/locations/${item.id}`}> {item.name}</Link>
									</li>
								))}
							</ul>
						</Card>
					)}
				</Flex>
			</footer>
		</main>
	)
}

const QUERY = `
  id
  name
  status
  description {
    document
  } 
  price
  image
  durationInHours
  buisnessHourOpen
  buisnessHourClosed
  buisnessDays
  addons {
    id
    name
  }
  locations {
    id
    name
  }
  author {
    id
    email
  }
  categories {
    id
    name
  }
  tags {
    id
    name
  }
`
