import Link from "next/link"
import { ReactNode } from "react"
import styles, {
	carditem,
	cardlist,
	content_wrap,
} from "@styles/blocs/infocard.module.scss"
import { ImageDynamic } from "@components/elements/ImageDynamic"

export type InfoCard = {
	header: string
	content?: string | ReactNode
	children?: ReactNode
	buttonLink: string
	buttonLabel: string
	imageSrc: string
	color: string
}

type Props = {
	items: InfoCard[]
}

export function InfoCardList({ items }: Props) {
	return (
		<ul className={cardlist}>
			{items.map((item, i) => (
				<li key={i}>
					<InfoCardItem item={item} />
				</li>
			))}
		</ul>
	)
}

export function InfoCardItem({
	item,
	children,
}: {
	item: InfoCard
	children?: ReactNode
}) {
	return (
		<article className={carditem}>
			<ImageDynamic photoIn={item.imageSrc} />
			<header>
				{/* <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure> */}
				<h3>{item.header}</h3>
			</header>

			<div className={content_wrap}>
				{item.content}
				{children}
				{item.buttonLink && (
					<Link href={item.buttonLink} className="button medium">
						{item.buttonLabel ? item.buttonLabel : "view"}
					</Link>
				)}
			</div>
		</article>
	)
}
