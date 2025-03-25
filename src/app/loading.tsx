import { LoadingAnim } from "@components/elements/LoadingAnim"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function LoadingPage({ params, searchParams }: Props) {
	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site} style={{ visibility: "hidden" }}>
				<h1>Loading Page</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<LoadingAnim />
			</div>
		</main>
	)
}
