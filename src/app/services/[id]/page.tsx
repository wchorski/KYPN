import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import fetchService from "@lib/fetchdata/fetchService"
import { Service } from "@ks/types"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { BlockRender } from "@components/blocks/BlockRender"
import { Card } from "@components/layouts/Card"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { List } from "@components/elements/List"
import Link from "next/link"
import { timePretty } from "@lib/dateFormatter"
import { daysOfWeek } from "@lib/dateCheck"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { envs } from "@/envs"
import {
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import ErrorPage from "@components/layouts/ErrorPage"
import { notFound } from "next/navigation"
import { Grid } from "@components/layouts/Grid"
import Flex from "@components/layouts/Flex"

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
			description: envs.SITE_DESC,
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
	console.log({ error })
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
	} = service

	return (
		<main className={page_layout}>
			<header style={{marginTop: '5rem', display: 'grid'}}>
        <Flex className={layout_wide} alignItems={'center'}>
          <h1 style={{width: '50%'}}> Service: {name} </h1>
          <ImageDynamic photoIn={image} />
        </Flex>
			</header>
			<div className={page_content}>
				<section className={layout_site}>
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
								<td> Hours Open: </td>
								<td> {timePretty(buisnessHourOpen || "")} </td>
							</tr>
							<tr>
								<td> Hours Closed: </td>
								<td> {timePretty(buisnessHourClosed || "")} </td>
							</tr>
						</tbody>
					</table>

					<Card>
						<BlockRender document={description.document} />
					</Card>

					<Link href={`/bookings?serviceId=${id}`} className="button large">
						{" "}
						Book this Service{" "}
					</Link>
				</section>
				<section className={layout_site}>
					<h2 id="addons"> Add-Ons </h2>
					<p> A list of add-ons available for this package </p>
					<ul>
						{addons?.map((ad) => (
							<li key={ad.id}>
								<Link href={`/addons/${ad.id}`}> {ad.name}</Link>
							</li>
						))}
					</ul>
				</section>
			</div>
		</main>
	)
}

const QUERY = `
  id
  name
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
  categories {
    id
    name
  }
  tags {
    id
    name
  }
`
