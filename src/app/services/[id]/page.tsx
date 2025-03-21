import { BlockRender } from "@components/blocks/BlockRender"
import { ImageBlock } from "@components/blocks/ImageBlock"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { IconLink } from "@components/elements/IconLink"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { Grid } from "@components/layouts/Grid"
import { CategoriesList } from "@components/menus/CategoriesList"
import { StatusBadge } from "@components/StatusBadge"
import { daysOfWeek } from "@lib/dateCheck"
import { timePretty } from "@lib/dateFormatter"
import fetchService from "@lib/fetchdata/fetchService"
import {
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { service, error } = await fetchService({ id, query: QUERY, session })

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
		<main className={page_layout}>
			<Grid
				layout={"1_2"}
				alignContent={"start"}
				style={{ marginTop: "var(--space-xxl)", gridColumn: "layout_wide" }}
				gap={"xl"}
			>
				<header style={{ position: "sticky", top: "var(--space-xxl)" }}>
					<ImageBlock
						imageSrc={image}
						alt={`Featured Image for ${name} Service`}
						isCaption={false}
						isPriority={true}
					/>

					<h1> {name} </h1>

					<Link
						href={`/book-a-service?serviceId=${id}`}
						className="button large"
					>
						Book this Service
					</Link>

					{categories.length > 0 && <CategoriesList categories={categories} />}

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
									href={envs.BACKEND_URL + `/services/${id}`}
									label={"edit"}
								/>
							)}
						</Card>
					)}
				</header>

				<div className={page_content}>
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
									<small className="subtext"> hours </small>{" "}
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
					<Card>
						<BlockRender document={description.document} />
					</Card>
				</div>
			</Grid>
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
