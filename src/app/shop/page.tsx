import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { InfoCard, InfoCardList } from "@components/blocks/InfoCardList"
import { NoData } from "@components/elements/NoData"
import { ArticleList } from "@components/layouts/ArticleList"
import ErrorPage from "@components/layouts/ErrorPage"
import { Pagination } from "@components/Pagination"
import { Addon, Product, Service } from "@ks/types"
import fetchProducts from "@lib/fetchdata/fetchProducts"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { layout_site, page_layout } from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
	title: "Shop | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
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
	const { products, error: errorProducts, count: productsCount } = await fetchProducts({
		session,
		query,
	})

	if (error || errorProducts)
		return <ErrorPage error={error || errorProducts} />
	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1> Shop </h1>
			</header>
			<div className={layout_site}>
				<Content services={services} addons={addons} products={products} productsCount={productsCount} currPage={currPage}/>
			</div>
		</main>
	)
}

// grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));

type Content = {
	services?: Service[]
	addons?: Addon[]
	products?: Product[]
  productsCount?:number
  currPage?:number
}

function Content({ services = [], addons = [], products = [], productsCount: productsCount = 0, currPage = 1 }: Content) {


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
				<>
					<h2 id="products">Products</h2>
					{/* <InfoCardList items={infocardProducts || []} /> */}
          <ArticleList items={products} type={'product'}/>
          <Pagination route="/products" page={currPage} count={productsCount} />
				</>
			)}
			{services.length > 0 && (
				<>
					<h2 id="services">Services</h2>
          <ArticleList items={services} type={'service'}/>
					<Pagination route="/services" page={currPage} count={services.length} />
				</>
			)}
			{addons.length > 0 && (
				<>
					<hr />
					<h2 id="addons">Add-Ons</h2>
					<InfoCardList items={infocardAddons || []} />
          <Pagination route="/addons" page={currPage} count={addons.length} />
				</>
			)}
		</>
	)
}

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