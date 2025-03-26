import type {  GridLayout, SpaceSize, WidthLayoutSize2  } from "@ks/types"
import { layout_full, layout_site } from "@styles/layout.module.css"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	className?: string
	style?: CSSProperties
	children: ReactNode | ReactNode[]
	id?: string
	gap?: SpaceSize
	layout: GridLayout
	color?: string
	backgroundColor?: string
	col_bg_colors?: string[]
	col_bg_imgs?: string[]
	verticalAlign?: "start" | "center" | "end"
	horizontalAlign?: CSSProperties["justifyItems"]
	paddingBlock?: SpaceSize
	nestedBlock?: boolean
	layoutWidthStyle?: WidthLayoutSize2
}

// todo use a seperate .grid module that is *mostly* independant from `layout` module stuff
export function BlockLayout({
	id,
	layout = "1_1",
	gap = "m",
	className,
	style,
	children,
	verticalAlign = "start",
	horizontalAlign,
	color,
	backgroundColor,
	col_bg_colors,
	col_bg_imgs,
	paddingBlock,
	nestedBlock = false,
	layoutWidthStyle,
}: Props) {
	// todo `nestedBlock` hacky way but it works (fixes difference between editor block vs web dev added)
	const clsNames = [
		// !nestedBlock ? "site-grid" : "",
		`_${layout}`,
		className,
	].join(" ")
	const inlineStyles = {
		gap: gap ? `var(--space-${gap})` : "0",
		...(paddingBlock ? { paddingBlock: `var(--space-${paddingBlock})` } : {}),
		...style,
	}

	if (layout === "1")
		return (
			<div
				id={id}
				className={[
					clsNames,
					layoutWidthStyle ? layoutWidthStyle : layout_full,
				].join(" ")}
				style={{
					...(color ? { color } : {}),
					...(color ? { "--c-header": color } : {}),
					...(backgroundColor ? { backgroundColor } : {}),
					...inlineStyles,
				}}
			>
				{children}
			</div>
		)
	//todo make a note of this, it's ugly but it works
	return (
		<div
			id={id}
			className={[
				clsNames,
				layoutWidthStyle ? layoutWidthStyle : layout_site,
			].join(" ")}
			style={inlineStyles}
		>
			{Array.isArray(children) ? (
				children?.map((child: any, i: number) => (
					<div
						key={i}
						className={["grid-item"].join(" ")}
						style={{
							alignItems: verticalAlign,
							...(horizontalAlign ? { justifyContent: horizontalAlign } : {}),
							backgroundColor: col_bg_colors ? col_bg_colors[i] : "",
							...(col_bg_imgs
								? { backgroundImage: `url(${col_bg_imgs[i]})` }
								: {}),
						}}
					>
						{child}
					</div>
				))
			) : (
				<>{children}</>
			)}
		</div>
	)
}
