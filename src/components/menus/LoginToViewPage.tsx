import { page_content, page_layout } from "@styles/layout.module.css"
import { ReactNode } from "react"
import { BiLock } from "react-icons/bi"
import { CallbackLink } from "./CallbackLink"
import { envs } from "@/envs"

type Props = {
	children?: ReactNode | ReactNode[]
}

export function LoginToViewPage({ children }: Props) {
	return (
		<main className={page_layout}>
			<header></header>
			<div className={page_content}>
				<p style={{ fontSize: "2rem" }}>
					<BiLock />
				</p>

				<p>
					<CallbackLink>Login</CallbackLink> to view page
				</p>
				{children}
			</div>
		</main>
	)
}
