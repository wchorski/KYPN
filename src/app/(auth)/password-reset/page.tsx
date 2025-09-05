import { PasswordResetForm } from "@components/forms/PasswordResetForm"
import {
  layout_wide,
  layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"

type Props = {
	searchParams: {
		token: string
		email: string
	}
}

export default async function PasswordResetPage({ searchParams }: Props) {
	const { token, email } = await searchParams

	return (
		<main
		 className={page_layout}
		>
			<header className={layout_wide} >
				<h1> Password Reset </h1>
			</header>

			<div
			className={[page_content, layout_content].join(" ")}
			>
				<PasswordResetForm token={token} email={email} />
			</div>
		</main>
	)
}
