import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { PageTMain } from "@components/layouts/PageTemplates"
import { Event, Tag, User } from "@ks/types"
import {
	datePrettyLocal,
	datePrettyLocalDay,
	datePrettyLocalTime,
} from "@lib/dateFormatter"
import { fetchEvent } from "@lib/fetchdata/fetchEvent"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession, Session } from "next-auth"
import Link from "next/link"
import { RiFileEditFill } from "react-icons/ri"
import styleProduct from "@styles/ecommerce/productSingle.module.scss"
import { BlockRender } from "@components/blocks/BlockRender"
import { AddTicketButton } from "@components/tickets/AddTicketButton"
import { Card } from "@components/layouts/Card"
import { TicketForm } from "@components/tickets/TicketForm"
import styles from "@styles/events/event.module.css"
import { AddToCalendar } from "@components/widgets/AddToCalendar"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { plainObj } from "@lib/utils"
import {
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import { DialogPopup } from "@components/menus/Dialog"
import moneyFormatter from "@lib/moneyFormatter"
import { IconEditPagePencile } from "@lib/useIcons"
import { IconLink } from "@components/elements/IconLink"
import { isEmptyDocument } from "@lib/contentHelpers"
import Flex from "@components/layouts/Flex"
// import { AddToCalendarButton } from "add-to-calendar-button-react";

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { event, error } = await fetchEvent(id, QUERY_EVENT, session)

	if (!event)
		return {
			title: envs.SITE_TITLE,
			description: envs.SITE_DESC,
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
		keywords: tags?.map((tag: Tag) => tag.name).join(", "),
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

	if (error) return <ErrorMessage error={error} />
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
						<Link href={`/login`}> Login </Link> or{" "}
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
							<ImageDynamic photoIn={image} />
						</picture>

						<AddToCalendar summary={summary} start={start} end={end} />

						<hr />
						<ul className="categories">
							{categories?.map((cat) => (
								<li key={cat.id}>
									<Link href={`/blogs/search?categories=${cat.id}`}>
										{" "}
										{cat.name}{" "}
									</Link>
								</li>
							))}
						</ul>

						<ul className="tags">
							{tags?.map((tag) => (
								<li key={tag.id}>
									<Link href={`/blogs/search?tags=${tag.id}`}>
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
								<span style={{ alignContent: "center" }}> Free </span>
							)}

							{!session ? (
								<Link href={"/login"} className="button medium">
									Login to Purchase
								</Link>
							) : session?.data.role !== null ? (
								<VerifyEmailCard email={session.user.email} />
							) : (
								<AddTicketButton date={start} />
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
								href={envs.BACKEND_URL + `/events/${id}`}
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
  categories {
    id
    name
  }
  categoriesCount
  dateCreated
  dateModified
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
  excerpt
  end
  id
  location {
    address
    name
    id
  }
  price
  seats
  start
  status
  summary
  tags {
    id
    name
  }
  tagsCount
  ticketsCount
  tickets{
    id
    status
    qrcode
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
