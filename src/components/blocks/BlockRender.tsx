import { ButtonLink } from "@components/blocks/ButtonLink"
import { Callout } from "@components/blocks/Callout"
import { Carousel } from "@components/blocks/Carousel"
import { ContactForm } from "@components/blocks/ContactForm"
import { HeadingBlock } from "@components/blocks/HeadingBlock"
import { Hero } from "@components/blocks/Hero"
import { IFrame } from "@components/blocks/IFrame"
import { ImageBlock } from "@components/blocks/ImageBlock"
import { ImageGallery } from "@components/blocks/ImageGallery"
import { ImageLinkList } from "@components/blocks/ImageLinkList"
import { InfoCard } from "@components/blocks/InfoCard"
import { InfoCardList } from "@components/blocks/InfoCardList"
import { MediaText } from "@components/blocks/MediaText"
import { Paragraph } from "@components/blocks/ParagraphBlock"
import { PostsList } from "@components/blocks/PostsList"
import { Quote } from "@components/blocks/Quote"
import SliderSlick from "@components/blocks/SliderSlick"
import { SocialLinkNav } from "@components/blocks/SocialLinkNav"
import { Table } from "@components/blocks/Table"
import { Tweet } from "@components/blocks/Tweet"
import { VideoLocal } from "@components/blocks/VideoLocal"
import { YouTubeVideo } from "@components/blocks/YouTubeVideo"
// import styles from '@styles/blocs/blockrenderer.module.scss'
import { Card } from "@components/layouts/Card"
import { Grid } from "@components/layouts/Grid"
import type {
	DocumentRendererProps} from "@keystone-6/document-renderer";
import {
	DocumentRenderer
} from "@keystone-6/document-renderer"
import type {  GridLayout  } from "@ks/types"
import { getColorTheme } from "@lib/styleHelpers"
import {
	layout_content,
	layout_full,
	layout_wide,
} from "@styles/layout.module.css"
import type { ComponentProps} from "react";
import { Fragment } from "react"

import { Blockquote } from "./Blockquote"
import { CodeBlock } from "./CodeBlock"

// By default the DocumentRenderer will render unstyled html elements.
// We're customising how headings are rendered here but you can customise
// any of the renderers that the DocumentRenderer uses.
const renderers: DocumentRendererProps["renderers"] = {
	block: {
		// all custom components are block components
		// so they will be wrapped with a <div /> by default
		// we can override that to whatever wrapper we want
		// for eg. using React.Fragment wraps the component with nothing
		// @ts-ignore
		block: Fragment,
		layout: (props) => {
			const propsOverride = {
				...props,
				// todo `nestedBlock` hacky way but it works (fixes difference between editor block vs web dev added)
				layout: props.layout.join("_") as GridLayout,
				isAuto: false,
        style: {marginBlock: '10vh'}
			}
			return <Grid {...propsOverride} />
		},
		//? moving everything to <Grid />
		// layout: (props) => {
		// 	return <BlockLayout {...props} />
		// },
		// customise blockquote elements with your own styles
		blockquote(props) {
			return <Blockquote {...props} />
		},
		// block code ``` ```
		code(props) {
			return <CodeBlock {...props} />
		},
		paragraph(props) {
			return <Paragraph {...props} />
		},
		list(props) {
			if (props.type === "unordered")
				return (
					<ul>
						{props.children.map((child, i) => (
							<li key={i}>{child}</li>
						))}
					</ul>
				)
			return (
				<ol>
					{props.children.map((child, i) => (
						<li key={i}>{child}</li>
					))}
				</ol>
			)
		},
		heading(props) {
			return <HeadingBlock {...props} />
		},
		// paragraph({ children }) {
		//   return <div className={styles.paragraph_wrap}> <p>{children}</p> </div>;
		// },
		// and more - check out the types to see all available block elements
	},
	inline: {
		bold: ({ children }) => {
			return <strong style={{ color: "var(--c-bold)" }}>{children}</strong>
		},
		// inline code ` `
		code: ({ children }) => {
			return <code className={`code`}>{children}</code>
		},
		// and more - check out the types to see all available inline elements
	},
}

type CustomRendererProps = ComponentProps<typeof DocumentRenderer>

const customComponentRenderers: CustomRendererProps["componentBlocks"] = {
	hero: (props) => {
		return <Hero {...props} />
	},
	callout: (props) => {
		return <Callout {...props} />
	},
	quote: (props) => {
		return <Quote {...props} />
	},
	carousel: (props) => {
		return (
			<div className={layout_wide}>
				<Carousel {...props} />
			</div>
		)
	},
	slider: (props) => {
		return <SliderSlick {...props} />
	},
	section: (props) => {
		const propsOverride = {
			...props,
			// todo `nestedBlock` hacky way but it works (fixes difference between editor block vs web dev added)
			// nestedBlock: true,
			layout: "1",
			imageSrc: "",
		}
    const colorThemeStyle = getColorTheme(props.colorTheme)
		return (
			<section
				className={[layout_full, colorThemeStyle].join(' ')}
				style={{
					...(props.imageSrc ? {backgroundImage: `url(${props.imageSrc})`}: {}),
					padding: "var(--space-m)",
          marginBlock: '10vh',
				}}
			>
				<Grid {...props} />
			</section>
		)
		// return <BlockLayout {...propsOverride} />
	},
	iframe: (props) => {
		return <IFrame {...props} />
	},
	postslist: (props) => {
		return <PostsList {...props} />
	},
	card: (props) => {
		return <Card {...props} />
	},
	infocard: (props) => {
		return <InfoCard {...props} />
	},
	infocardlist: (props) => {
		return <InfoCardList {...props} />
	},
	imagelinklist: (props) => {
		return <ImageLinkList {...props} />
	},
	contactform: (props) => {
		return <ContactForm {...props} />
	},
	sociallinknav: (props) => {
		return <SocialLinkNav {...props} />
	},
	mediatext: (props) => {
		return <MediaText {...props} />
	},
	tweet: (props) => {
		return <Tweet {...props} />
	},
	youtubeVideo: (props) => {
		return <YouTubeVideo {...props} />
	},
	videoLocal: (props) => {
		return <VideoLocal {...props} />
	},
	imagegallery: (props) => {
		return <ImageGallery {...props} />
	},
	buttonlink: (props) => {
		return (
			<div className={layout_content}>
				<ButtonLink {...props} />
			</div>
		)
	},
	image: (props) => {
		return <ImageBlock {...props} />
	},
	table: (props) => {
		return <Table {...props} />
	},
}

export function BlockRender({ document }: { document: any }) {
	return (
		<DocumentRenderer
			renderers={renderers}
			componentBlocks={customComponentRenderers}
			document={document}
		/>
	)
	//todo get rid of, no need for the wrapper w new layout css
	// return (
	//   <div className={['block-renderer', styles.blockrenderer].join(' ')}>
	//     <DocumentRenderer
	//       renderers={renderers}
	//       componentBlocks={customComponentRenderers}
	//       document={document}
	//     />
	//   </div>
	// )
}
