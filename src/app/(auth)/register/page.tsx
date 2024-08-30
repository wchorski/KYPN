import { envs } from "@/envs"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { RegsiterForm } from "@components/menus/RegisterForm"
import { Metadata } from "next"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { Header } from "@components/elements/Header"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.scss"

export const metadata: Metadata = {
	title: "Regsiter | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function RegisterPage({ params, searchParams }: Props) {
	return (
		<main className={page_layout}>
			<Header widthOfContent={"layout_content"}>
				<h1> Register an Account </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
				<RegsiterForm />
			</div>
		</main>
	)
}
