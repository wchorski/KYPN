import type { InfoCard} from "@components/blocks/InfoCardList";
import { InfoCardList } from "@components/blocks/InfoCardList"
import { ArticleList } from "@components/layouts/ArticleList"
import ErrorPage from "@components/layouts/ErrorPage"
import { Pagination } from "@components/Pagination"
import type {  Addon, Product, Service, SubscriptionPlan  } from "@ks/types"
import fetchProducts from "@lib/fetchdata/fetchProducts"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import fetchSubscriptonPlans from "@lib/fetchdata/fetchSubscriptonPlans"
import { layout_site, page_layout } from "@styles/layout.module.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export const metadata: Metadata = {
	title: "Shop | " + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

type Props = {
	params: {
		page: string | string[] | undefined
	}
	searchParams: {
		[key: string]: string | string[] | undefined
		categories: string | undefined
		page: string | undefined
	}
}

export default async function ShopPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { page } = await searchParams
	const currPage = Number(page) || 1
	const { services, addons, error } = await fetchServicesAndAddons({ session })
	const {
		products,
		error: errorProducts,
		count: productsCount,
	} = await fetchProducts({
		session,
		query,
	})
	const {
		subscriptionPlans,
		error: subErrors,
		count: subsCount,
	} = await fetchSubscriptonPlans({
		session,
		query: query_subs,
		page: currPage,
	})

	if (error || errorProducts || subErrors)
		return <ErrorPage error={error || errorProducts || subErrors} />
	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1> Shop </h1>
			</header>
			<div className={layout_site}>
				<Content
					services={services}
					addons={addons}
					products={products}
					subscriptionPlans={subscriptionPlans}
					subsCount={subsCount}
					productsCount={productsCount}
					currPage={currPage}
				/>
			</div>
		</main>
	)
}

// grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));

type Content = {
	services?: Service[]
	subscriptionPlans?: SubscriptionPlan[]
	addons?: Addon[]
	products?: Product[]
	productsCount?: number
	subsCount?: number
	currPage?: number
}

function Content({
	services = [],
	addons = [],
	products = [],
	subscriptionPlans = [],
	productsCount = 0,
	subsCount = 0,
	currPage = 1,
}: Content) {
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

	return (
		<>
			{products.length > 0 && (
				<section style={{marginBottom: '20vh'}}>
					<h2 id="products">Products</h2>
					<ArticleList items={products} type={"product"} buttonText={"view"} />
					<Pagination route="/products" page={currPage} count={productsCount} />
				</section>
			)}
			{subscriptionPlans.length > 0 && (
				<section style={{marginBottom: '20vh'}}>
					<h2 id="subscription-plans">Subscription Plans</h2>
					<ArticleList
						items={subscriptionPlans}
						type={"subscriptionPlan"}
						buttonText="view more"
					/>
					<Pagination
						route="/subscription-plans"
						page={currPage}
						count={subsCount}
					/>
				</section>
			)}

			{services.length > 0 && (
				<section style={{marginBottom: '20vh'}}>
					<h2 id="services">Services</h2>
					<ArticleList items={services} type={"service"} />
					<Pagination
						route="/services"
						page={currPage}
						count={services.length}
					/>
				</section>
			)}
			{addons.length > 0 && (
				<section className={'mvh-m'}>
					<hr />
					<h2 id="addons">Add-Ons</h2>
					<InfoCardList items={infocardAddons || []} />
					<Pagination route="/addons" page={currPage} count={addons.length} />
				</section>
			)}
		</>
	)
}

const query_subs = `
  id
  typeof
  image
  name
  slug
  excerpt
  status
  price
  billing_interval
  stockMax
  dateCreated
  dateModified
`

const query = `
  id
  typeof
  image
  name
  slug
  excerpt
  status
  isForSale
  price
  isForRent
  rental_price
  stockCount
  dateCreated
  dateModified
`
