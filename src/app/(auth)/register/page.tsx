import { envs } from "@/envs"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { RegsiterForm } from "@components/menus/RegisterFormOLD"
import { Metadata } from "next"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { Header } from "@components/elements/Header"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { ActionRegsiterForm } from "@components/forms/ActionRegisterForm"

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
			<Header widthOfContent={"layout_content"} style={{display: 'none'}}>
				<h1> Register an Account </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
				{/* <RegsiterForm /> */}
        <ActionRegsiterForm />
			</div>
		</main>
	)
}
