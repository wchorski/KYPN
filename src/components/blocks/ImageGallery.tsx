"use client"
// import LightGallery from 'lightgallery/react';

// import styles
//TODO bring back the light box
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';

// // If you want you can use SCSS instead of css
// import 'lightgallery/scss/lightgallery.scss';
// import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
import styles, { gallery } from "@styles/blocs/imagegallery.module.scss"
import type { CSSProperties} from "react";

type Image = {
	src: string
	alt: string
	caption?: string
	objFit?: CSSProperties['objectFit']
}

type Props = {
	items: Image[]
	layout: "grid" | "masonry"
	columns: number
	objectFit: CSSProperties['objectFit']
	gap: number
}

const myimages: Image[] = [
	{
		src: "https://th.bing.com/th/id/R.c09c354faa5f17c199e4f4d27d63bb7b?rik=hYCgU%2bv8H2%2bsjg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-NWcfOoCuhZY%2fUAfq3MHXvuI%2fAAAAAAAABco%2fMKBOeeRqMrs%2fs1600%2fkirby%2bface%2bwallpaper%2bbackground%2bhal%2blaboratory%2bnintendo%2bplatform%2bgame.jpg&ehk=HE0Qz7HXz1QNkWkJ%2fQk6ewWBCKl9W3gcUMTbjrttDA0%3d&risl=&pid=ImgRaw&r=0",
		alt: "pic 1",
	},
	{
		src: "https://th.bing.com/th/id/OIP.N8y2gkY-MhENltDIh_fPfwHaHX?pid=ImgDet&rs=1",
		alt: "pic 2",
	},
	{
		src: "https://th.bing.com/th/id/OIP.aFx_ZGCAhvE8Swmv_dPFwAHaHM?pid=ImgDet&w=1200&h=1166&rs=1",
		alt: "pic 3",
	},
	{
		src: "https://th.bing.com/th/id/OIP.jJHUYRSN6WuJI_JsZfWocQHaCv?pid=ImgDet&rs=1",
		alt: "pic 4",
	},
	{
		src: "https://th.bing.com/th/id/R.b73b2ae10184dd2484bdf3ba81c48ab0?rik=AHW0SdB9ttO1JQ&pid=ImgRaw&r=0",
		alt: "pic 4",
	},
	{
		src: "https://th.bing.com/th/id/OIP.q7AREc6LYsBJEWq0xOED2wHaGJ?pid=ImgDet&rs=1",
		alt: "pic 4",
	},
	{
		src: "https://th.bing.com/th/id/R.76fa56783c970d385b11eceaa37c73de?rik=0LuNfLkG32OvFA&riu=http%3a%2f%2fcdn02.nintendo-europe.com%2fmedia%2fimages%2f10_share_images%2fportals_3%2fH2x1_Kirby_Hub_V2_image1280w.jpg&ehk=58rbuG81YddPzFemc3A2pkbpS%2bUuyshbu0cHEpw40js%3d&risl=&pid=ImgRaw&r=0",
		alt: "pic 4",
	},
	{
		src: "https://i.redd.it/alpxh3xzwu011.jpg",
		alt: "pic 4",
	},
	{
		src: "https://th.bing.com/th/id/OIP.Hz7kW3DIfsQE3EtR5CYMZgAAAA?pid=ImgDet&w=460&h=588&rs=1",
		alt: "pic 4",
	},
]

export function ImageGallery(props: Props) {
	let {
		gap = 3,
		items = myimages,
		columns = 3,
		objectFit = "cover",
		layout = "grid",
	} = props

	// const lightGallery = useRef<any>(null);

	// const onInit = useCallback((detail:any) => {
	//   if(detail) lightGallery.current = detail.instance;

	// }, [])

	// useEffect(() => {
	//   lightGallery.current.refresh();
	// }, [items]);

	const colName = `col_${columns}`
	const gapName = `gap_${gap}`

	if (items.length > 0)
		return (
			<div
				className={[
					"gallery",
					// @ts-ignore
					styles[colName],
					// @ts-ignore
					styles[gapName],
					styles[layout],
					gallery,
				].join(" ")}
			>
				{items.map((img, i) => (
					<ImageFrame
						src={img.src}
						alt={img.alt}
						objFit={objectFit}
						caption={img.caption}
						key={i}
					/>
				))}
			</div>
		)

	return null
}
// todo try using Lightbox gallery again?
/* <LightGallery
  onInit={onInit}
  speed={500}
  plugins={[lgThumbnail, lgZoom]}
  elementClassNames={
    [
      styles[`col_${columns}`],
      styles[`gap_${gap}`],
      styles[layout],
      styles.gallery
    ].join(' ')
  }
>
  {items.map((img, i) => (
    <ImageFrame src={img.src} alt={img.alt} objFit={objFit} caption={img.caption} key={i}/>
  ))}
</LightGallery> */

function ImageFrame({ src, alt, caption, objFit }: Image) {
	return (
		<a
			href={src}
			target={"_blank"}
			className="imgframe"
			style={{ overflow: "hidden" }}
			// data-sub-html={renderToHTML(<Caption alt={alt} caption={String(caption)}/>)}>
			data-sub-html={`<p> <strong>${alt}</strong> </p> <p>${caption}</p>`}
		>
			<img alt={alt} src={src} style={{ objectFit: objFit }} />
		</a>
	)
}

// function Caption({alt, caption}:{alt:string, caption:string}){

//   return(
//     <div>
//       <p className="alt">{alt}</p>
//       <p className="caption">{caption}</p>
//     </div>
//   )
// }
