import { BlockRender } from "@components/blocks/BlockRender"
import { IconLink } from "@components/elements/IconLink"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { CallbackLink } from "@components/menus/CallbackLink"
import { DialogPopup } from "@components/menus/DialogPopup"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { AddTicketButton } from "@components/tickets/AddTicketButton"
import { TicketForm } from "@components/tickets/TicketForm"
import { AddToCalendar } from "@components/widgets/AddToCalendar"
import type {  User  } from "@ks/types"
import { isEmptyDocument } from "@lib/contentHelpers"
import {
	datePrettyLocal,
	datePrettyLocalDay,
	datePrettyLocalTime,
} from "@lib/dateFormatter"
import { fetchEvent } from "@lib/fetchdata/fetchEvent"
import moneyFormatter from "@lib/moneyFormatter"
import { plainObj } from "@lib/utils"
import styleProduct from "@styles/ecommerce/productSingle.module.css"
import styles from "@styles/events/event.module.css"
import {
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Session } from "next-auth";
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { event, error } = await fetchEvent(id, QUERY_EVENT, session)
  
	if (!event || error)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESCRIPTION,
		}

	const { summary, excerpt, image, tags, hosts } = event
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: summary,
		description: String(excerpt),
		openGraph: {
			images: [String(image), ...previousImages],
			title: summary,
			description: excerpt,
			url: envs.FRONTEND_URL + "/events/" + params.id,
			type: "article",
		},
		keywords: tags?.map((tag) => tag.name).join(", "),
		authors: hosts?.map((host) => ({
			name: host.name,
			email: host.email,
			url: host.email,
		})),
	}
}

type Props = {
	params: {
		id: string
	}
	searchParams: {
		[key: string]: string | string[] | undefined
		q: string | undefined
	}
}

export default async function EventByID({ params }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { event, error } = await fetchEvent(id, QUERY_EVENT, session)

	if (error) return <ErrorPage error={error} />
	if (!event) return notFound()


	const {
		image,
		summary,
		excerpt,
		description,
		tickets = [],
		price,
		start,
		end,
		seats,
		hosts,
		cohosts,
		location,
		categories,
		tags,
    status
	} = event

	async function onClose() {
		"use server"
		console.log("modal closed")
	}

	async function onOk() {
		"use server"
		console.log("ok clicked closed")
	}

	return (
		<main className={page_layout}>
			<DialogPopup title={summary} onClose={onClose} onOk={onOk} buttonLabel="">
				<p>{datePrettyLocal(start, "full")}</p>
				{session ? (
					<TicketForm event={plainObj(event)} user={session.user as User} />
				) : (
					// <p>debug form</p>
					<p>
						must have an account to order tickets and redeem tickets.
						<CallbackLink>Login</CallbackLink>or{" "}
						<Link href={`/register`}> Create an Account </Link>
					</p>
				)}
			</DialogPopup>

			<article
				className={[styleProduct.product, page_content, layout_site].join(" ")}
			>
				<header className={"sticky"}>
					<div className="container">
						<picture className={styles.featured}>
							<ImageDynamic photoIn={image} priority={true}/>
						</picture>

						<AddToCalendar summary={summary} start={start} end={end} />

						<hr />
						<ul className="categories">
							{categories?.map((cat) => (
								<li key={cat.id}>
									<Link href={`/posts/search?categories=${cat.id}`}>
										{" "}
										{cat.name}{" "}
									</Link>
								</li>
							))}
						</ul>

						<ul className="tags">
							{tags?.map((tag) => (
								<li key={tag.id}>
									<Link href={`/posts/search?tags=${tag.id}`}>
										{" "}
										{tag.name}{" "}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</header>

				<div className={""}>
					<h1>{summary}</h1>

					<div
						className="info-cont"
						style={{
							display: "grid",
							alignContent: "center",
							height: "100%",
						}}
					>
						<ul className="meta unstyled padding-0">
							<li>{datePrettyLocalDay(start || "")}</li>
							<li>{datePrettyLocalTime(start || "")}</li>
							{/* <li> capacity: {seats}</li> */}
							{location && (
								<li>
									<Link href={`/locations/${location.id}`}>
										<address>
											{location?.name}
											<br />
											{location?.address}
										</address>
									</Link>
								</li>
							)}
						</ul>
					</div>

					<Card>
						<Flex justifyContent={"space-between"} alignItems={"center"}>
							{price > 0 ? (
								<span style={{ alignContent: "center" }}>
									{moneyFormatter(price)} per Ticket
								</span>
							) : (
								<span style={{ alignContent: "center" }}>RSVP</span>
							)}
              

							{!session ? (
								<CallbackLink>Login to Purchase</CallbackLink>
							) : session?.data.role === null ? (
								<VerifyEmailCard email={session.user.email} />
							) : (
								<AddTicketButton date={start} status={status}/>
							)}
						</Flex>
					</Card>
					{!isEmptyDocument(description?.document) && (
						<>
							<br />
							<h3 className={"thick-underline-text"}>About</h3>
							<br />

							<BlockRender document={description?.document} />
						</>
					)}
				</div>
			</article>
			<footer>
				{/* //todo have multiple hosts */}
				{/* {session && (host?.id === session.id || session.isAdmin) && ( */}
				{canViewHostPanel([...hosts, ...cohosts], session) && (
					<section className={layout_wide}>
						<Card>
							<h2> Host Panel </h2>

							<h3>Hosts</h3>
							<ul>
								{hosts?.map((host) => (
									<li key={host?.id}>
										<Link href={`/users/${host?.id}`}>
											{" "}
											{host?.name} | {host?.email}{" "}
										</Link>
									</li>
								))}
							</ul>

							<IconLink
								icon={"edit"}
								href={envs.CMS_URL + `/events/${id}`}
								className="button medium"
							>
								<span>Edit Event Details</span>
							</IconLink>

							<hr />

							<h3>Edit Attendees</h3>
							<div style={{ position: "relative" }}>
								<p> feature coming soon...</p>
								{/* <SearchUserTicket  eventId={id} setIsPopup={setIsPopup} setPickedUser={setPickedUser} setTicketPopupData={setTicketPopupData}/> */}
							</div>

							<h3>All Ticket Holders</h3>
							<p> feature coming soon...</p>
							{/* <AttendeeTable event={data.event} className="display-none" /> */}
							{/* <TicketsList tickets={tickets} key={animTrig} setPopupData={setTicketPopupData}/> */}
						</Card>
					</section>
				)}
			</footer>
		</main>
	)
}

function canViewHostPanel(allHosts: User[], session: Session | null) {
	if (!session) return false
	if (session.data?.role?.canManageEvents) return true
	if (allHosts?.map((host) => host.id).includes(session.itemId)) return true
	return false
}

const QUERY_EVENT = `
  excerpt
  end
  id
  price
  seats
  start
  status
  summary
  dateCreated
  dateModified
  categoriesCount
  tagsCount
  ticketsCount
  categories {
    id
    name
  }
  hosts {
    id
    email
    name
  }
  cohosts {
    id
    email
    name
  }
  image
  description {
    document
  }
  location {
    address
    name
    id
  }
  tags {
    id
    name
  }
  
  tickets{
    id
    status
    holder {
      id
      name
      email
    }
    event{
      id
      summary
    }
  }
`
