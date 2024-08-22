import { CSSProperties, ReactNode } from "react"
import { MainContainer } from "./MainContainer"
import styles from "@styles/page.module.scss"
import { AsideBar } from "./AsideBar"

type PageTHeaderMainAside = {
	// template:'header_main_aside'|'fullwidth',
	header: ReactNode
	main: ReactNode
	aside: ReactNode
}

export function PageTHeaderMainAside({
	header,
	main,
	aside,
}: PageTHeaderMainAside) {
	return (
		<main
			className={[
				`page-wrapper`,
				styles["page"],
				styles["header_main_aside"],
			].join(" ")}
		>
			<header>{header}</header>

			<div className="main-content">{main}</div>

			<AsideBar>{aside}</AsideBar>
		</main>
	)
}
// export function PageTHeaderMainAside({
// 	header,
// 	main,
// 	aside,
// }: PageTHeaderMainAside) {
// 	return (
// 		<div
// 			className={[
// 				`page-wrapper`,
// 				styles["page"],
// 				styles["header_main_aside"],
// 			].join(" ")}
// 		>
// 			{header}

// 			<MainContainer>{main}</MainContainer>

// 			<AsideBar>{aside}</AsideBar>
// 		</div>
// 	)
// }

type PageTHeaderMain = {
	// template:'header_main_aside'|'HeaderMain',
	header: ReactNode
	headerBgImg?: string
	headerBgColor?: string
	headerStyles?: CSSProperties
	headerIsDisplayed?: boolean
	main: ReactNode
}
export function PageTHeaderMain({
	header,
	main,
	headerBgImg,
	headerBgColor,
	headerStyles,
	headerIsDisplayed = true,
}: PageTHeaderMain) {
	return (
		<main
			className={[`page-wrapper`, styles["page"], styles["header_main"]].join(
				" "
			)}
		>
			<header
				className={styles.header}
				style={{
					backgroundImage: headerBgImg ? `url(${headerBgImg})` : "",
					backgroundColor: headerBgColor,
					display: headerIsDisplayed ? "block" : "none",
					...headerStyles,
				}}
			>
				{header}
			</header>

			{main}
		</main>
	)
}
// type PageTHeaderMain = {
// 	// template:'header_main_aside'|'HeaderMain',
// 	header: ReactNode
// 	headerBgImg?: string
// 	headerBgColor?: string
// 	headerStyles?: CSSProperties
// 	headerIsDisplayed?: boolean
// 	main: ReactNode
// }
// export function PageTHeaderMain({
// 	header,
// 	main,
// 	headerBgImg,
// 	headerBgColor,
// 	headerStyles,
// 	headerIsDisplayed = true,
// }: PageTHeaderMain) {
// 	return (
// 		<div
// className={[`page-wrapper`, styles["page"], styles["header_main"]].join(
// 	" "
// )}
// 		>
// 			<header
// 				className={styles.header}
// 				style={{
// 					backgroundImage: headerBgImg ? `url(${headerBgImg})` : "",
// 					backgroundColor: headerBgColor,
// 					display: headerIsDisplayed ? "block" : "none",
// 					...headerStyles,
// 				}}
// 			>
// 				{header}
// 			</header>

// 			<MainContainer>{main}</MainContainer>
// 		</div>
// 	)
// }

type PageTMain = {
	main: ReactNode
}
export function PageTMain({ main }: PageTMain) {
	return <MainContainer>{main}</MainContainer>
}
