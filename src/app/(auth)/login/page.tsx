import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { Callout } from "@components/blocks/Callout"
import { DialogPopup } from "@components/menus/Dialog"
import { LoginForm } from "@components/menus/LoginForm"
import { PasswordRequestForm } from "@components/menus/PasswordRequestForm"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"
import Link from "next/link"
import { Header } from "@components/elements/Header"
import {
	layout_full,
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import Flex from "@components/layouts/Flex"

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

			<Header widthOfContent={"layout_wide"}>
				<h1> Login </h1>
				{callbackUrl && (
					<Callout intent={"warning"}>
						<p>You will return back to the previous page after login</p>
					</Callout>
				)}
			</Header>
			<div className={[page_content, layout_wide].join(" ")}>
				<Flex>
					<div>
						<LoginForm providers={providers} callbackUrl={callbackUrl} />
					</div>

					<div>
						{session?.user.email && (
							<Callout intent={"info"}>
								<p>
									{" "}
									currently logged in with email{" "}
									<strong> {session.user.email} </strong>. Go to your{" "}
									<Link href={`/account`}> Account </Link>
								</p>
							</Callout>
						)}

						{error && (
							<Callout intent={"error"}>
								{" "}
								<p> Login failed. Please try again </p>
							</Callout>
						)}
						<h4> Create a New Account </h4>
						<p>
							<Link href={`/register`} className={"button  large"}>
								{" "}
								Register Now{" "}
							</Link>
						</p>
					</div>
				</Flex>
			</div>
		</main>
	)
}
