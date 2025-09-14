import {
	carousel_container,
	carousel_item,
	carousel_track,
	image_overlay,
} from "@styles/blocs/imageCarouselAutoScroll.module.css"
import Image from "next/image"
import type { CSSProperties } from "react"
type Props = {
	items: {
		title?: string
		alt: string
		src: string
	}[]
	hideCaptions?: boolean
	aspectRatio?: number
	trackHight?: string
	scrollSpeed?: string
}

export function ImageCarouselAutoScroll({
	items,
	hideCaptions = true,
  //TODO add aspect ratio feature
	// aspectRatio = 1.5,
  // ex: `30vh`, `400px`
	trackHight,
  // ex: `10s`, `1000ms`
	scrollSpeed = "30s",
}: Props) {
	return (
		<div
			className={carousel_container}
			style={
				{
					"--track-height": trackHight,
					"--scroll-speed": scrollSpeed,
				} as CSSProperties
			}
		>
			<div className={carousel_track}>
				{items.map((item, i) => (
					<div className={carousel_item} key={i}>
						<Image
							src={item.src}
							alt={item.alt}
							priority={i < 4} // Prioritize first few images
							fill
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 50vw, 33vw"

							// width={240}
							// height={160}
							// style={{ objectFit: "cover" }}
							// placeholder="blur"
							// blurDataURL="data:image/jpeg;base64,..." // Add a blur placeholder
						/>
						{hideCaptions ? null : item.title ? (
							<div className={image_overlay}>{item.title}</div>
						) : null}
					</div>
				))}
				{/* Duplicate set for seamless loop */}
				{items.map((item, i) => (
					<div className={carousel_item} key={`duplicate-${i}`}>
						<Image
							src={item.src}
							alt={item.alt}
							fill
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 50vw, 33vw"
							// width={240}
							// height={160}
							// style={{ objectFit: "cover" }}
						/>
						{hideCaptions ? null : item.title ? (
							<div className={image_overlay}>{item.title}</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	)
}
