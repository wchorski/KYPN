import { Header } from "@components/elements/Header"
import { ActionRegsiterForm } from "@components/forms/ActionRegisterForm"
import {
	layout_breakout,
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"

import { envs } from "@/envs"

export const metadata: Metadata = {
	title: "Regsiter | " + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function RegisterPage({ params, searchParams }: Props) {
	return (
		<main className={page_layout}>
			<Header>
				<h1 className="hidden"> Register an Account </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
				{/* <RegsiterForm /> */}
				<ActionRegsiterForm />
			</div>
		</main>
	)
}
