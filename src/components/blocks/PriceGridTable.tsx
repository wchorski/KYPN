//* work around for document data that doesn't hydrate on first fetch
import { PriceTag } from "@components/ecommerce/PriceTag"
import { keystoneContext } from "@ks/context"
import type { Service } from "@ks/types"
import { getColorTheme } from "@lib/styleHelpers"
import styles from "@styles/blocs/pricetable.module.css"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { formatHours } from "../../lib/dateFormatter"

type Props = {
	items: {
		title: string
		imageSrc: string
		buttonLink: string
		buttonLabel: string
		content: ReactNode
		price: number
		service: {
			id: string
			name: string
			image: string
			price: number
			durationInHours: string
		}
		//! used to nest data into object when hydrated from first fetch
		//! now I have to seperately hydrate `Services` with query
		// service: {
		// 	data?: {
		// 		id: string
		// 		name: string
		// 		price: number
		// 		durationInHours: string
		// 	}
		// }
	}[]
}

export async function PriceGridTable({ items = [] }: Props) {
	const serviceIds = items.flatMap((item) =>
		item.service.id ? [item.service.id] : []
	)

	const services = (await keystoneContext.query.Service.findMany({
		where: {
			id: {
				in: serviceIds,
			},
		},
		query: `
      id
      name
      price
      image
      durationInHours
    `,
	})) as Service[]

	function getService(id: string | undefined) {
		return services.find((serv) => serv.id === id)
	}

	// @ts-ignore
	const itemsHydrated = items.map((item) => ({
		...item,
		service: { data: getService(item.service.id) },
	})) as Props["items"]

	// console.log(items[0].service.data?.name)

	return (
		<div className={styles.pricetable}>
			{itemsHydrated.map((item, i) => {
				const { imageSrc, content } = item
				//@ts-ignore
				const service = item.service.data
				if (!service) return <article key={i}>service not found</article>
				return (
					<article key={i}>
						<Link href={`/services/${service.id}`}>
							<header>
								{/* <figure style={{ backgroundImage: `url(${imageSrc || service.image})` }}></figure> */}
								<figure>
									<Image
										src={
											imageSrc ||
											service.image ||
											"/assets/placeholder.png"
										}
										alt={`featured product image for ${service.name}`}
										fill={true}
										// width={300}
										// height={300}
									/>
								</figure>
								<h3>{item.title || service.name}</h3>
							</header>
						</Link>

						<div className={styles.content}>{content}</div>

						<footer className={getColorTheme("bg_c_primary")}>
							{/* <span className="price">
								{moneyFormatter(service.price)}
							</span> */}
							<PriceTag price={service.price} hideZeroCents={true} />
							<span>
								{formatHours(service.durationInHours || "0")}{" "}
								<small> hours</small>
							</span>
							<Link
								href={
									item.buttonLink || `/book-a-service?serviceId=${service.id}`
								}
								className="button medium"
							>
								{item.buttonLabel || "Book Now"}
							</Link>
						</footer>
					</article>
				)
			})}
		</div>
	)
}
