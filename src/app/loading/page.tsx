import { LoadingAnim } from "@components/elements/LoadingAnim"
import {
	layout_full,
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"

export default async function LoadingPage() {
	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	return (
		<main className={[page_layout].join(" ")}>
			<div
				className={["anim_border_spin", layout_full].join(" ")}
				aria-label="page loading animation strip"
			></div>
			<header className={layout_site}>
				<h1 style={{ visibility: "hidden" }}> Loading Page</h1>
			</header>
			<div
				className={[page_content, layout_site].join(" ")}
				style={{ display: "grid", placeContent: "center" }}
			>
				<LoadingAnim />
			</div>
		</main>
	)
}
