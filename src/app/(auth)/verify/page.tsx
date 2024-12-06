import ErrorMessage from "@components/ErrorMessage"
import { Callout } from "@components/blocks/Callout"
import { Header } from "@components/elements/Header"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { fetchVerifyEmail } from "@lib/fetchdata/fetchVerifyEmail"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import Link from "next/link"
type Props = {
	searchParams: {
		email: string
		token: string
	}
}

export default async function VerifyPage({ searchParams }: Props) {
	const { email, token } = await searchParams

	// if (!email || !token)
	// 	return (
	// 		<main>
	// 			<BlockLayout layout={"1"}>
	// 				<p> not sure how you got here without a key... </p>
	// 				<p>
	// 					{" "}
	// 					<Link href={`/account`}> Get otta here </Link>{" "}
	// 				</p>
	// 			</BlockLayout>
	// 		</main>
	// 	)

	const { data, error } = await fetchVerifyEmail(email, token)

	return (
		<main className={page_layout}>
			<Header widthOfContent={"layout_content"}>
				<h1> Verify Account </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
				{(!email || !token) ? (
					<WhyAreYouHere />
				) : error ? (
					<NotSuccessMessage error={error} email={email} />
				) : (
					<Content email={email} />
				)}
			</div>
		</main>
	)
}

function Content({ email }: { email: string }) {
	return (
		<>
			
				<h3 className="success"> Success </h3>
				<p>
					{" "}
					The email <strong>{email}</strong> has been verified
				</p>
				<p>
					{" "}
					<Link href={"/account"}> View account </Link>
				</p>
		</>
	)
}

function NotSuccessMessage({ error, email }: any) {
	switch (true) {
		case String(error).includes("user already is of role"):
			return (
				<>
					<Callout intent={"success"}>
						<p> This account is already verified. </p>
						<p>
							{" "}
							<Link href={"/account"}> View account </Link>
						</p>
					</Callout>
				</>
			)

		default:
			return (
				<>
					<ErrorMessage error={error}> </ErrorMessage>
					<VerifyEmailCard email={email} />
				</>
			)
	}
}

function WhyAreYouHere() {
	return (
		<div>
			<p> not sure how you got here without a key... </p>
			<p>
				{" "}
				<Link href={`/account`}> Get otta here </Link>{" "}
			</p>
		</div>
	)
}
