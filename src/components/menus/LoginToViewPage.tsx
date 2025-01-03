import { page_content, page_layout } from "@styles/layout.module.css"
import Link from "next/link"
import { ReactNode } from "react"
import { BiLock } from "react-icons/bi"

type Props = {
	children?: ReactNode | ReactNode[]
}

export function LoginToViewPage({ children }: Props) {
	return (
		<main className={page_layout} >
			<header></header>
      <div className={page_content} >
				<p style={{ fontSize: "2rem" }}>
					<BiLock />
				</p>

				<p>
					<Link href={`/login`}>Login</Link> to view page
				</p>
				{children}

      </div>
			
		</main>
	)
}
