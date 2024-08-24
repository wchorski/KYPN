// import styles from "@styles/blog/blog.module.scss";
import styles from "@styles/articles.module.scss"
import { Post, WidthLayoutSize, WidthLayoutSize2 } from "@ks/types"
import { CSSProperties, ReactElement, ReactNode } from "react"
import { grid, auto } from "@styles/layout.module.scss"
export const revalidate = 5

type ProdProps = {
	children: ReactNode[]
	colMinWidth?: "10rem" | "18rem" | "22rem"
}

export function GridList({
	colMinWidth = '22rem',
	children,
}: ProdProps): ReactElement<any, any> {
	const cls = ["unstyled", grid, auto].join(" ")
	const styles = {
		"--col-min-width": colMinWidth,
	} as CSSProperties

	return (
		<ul
			className={cls}
      style={styles}
		>
			{children.map((child: any, i: number) => (
				<li key={i}>{child}</li>
			))}
		</ul>
	)
}
