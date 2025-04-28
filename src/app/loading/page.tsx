import { LoadingAnim } from "@components/elements/LoadingAnim"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"

export default async function LoadingPage() {
	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	return (
		<main className={[page_layout, "anim_border_spin top"].join(" ")}>
			<header className={[layout_site].join(" ")}>
				<h1 style={{ display: "none" }} aria-label="loading page header">
					Loading Page
				</h1>
			</header>
			<div
				className={[page_content, layout_site, "skeleton-card"].join(" ")}
				style={{ display: "grid", placeContent: "center", minHeight: "40vh" }}
			>
				<LoadingAnim />
			</div>
		</main>
	)
}
