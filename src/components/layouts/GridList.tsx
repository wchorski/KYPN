// import styles from "@styles/blog/blog.module.scss";
import styles from "@styles/articles.module.css"
import { Post, WidthLayoutSize, WidthLayoutSize2 } from "@ks/types"
import { CSSProperties, ReactElement, ReactNode } from "react"
import { grid, auto } from "@styles/layout.module.css"
export const revalidate = 5

type ProdProps = {
	children: ReactNode[]
	colMinWidth?: "10rem" | "16rem" | "18rem" | "22rem"
	gap?: string
  paddingInline?: string
}

export function GridList({
	colMinWidth = "16rem",
	gap = ".3rem",
  paddingInline = '0',
	children,
}: ProdProps): ReactElement<any, any> {
	const cls = ["unstyled", grid, auto].join(" ")
	const styles = {
    paddingInline,
		"--col-min-width": colMinWidth,
		gap,
	} as CSSProperties

	return (
		<ul className={cls} style={styles}>
			{children.map((child: any, i: number) => (
				<li key={i}>{child}</li>
			))}
		</ul>
	)
}
