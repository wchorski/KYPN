import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { List } from "@components/elements/List"
import { Card } from "@components/layouts/Card"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Addon } from "@ks/types"
import fetchAddon from "@lib/fetchdata/fetchAddon"
import {
  layout_breakout,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params
  const session = await getServerSession(nextAuthOptions)
	const { addon, error } = await fetchAddon({id, session, query: QUERY})

	return {
		title: addon?.name + " | " + envs.SITE_TITLE,
		description: envs.SITE_DESC,
	}
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function AddonByIdPage({ params, searchParams }: Props) {
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

	const { name, excerpt, price, image, services, categories, tags } = addon

	return (
		<main className={page_layout}>
      <header style={{marginTop: '5rem', display: 'grid'}}>
        <Flex className={layout_breakout} alignItems={'center'}>
          <h1 style={{width: '50%'}}> Addon: {name} </h1>
          <ImageDynamic photoIn={image} />
        </Flex>
			</header>
			<div className={page_content}>
				<section className={layout_wide}>
					<PriceTag price={price} />
					<Card>
						<p> {excerpt} </p>
					</Card>

					<p>
						<Link href={`/services#addons`}> Other Addons </Link>
					</p>
				</section>
        <hr />
				<section className={layout_wide}>
					<h2> Related Services </h2>
					<List>
						{services?.map((serv) => (
							<div key={serv.id}>
								<Link href={`/services/${serv.id}`}>{serv.name}</Link>
							</div>
						))}
					</List>

					<Link href={`/bookings`} className="button large">
						{" "}
						Book a Service{" "}
					</Link>
				</section>
			</div>
		</main>
	)
}

const QUERY = `
  id
  name
  excerpt
  price
  image
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
`
