import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { InfoCard, InfoCardList } from "@components/blocks/InfoCardList"
import { NoData } from "@components/elements/NoData"
import { Addon, Product, Service } from "@ks/types"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { layout_site, page_layout } from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
	title: "Shop | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function ShopPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { services, addons, error } = await fetchServicesAndAddons({ session })

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1> Shop </h1>
			</header>
			<div className={layout_site}>
				<Content services={services} addons={addons} products={[]}/>
			</div>
		</main>
	)
}

// grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));

type Content = {
	services?: Service[]
	addons?: Addon[]
	products?: Product[]
}

function Content({ services = [], addons = [], products = [] }: Content) {
	const infocardServices: InfoCard[] | undefined = services?.map((serv) => ({
		id: serv.id,
		header: serv.name,
		content: serv.excerpt,
		buttonLink: `/services/${serv.id}`,
		buttonLabel: "View Package",
		imageSrc: serv.image,
		statusType: {
			type: "service",
			status: serv.status,
		},
	}))

	const infocardAddons: InfoCard[] | undefined = addons?.map((add) => ({
		id: add.id,
		header: add.name,
		content: add.excerpt,
		buttonLink: `/addons/${add.id}`,
		buttonLabel: "more details",
		imageSrc: add.image,
		statusType: {
			type: "addon",
			status: add.status,
		},
	}))

	const infocardProducts: InfoCard[] | undefined = products?.map((item) => ({
		id: item.id,
		header: item.name,
		content: item.excerpt,
		buttonLink: `/products/${item.id}`,
		buttonLabel: "more details",
		imageSrc: item.image,
		statusType: {
			type: "product",
			status: item.status,
		},
	}))

	return (
		<>
			{products.length > 0 && (
				<>
					<h2 id="products">Products</h2>
					<InfoCardList items={infocardProducts || []} />
				</>
			)}
			{services.length > 0 && (
				<>
					<h2 id="services">Services</h2>
					<InfoCardList items={infocardServices || []} />
				</>
			)}
			{addons.length > 0 && (
				<>
					<hr />
					<h2 id="addons">Add-Ons</h2>
					<InfoCardList items={infocardAddons || []} />
				</>
			)}
		</>
	)
}
