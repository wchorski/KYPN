import Link from "next/link"
import { ReactNode } from "react"
import  {
	carditem,
	cardlist,
	content_wrap,
	statusBadge,
} from "@styles/blocs/infocard.module.css"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { StatusBadge, StatusType } from "@components/StatusBadge"
import { featured_image } from "@styles/articles.module.css"

export type InfoCard = {
  id:string,
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
			{item.statusType?.status !== "PUBLIC" && (
				<div className={statusBadge}>
					<StatusBadge
						type={item.statusType?.type || "any"}
						status={item.statusType?.status}
					/>
				</div>
			)}
      <Link href={`/service/${item.id}`}>
					<figure className={featured_image}>
						<ImageDynamic photoIn={item.imageSrc} key={item.id} />
					</figure>
				</Link>
			
			<header>
				{/* <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure> */}
				<h3>{item.header}</h3>
			</header>

			<div className={content_wrap}>
        <p>
          {item.content}
          {children}
        </p>
				{item.buttonLink && (
					<Link href={item.buttonLink} className="button medium">
						{item.buttonLabel ? item.buttonLabel : "view"}
					</Link>
				)}
			</div>
		</article>
	)
}
