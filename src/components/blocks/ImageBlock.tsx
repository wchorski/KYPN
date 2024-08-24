import Image from "next/image"
import {layout_wide} from '@styles/layout.module.scss'

type Props = {
	color?: string
	padding?: number
	border?: number
	imageSrc: string
	alt: string
	width?: number
}
//todo add lightbox
export function ImageBlock({
	color,
	imageSrc,
	alt,
	padding = 0,
	border = 0,
	width,
}: Props) {
	return (
		<figure
			className={layout_wide}
			style={{
				margin: "0",
				// maxWidth: "calc(var(--w-contentmax) + var(--space-xxl))",
			}}
		>
			<Image
				className={layout_wide}
				alt={alt}
				src={imageSrc}
				// className={`image block`}
				// layout={'fill'}
				style={{
					width: "100%",
					height: "auto",
					maxHeight: "60vh",
					objectFit: "contain",
					filter: "drop-shadow(var(--shadow-3))",
					// border: "solid 1px var(--c-seperator)",
				}}
				sizes={"100vw"}
				width={0}
				height={0}
				// style={{
				//   width: width ? width : '100%',
				//   objectFit: 'cover',
				//   display: 'block',
				// }}
			/>
			<caption style={{ paddingBlock: "var(--space-ms)" }}>{alt}</caption>
		</figure>
	)
}
// img.full-width {
//   width: 100%;
//   max-height: 45vh;
//   object-fit: cover;
// }
