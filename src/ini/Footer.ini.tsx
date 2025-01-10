import styles from "@styles/footer.module.scss"
import Link from "next/link"
import { TawTawPowered } from "../menus/TawTawPowered"
import { envs } from "@/envs"
import { SocialLinkNav } from "@components/blocks/SocialLinkNav"
import { List } from "@components/elements/List"
import { BlockLayout } from "@components/layouts/BlockLayout"
import Flex from "@components/layouts/Flex"
import { CSSProperties } from "react"
import {
	layout_full,
	layout_site,
	page_layout,
} from "@styles/layout.module.css"
import { Grid } from "@components/layouts/Grid"

const txtStyle = {
	color: "var(--c-light)",
} as CSSProperties

export function Footer() {
	return (
		<footer className={[styles.footer, page_layout].join(" ")}>
      <section className={layout_site}>
        <Grid layout={"1_1"} colWidth={'12rem'} alignContent={'start'}>
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
              <Link href={`/services`}> Services </Link>
              <Link href={`/book-a-service`}> Book a Service </Link>
              <Link href={`/login`}> Login </Link>
            </List>
          </div>
        </Grid>

      </section>
			<section
				className={layout_full}
				style={{ backgroundColor: "var(--c-footer)" }}
			>
				<div className={layout_site}>
					<Flex
						justifyContent={"space-between"}
						alignItems={"center"}
						
						gap={"m"}
						style={{ borderTop: "solid 1px var(--c-seperator-dark)" }}
					>
						<div>
							<span>{envs.NEXT_PUBLIC_COPYWRITE}</span>
						</div>
						<div>
							<ul className={styles.terms_privacy_list}>
								<li>
									<Link
										className={"sub-text"}
										href={`/terms-and-privacy#terms-and-conditions`}
									>
										{" "}
										Terms & Conditions{" "}
									</Link>
								</li>
								<li>
									<Link
										className={"sub-text"}
										href={`/terms-and-privacy#privacy`}
									>
										{" "}
										Privacy Policy{" "}
									</Link>
								</li>
							</ul>
						</div>
					</Flex>
				</div>
			</section>
			<section className={layout_full} style={{ backgroundColor: "#0a0a0a" }}>
				<div className={layout_site} style={{ paddingBlock: "var(--space-m)", filter: "brightness(0.8)" }}>
					<TawTawPowered />
				</div>
			</section>
		</footer>
	)
}
