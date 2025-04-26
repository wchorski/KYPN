import { Card } from "@components/layouts/Card"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import Link from "next/link"

export default async function Page() {
	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Sample Page</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<h2>Base theme outside of card</h2>
				<p>
					Lorem ipsum, <Link href={"/sample"}>link</Link> sit amet consectetur
					adipisicing elit. Aliquam beatae corrupti quos repellat ullam sed,
					porro nam ipsa vero alias, voluptatum dolorum inventore officiis
					eveniet tempore fuga cumque sit quod.
				</p>

				<Link href={"/sample"}>link</Link>
				<Link href={"/sample"} className={"button medium"}>
					link button
				</Link>
				<button className={"button"}> real button</button>
				<button className={"button"} disabled={true}>
					disabled button
				</button>

				<Card colorTheme={"bg_c_plain"}>
					<h3>plain</h3>
					<p>card that is plain</p>
					<Link href={"/sample"}>link</Link>
					<Link href={"/sample"} className={"button"}>
						button
					</Link>
					<Link href={"/sample"} className={"button medium"}>
						button medium
					</Link>
					<Link href={"/sample"} className={"button large"}>
						button Large
					</Link>
					<button>real button</button>
				</Card>
				<Card colorTheme={"bg_c_primary"}>
					<h3>primary</h3>
					<p>card that is primary</p>
					<Link href={"/sample"}>link</Link>
					<Link href={"/sample"} className={"button"}>
						button
					</Link>
					<Link href={"/sample"} className={"button medium"}>
						button medium
					</Link>
					<Link href={"/sample"} className={"button large"}>
						button Large
					</Link>
					<button>real button</button>
				</Card>
				<Card colorTheme={"bg_c_tertiary"}>
					<h3>tertiary</h3>
					<p>card that is tertiary</p>
					<Link href={"/sample"}>link</Link>
					<Link href={"/sample"} className={"button"}>
						button
					</Link>
					<Link href={"/sample"} className={"button medium"}>
						button medium
					</Link>
					<Link href={"/sample"} className={"button large"}>
						button Large
					</Link>
					<button>real button</button>
				</Card>
				<Card colorTheme={"bg_c_accent"}>
					<h3>accent</h3>
					<p>card that is accent</p>
					<Link href={"/sample"}>link</Link>
					<Link href={"/sample"} className={"button"}>
						button
					</Link>
					<Link href={"/sample"} className={"button medium"}>
						button medium
					</Link>
					<Link href={"/sample"} className={"button large"}>
						button Large
					</Link>
					<button>real button</button>
				</Card>
				<Card colorTheme={"bg_c_transparent"}>
					<h3>transparent</h3>
					<p>card that is transparent</p>
					<Link href={"/sample"}>link</Link>
					<Link href={"/sample"} className={"button"}>
						button
					</Link>
					<Link href={"/sample"} className={"button medium"}>
						button medium
					</Link>
					<Link href={"/sample"} className={"button large"}>
						button Large
					</Link>
					<button>real button</button>
				</Card>
				<Card colorTheme={"bg_c_reverse_theme"}>
					<h3>reverse</h3>
					<p>card that is reverse</p>
					<Link href={"/sample"}>link</Link>
					<Link href={"/sample"} className={"button"}>
						button
					</Link>
					<Link href={"/sample"} className={"button medium"}>
						button medium
					</Link>
					<Link href={"/sample"} className={"button large"}>
						button Large
					</Link>
					<button>real button</button>
				</Card>
			</div>
		</main>
	)
}
