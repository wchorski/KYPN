import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { InfoCard, InfoCardList } from "@components/blocks/InfoCardList"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { List } from "@components/elements/List"
import { NoData } from "@components/elements/NoData"
import { Card } from "@components/layouts/Card"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Addon, Service } from "@ks/types"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { layout_site, page_layout } from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Services | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function ServicesPage({ params, searchParams }: Props) {
  const session = await getServerSession(nextAuthOptions)
	const { services, addons, error } = await fetchServicesAndAddons({session})

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1> Services </h1>
			</header>
			<div className={layout_site}>
				<Content services={services} addons={addons} />
			</div>
		</main>
	)
}

// grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));

type Content = {
	services?: Service[]
	addons?: Addon[]
}

function Content({ services, addons }: Content) {
	const infocardServices: InfoCard[] | undefined = services?.map((serv) => ({
    id: serv.id,
		header: serv.name,
		content: serv.excerpt,
		buttonLink: `/services/${serv.id}`,
		buttonLabel: "View Package",
		imageSrc: serv.image,
    statusType: {
      type: 'service',
      status: serv.status
    }
	}))

	const infocardAddons: InfoCard[] | undefined = addons?.map((add) => ({
    id: add.id,
		header: add.name,
		content: add.excerpt,
		buttonLink: `/addons/${add.id}`,
		buttonLabel: "more details",
		imageSrc: add.image,
    statusType: {
      type: 'addon',
      status: add.status
    }
	}))

	return (
		<>
			{!services && <NoData name="services" />}
			<InfoCardList items={infocardServices || []} />

      <hr />

			<h2 id="addons"> Add-Ons</h2>
			<InfoCardList items={infocardAddons || []} />
      {!addons && <NoData name="addons" />}
		</>
	)
}
