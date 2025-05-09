import { image_caption, image_wrap } from "@styles/image.module.css"
import Image from "next/image"
import { type CSSProperties } from "react"

type Props = {
	color?: string
	padding?: number
	border?: number
	imageSrc: string
	alt: string
	width?: number|`${number}`
	height?: number|`${number}`
	isCaption?: boolean
	isPriority?: boolean
}
//todo add lightbox
export function ImageBlock({
	// color,
	imageSrc,
	alt,
	// padding = 0,
	// border = 0,
	width = 400,
	height = 200,
	isCaption = true,
	isPriority = false,
}: Props) {
	return (
		<figure className={image_wrap}>
			<Image
				alt={alt}
				src={imageSrc}
				sizes={"100vw"}
				width={width}
				height={height}
				unoptimized={true}
				priority={isPriority}
			/>
			<figcaption
				className={[image_caption, "sub-text"].join(" ")}
				style={
					{
						"--display-caption": isCaption ? "visible" : "collapse",
					} as CSSProperties
				}
			>
				{alt}
			</figcaption>
		</figure>
	)
}
// img.full-width {
//   width: 100%;
//   max-height: 45vh;
//   object-fit: cover;
// }
