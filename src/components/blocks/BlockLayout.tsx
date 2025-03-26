// import { Section } from "@components/blocks/Section"
import type {  ColorsTheme, GridLayout, WidthLayoutSize2  } from "@ks/types"
import { getColorTheme } from "@lib/styleHelpers"
import {
	layout_full,
	layout_site,
	layout_wide,
} from "@styles/layout.module.css"
import type { ReactNode } from "react"

import { BlockLayout as BlkLayout } from "../../components/layouts/BlockLayout"

type Props = {
	children: ReactNode[]
	layout: number[]
	content?: any
	// color?:string,
	// backgroundColor?:string,
	colorTheme?: ColorsTheme
	paddingBlock?: string
	nestedBlock?: boolean
}

export function BlockLayout(props: Props) {
	// todo `nestedBlock` hacky way but it works (fixes difference between editor block vs web dev added)
	const {
		children,
		content,
		colorTheme = "bg_c_transparent",
		layout = [1],
		paddingBlock = "4vh",
		nestedBlock,
	} = props

	// layout input looks like [1,1] [1,2] [2,1] [1,1,1] [1,2,1]
	const layoutString = layout.join("_") as GridLayout
	const clrTheme = getColorTheme(colorTheme)
	const layoutWidthStyle = (() => {
		switch (true) {
			case layout.length === 3:
				return layout_site
			case layout.length === 2:
				return layout_wide

			default:
				return layout_full
		}
	})()

	return (
		<BlkLayout
			layout={layoutString}
			style={{ paddingBlock }}
			className={clrTheme}
			// nestedBlock={nestedBlock}
      layoutWidthStyle={layoutWidthStyle as WidthLayoutSize2}
		>
			{content ? content : children}
			{/* {content && <BlockRender document={content}/>} */}
			{/* {content} */}
		</BlkLayout>
	)
}
