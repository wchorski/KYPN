import { Callout } from "@components/blocks/Callout"
import { LoginForm } from "@components/LoginForm"
import { DialogPopup } from "@components/menus/DialogPopup"
import { PasswordRequestForm } from "@components/PasswordRequestForm"
import {
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export const metadata: Metadata = {
	title: "Login | " + envs.SITE_TITLE,
	description: "Login, register, or recover account",
}

type Props = {
	searchParams: {
		reset: string
		error: string
		callbackUrl?: string
	}
}

export default async function LoginPage({ searchParams }: Props) {
	const { error, callbackUrl } = await searchParams
	// todo next-auth is aight idk

	const session = await getServerSession(nextAuthOptions)
	const providers = await getProviders()

	return (
		<main className={page_layout}>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>

			<header className={layout_wide}>
				<h1> Login </h1>
				{callbackUrl && (
					<Callout intent={"warning"}>
						<p>You will return back to the previous page after login</p>
					</Callout>
				)}
			</header>
			<div className={[page_content, layout_wide].join(" ")}>
				<div className={"flex"}>
					<div>
						<LoginForm providers={providers} callbackUrl={callbackUrl} />
					</div>

					<div>
						{session?.user.email && (
							<Callout intent={"info"} style={{maxWidth: '17rem'}}>
								<p>
									{" "}
									currently logged in with email{" "}
									<strong> {session.user.email} </strong>. Go to your{" "}
									<Link href={`/`}> Account </Link>
								</p>
							</Callout>
						)}

						{error && (
							<div className={"error"}>
								{" "}
								<p> Login failed. Please try again </p>
							</div>
						)}
						<h4> Create a New Account </h4>
						<p>
							<Link href={`/register`} className={"button  large"}>
								{" "}
								Register Now{" "}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
