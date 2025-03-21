import AddToCartForm from "@components/ecommerce/AddToCartForm"
import { PriceTag } from "@components/ecommerce/PriceTag"
import { StatusBadge } from "@components/StatusBadge"
// import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import type {  Product  } from "@ks/types"
import styles from "@styles/ecommerce/product.module.css"
import Link from "next/link"
import React from "react"

import { envs } from "@/envs"

import { ImageDynamic } from "../elements/ImageDynamic"

type Props = {
	product: Product
	session: any
}

export async function ProductThumbnail({
	product,
	session,
}: Props) {
	// const sesh:Session = {}

	if (!product) return <p> no prod </p>

	const {
		id,
		name,
		excerpt,
		price,
		rental_price,
		image,
		status,
		isForSale,
		isForRent,
	} = product

	return (
		<article className={styles.product}>
			{(status === "DRAFT" || status === "PRIVATE") && (
				<StatusBadge type={"product"} status={status} />
			)}
			{/* <StatusBadge type={'product'} status={status} /> */}

			{status === "OUT_OF_STOCK" && <p>out of stock</p>}
			<Link href={`/shop/products/${id}`} className="featured_image">
				<ImageDynamic photoIn={image} />
			</Link>

			<div className="container">
				<Link href={`/shop/products/${id}`} className="title">
					<h3>{name}</h3>
				</Link>

				<p className="desc">{excerpt}</p>

				<div className="menu">
					{session ? (
						status !== "OUT_OF_STOCK" ? (
							<>
								{isForSale && (
									<div className="addtocart_wrap">
										<AddToCartForm
											productId={id}
											sessionId={session.itemId}
											type={"SALE"}
											eventId={undefined}
											subscriptionPlanId={undefined}
										/>
										<PriceTag price={price} />
									</div>
								)}
								{isForRent && (
									<div className="addtocart_wrap">
										<AddToCartForm
											productId={id}
											sessionId={session.itemId}
											type={"RENTAL"}
											eventId={undefined}
											subscriptionPlanId={undefined}
										/>
										<PriceTag price={rental_price} subtext={"/day"} />
									</div>
								)}
							</>
						) : (
							<button disabled={true}> out of stock </button>
						)
					) : (
						<Link href={`/login`}> Login to shop </Link>
					)}
				</div>
			</div>

			{session?.data?.role?.canManageProducts && (
				<div className="menu admin">
					<Link href={envs.CMS_URL + `/products/${id}`} target={"_blank"}>
						{" "}
						Edit ✏️{" "}
					</Link>
					{/* <ProductDelete id={id}> Delete </ProductDelete> */}
				</div>
			)}
		</article>
	)
}
