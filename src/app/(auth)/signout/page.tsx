import { Header } from "@components/elements/Header"
import { DialogPopup } from "@components/menus/DialogPopup"
import { PasswordRequestForm } from "@components/menus/PasswordRequestForm"
import SignOutButton from "@components/menus/SignOutButton"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"

import { envs } from "@/envs"

export const metadata: Metadata = {
	title: "Sign Out | " + envs.SITE_TITLE,
	description: "Login, register, or recover account",
}

type Props = {
	searchParams: {
		reset: string
		error: string
		callbackUrl?: string
	}
}

export default async function SignOutPage({ searchParams }: Props) {
	const { error, callbackUrl } = await searchParams

	return (
		<main className={page_layout}>
			<Header widthOfContent={"layout_content"}>
				<h1> Sign Out </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
				<SignOutButton />
			</div>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>
		</main>
	)
}
