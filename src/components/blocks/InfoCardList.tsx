import { ImageDynamic } from "@components/elements/ImageDynamic"
import type { StatusType } from "@components/StatusBadge"
import { StatusBadge } from "@components/StatusBadge"
import { featured_image } from "@styles/articles.module.css"
import {
	carditem,
	cardlist,
	content_wrap,
	statusBadge,
} from "@styles/blocs/infocard.module.css"
import Link from "next/link"
import type { ReactNode } from "react"

export type InfoCard = {
	id: string
	header: string
	content?: string | ReactNode
	children?: ReactNode
	buttonLink: string
	buttonLabel: string
	imageSrc: string
	statusType?: StatusType
}

type Props = {
	items: InfoCard[]
}

export function InfoCardList({ items }: Props) {
	return (
		<ul className={cardlist} style={{ gridColumn: "layout_site" }}>
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
	const { statusType, buttonLabel, buttonLink, id, imageSrc, content, header } =
		item

	return (
		<article className={carditem}>
			{statusType?.status !== "PUBLIC" && (
				<div className={statusBadge}>
					<StatusBadge
						type={statusType?.type || "any"}
						status={statusType?.status}
					/>
				</div>
			)}
			{buttonLink ? (
				<Link href={buttonLink}>
					<figure className={featured_image}>
						<ImageDynamic photoIn={imageSrc} key={id} />
					</figure>
				</Link>
			) : (
				<figure className={featured_image}>
					<ImageDynamic photoIn={imageSrc} key={id} />
				</figure>
			)}

			<header>
				<h3>{header}</h3>
			</header>

			<div className={content_wrap}>
				{content}
				{children}

				{buttonLink && (
					<Link
						href={buttonLink}
						className="button medium"
						style={{ marginLeft: "auto" }}
					>
						{buttonLabel || "view"}
					</Link>
				)}
			</div>
		</article>
	)
}
