import { Header } from "@components/elements/Header"
import {
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

import { envs } from "@/envs"

import styles from "../styles/elements/404.module.css"

type Props = {
	children?: ReactNode
}

export const metadata: Metadata = {
	title: `404 | ` + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default function NoDataFoundError404({ children }: Props) {
	return (
		<main className={page_layout}>
			<Header>
				<h1
					style={{
						textAlign: "center",
						marginInline: "auto",
					}}
				>
					404
				</h1>
			</Header>

			<div className={[page_content, layout_wide].join(" ")}>
				<p className={styles.watermark}>
					<span>4</span>
					<span>0</span>
					<span>4</span>
				</p>

				{children}
				{!children && <p> This page does not exist. </p>}

				<p>
					<Link
						href={`/`}
						// onClick={handleLink}
					>
						⇠ Return to previous Page
					</Link>
				</p>
			</div>
		</main>
	)
}

function Main2(children: ReactNode) {
	return (
		<>
			<center>
				<p className={styles.watermark}>
					<span>4</span>
					<span>0</span>
					<span>4</span>
				</p>

				{children}
				{!children && <p> This page does not exist. </p>}

				<Link
					href={`/`}
					// onClick={handleLink}
				>
					⇠ Return to previous Page
				</Link>
			</center>
		</>
	)
}
