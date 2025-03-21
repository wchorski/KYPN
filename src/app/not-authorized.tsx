import { Section } from "@components/blocks/Section"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

import { envs } from "@/envs"

import styles from "../styles/elements/404.module.css"

type Props = {
	children?: ReactNode
}

export const metadata: Metadata = {
	title: `403 | ` + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default function NotAuthorized403({ children }: Props) {
	return (
		<>
			<PageTHeaderMain header={Header()} main={Main(children)} />
		</>
	)
}

function Header() {
	return (
		<>
			<Section layout={"1"}>
				<h1
					style={{
						textAlign: "center",
						marginInline: "auto",
					}}
				>
					404
				</h1>
			</Section>
		</>
	)
}

function Main(children: ReactNode) {
	return (
		<>
			<center>
				<p className={styles.watermark}>
					<span>4</span>
					<span>0</span>
					<span>3</span>
				</p>

				{children}
				{!children && (
					<p>
						{" "}
						{`You're not authorized to view this page.`}{" "}
						<Link href={`/login`}> Login</Link>{" "}
					</p>
				)}

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
