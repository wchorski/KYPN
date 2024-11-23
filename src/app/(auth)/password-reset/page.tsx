import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { PasswordResetForm } from "@components/menus/PasswordResetForm"
import { BlockLayout } from "@components/layouts/BlockLayout"
import {
  layout_content,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.scss"
import { Header } from "@components/elements/Header"
type Props = {
	searchParams: {
		token: string
		email: string
	}
}

export default async function PasswordResetPage({ searchParams }: Props) {
	const { token, email } = await searchParams

	return (
		<main className={page_layout}>
			<Header widthOfContent={"layout_content"}>
				<h1> Password Reset </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
				<PasswordResetForm token={token} email={email} />
			</div>
		</main>
	)
}
