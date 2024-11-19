import styles from "@styles/footer.module.scss"
import Link from "next/link"
import { TawTawPowered } from "@components/menus/TawTawPowered"
import { envs } from "@/envs"
import { SocialLinkNav } from "@components/blocks/SocialLinkNav"
import { List } from "@components/elements/List"
import { BlockLayout } from "@components/layouts/BlockLayout"
import Flex from "@components/layouts/Flex"
import { CSSProperties } from "react"

const txtStyle = {
	color: "var(--c-light)",
} as CSSProperties

export function Footer() {
	return (
		<footer className={styles.footer}>
			<BlockLayout layout={"1_1"}>
				<div>
					<h4 style={txtStyle}> Contact </h4>
					<List>
						<Link href={`mailto:${envs.ADMIN_EMAIL_ADDRESS}`}>
							{" "}
							{envs.ADMIN_EMAIL_ADDRESS}
						</Link>
						<SocialLinkNav
							color={envs.COLOR_PRIMARY}
							github="https://github.com/wchorski/KYPN"
						/>
					</List>
				</div>

				<div>
					<h4 style={txtStyle}> Pages </h4>
					<List>
						<Link href={`/blog`}> Blog </Link>
						<Link href={`/login`}> Login </Link>
					</List>
				</div>
			</BlockLayout>
			<section style={{ backgroundColor: "var(--c-footer)" }}>
				<div className="siteWrapper">
					<Flex
						justifyContent={"space-between"}
						alignItems={"center"}
						paddingBlock={"ml"}
						paddingInline="m"
						gap={"m"}
						style={{ borderTop: "solid 1px var(--c-seperator-dark)" }}
					>
						<div>
							<span>{envs.NEXT_PUBLIC_COPYWRITE}</span>
						</div>
						<div>
							<ul className={styles.terms_privacy_list}>
								<li>
									<Link href={`/terms-and-privacy#terms-and-conditions`}> Terms & Conditions </Link>
								</li>
								<li>
									<Link href={`/terms-and-privacy#privacy`}> Privacy Policy </Link>
								</li>
							</ul>
						</div>
					</Flex>
				</div>
			</section>
			<section style={{ backgroundColor: "#0a0a0a" }}>
				<BlockLayout layout={"1"} paddingBlock={"m"}>
					<TawTawPowered />
				</BlockLayout>
			</section>
		</footer>
	)
}
