import { ReactNode } from "react"
import { PageTMain } from "./PageTemplates"
import {
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.scss"
import { NoData } from "@components/elements/NoData"

type Props = {
	children?: ReactNode
}

export function NoDataFoundPage({ children }: Props) {
	return (
		<main className={page_layout}>
			<div className={[page_content, layout_wide].join(" ")}>
				<NoData />
				{children}
			</div>
		</main>
	)
}
