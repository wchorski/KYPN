import { layout_content, page_layout } from "@styles/layout.module.css"
import Link from "next/link"

import { envs } from "@/envs"
type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function AppPage({ params, searchParams }: Props) {
	return (
		<main>
			<header>
				<h1>{envs.SITE_TITLE}</h1>
			</header>
			<div className={[page_layout, layout_content].join(" ")}>
				<Link href={`/home`}> Take Me Home </Link>
			</div>
		</main>
	)
}
