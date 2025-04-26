// import styles from "@styles/blog/blog.module.scss";
import { auto,grid } from "@styles/layout.module.css"
import type { CSSProperties, ReactElement, ReactNode } from "react"
export const revalidate = 5

type ProdProps = {
	children: ReactNode[]
	colMinWidth?: "10rem" | "16rem" | "18rem" | "22rem"
	gap?: string
  paddingInline?: string
  style?:CSSProperties
  className?:string
}

export function GridList({
	colMinWidth = "16rem",
	gap = ".3rem",
  paddingInline = '0',
  style,
  className,
	children,
}: ProdProps): ReactElement<any, any> {
	const cls = ["unstyled", grid, auto, className].join(" ")
	const styles = {
    paddingInline,
		"--col-min-width": colMinWidth,
		gap,
    gridColumn: '1/-1',
    ...style
	} as CSSProperties

	return (
		<ul className={cls} style={styles}>
			{children.map((child: any, i: number) => (
				<li key={i}>{child}</li>
			))}
		</ul>
	)
}
