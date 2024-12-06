import Image from "next/image"
import {layout_wide} from '@styles/layout.module.css'
import { image_caption, image_wrap } from "@styles/image.module.scss";

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
			className={image_wrap}
      style={{
        ...(width ? {width} : {})
      }}
		>
			<Image
				alt={alt}
				src={imageSrc}
				sizes={"100vw"}
				width={0}
				height={0}
        unoptimized={true}
			/>
			<figcaption className={[image_caption, 'subtext'].join(' ')} >{alt}</figcaption>
		</figure>
	)
}
// img.full-width {
//   width: 100%;
//   max-height: 45vh;
//   object-fit: cover;
// }
