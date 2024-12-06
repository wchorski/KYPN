import { envs } from "@/envs"
import Link from "next/link"
import { layout_content, page_layout } from "@styles/layout.module.css"
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
