import { Blockquote } from "@components/blocks/Blockquote"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { Card } from "@components/layouts/Card"
import { Grid } from "@components/layouts/Grid"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/blocks/Section"
import { CSSProperties } from "react"
import { IoIosAirplane, IoMdAperture, IoMdContact } from "react-icons/io"
import styles from "@styles/page.module.scss"
import { Callout } from "@components/blocks/Callout"
import { ButtonLink } from "@components/blocks/ButtonLink"
import { envs } from "@/envs"
import { CodeBlock } from "@components/blocks/CodeBlock"
import { ContactForm } from "@components/blocks/ContactForm"
import { DayMonthTime } from "@components/blocks/DayMonthTime"
import { Hero } from "@components/blocks/Hero"
import { IFrame } from "@components/blocks/IFrame"
import { ImageBlock } from "@components/blocks/ImageBlock"
import { HeadingBlock } from "@components/blocks/HeadingBlock"
import Flex from "@components/layouts/Flex"
import Link from "next/link"
import { Header } from "@components/elements/Header"
import {
	page_layout,
	page_sidebar,
	page_content,
	layout_full,
	layout_wide,
} from "@styles/layout.module.scss"
import { post_header, post_title } from "@styles/blog/blogpost.module.scss"
// import { AddToCalendarButton } from 'add-to-calendar-button-react'
type Props = {
	searchParams: { q: string }
	params: { id: string }
}

const headers = [
	{
		level: 2,
		id: "outside the section",
		children: "outside the section",
	},
	{
		level: 2,
		id: "Links and Buttons",
		children: "Links and Buttons",
	},
]

export default async function FruitPage({ params, searchParams }: Props) {
	// return <PageTHeaderMain header={Header()} main={Content()} />
	return (
		<main className={page_layout}>
			<header className={layout_full} style={{background: 'darkgreen'}} >
				<h1> Page Title</h1>
				<p>lil caption about this page</p>
			</header>

			<div className={[page_content, layout_full].join(" ")}>
				<h2> Content Wrap </h2>
				<p>
					{" "}
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
					veniam minima natus magni dolor, sed a quae odit laboriosam deleniti,
					pariatur cum incidunt eum illo alias facere quibusdam labore. Laborum?
				</p>
        <img src={'http://localhost:3000/_next/image?url=https%3A%2F%2Fassets.nintendo.com%2Fimage%2Fupload%2Far_16%3A9%2Cb_auto%3Aborder%2Cc_lpad%2Fb_white%2Ff_auto%2Fq_auto%2Fdpr_1.5%2Fc_scale%2Cw_700%2Fncom%2Fsoftware%2Fswitch%2F70010000005302%2Fa6260af9456f2e4a87b5b3e186678cf2780a3f367ba968d790ac3918e5e4b636&w=1920&q=75'} />
			</div>

			<aside className={page_sidebar}>
				<Flex flexDirection={"column"} alignContent="flex-start">
					<Card>
						<h2>Sidebar Card 1</h2>
					</Card>
					<Card>
						<h2>Sidebar Card 2</h2>
					</Card>
					<Card>
						<h2>Sidebar Card 3</h2>
					</Card>
				</Flex>
			</aside>

			<footer className={layout_full} style={{background: 'navy'}}>
				<h2>Content Footer</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus
					sed ratione aperiam iure porro consectetur, adipisci voluptatum dolore
					eveniet facere autem eligendi beatae odio necessitatibus id deserunt
					suscipit quo!
				</p>
			</footer>
		</main>
	)
	// return (
	// 	<>
	// 		<main className={page_layout}>
	// 			<Header bgColor={'bg-c-accent'}>
	// 				<h1 className={post_title}>
	// 					{" "}
	// 					Header of Fruit Page for testing components and variables{" "}
	// 				</h1>
	// 				<p>
	// 					{" "}
	// 					This is an example page to view and test typography, custom
	// 					components, colors, etc.{" "}
	// 				</p>
	// 			</Header>

	// 			<div className={[content, layout_full].join(' ')}>
	// 				<ContentBlocks />
	// 			</div>

	// 			<aside className={page_sidebar}>
	// 				<Flex flexDirection={"column"} alignContent="flex-start">
	// 					<Card>
	// 						<label>Table of Contents</label>
	// 						<ul className="unstyled">
	// 							{headers.map((h, i) => (
	// 								<li key={i}>
	// 									<Link key={i} href={`/fruit#${String(h.children)}`}>
	// 										{String(h.children)}
	// 									</Link>
	// 								</li>
	// 							))}
	// 						</ul>
	// 					</Card>
	// 					<Card>ads</Card>
	// 					<Card>call to action</Card>
	// 				</Flex>
	// 			</aside>

	// 			<footer className={layout_wide}>
	// 				<Flex className={layout_wide}>
	// 					<Card>
	// 						<h2>Categories</h2>
	// 						<p>here are some related categories</p>
	// 					</Card>
	// 					<Card>
	// 						<h2>Tags</h2>
	// 						<p>here are some related tags</p>
	// 					</Card>
	// 				</Flex>
	// 			</footer>
	// 		</main>
	// 	</>
	// )
}

function ContentBlocks() {
	return (
		<>
			{/* <h2 id="outside the section"> outside the section</h2> */}
			<HeadingBlock level={headers[0].level as any} id={headers[0].id}>
				{headers[0].children}
			</HeadingBlock>
			<p>
				{" "}
				loose content directly inside the main tag still get placed inside the
				layout-content column
			</p>

			<Section bgColor={"bg-c-accent"}>
				<h2> content inside section</h2>
				<p>
					content inside a layout-full section still gets put into the
					layout-content column
				</p>
				<p>
					You can even set a background color or image of the entire section
				</p>
			</Section>

			<Callout intent={"info"}>
				<p>callouts will always have layout-breakout</p>{" "}
				<p>
					is this working the way it should? Lorem ipsum dolor sit amet
					consectetur, adipisicing elit. Consequatur, odit pariatur magnam,
					beatae quas corporis labore harum rem iusto nulla nostrum voluptates
					ipsum adipisci rerum impedit distinctio dolore animi laudantium?
				</p>
			</Callout>
			<Callout intent={"success"}>
				<p>callouts can have different intents</p> <h4> Other Elements</h4>
				<p> you can also put other elements in here</p>
			</Callout>

			<Blockquote>
				<p>blockquote</p>
			</Blockquote>
			<HeadingBlock level={headers[1].level as any} id={headers[1].id}>
				{headers[1].children}
			</HeadingBlock>
			{/* <h2 id="Links and Buttons"> Links and Buttons </h2> */}
			<div className="flex">
				<ButtonLink
					link={envs.FRONTEND_URL + `/fruit#links-buttons`}
					label="Button Link Large"
					size="large"
				/>
				<ButtonLink
					link={envs.FRONTEND_URL + `/fruit#links-buttons`}
					label="Button Link Medium"
					size="medium"
				/>
				<ButtonLink
					link={envs.FRONTEND_URL + `/fruit#links-buttons`}
					label="Button Link small"
					size="small"
				/>
			</div>

			<h4>CodeBlock</h4>
			<CodeBlock>
				{`
.gap-xl {
	gap: var(--space-xl) !important !important !important !important!important !important !important;
}
.gap-l {
	gap: var(--space-l);
}
.gap-ml {
	gap: var(--space-ml);
}
.gap-m {
	gap: var(--space-m);
}
          `}
			</CodeBlock>
			<Section bgColor={"bg-c-primary"}>
				<h4>Forms</h4>
				<ContactForm />
			</Section>

			<h4> DayMonthTime</h4>
			<p className="sub-text">coming soon...</p>
			{/* <DayMonthTime dateString={"2024-10-10"} /> */}

			<h4>Hero</h4>
			<p>
				still need to figure out a good way to color text without getting
				overridden
			</p>
			<Hero
				color={"white"}
				imageSrc={
					"https://assets.nintendo.com/image/upload/f_auto,q_auto/v1712945796/Marketing/pmp-lm2-hd/background-scenes/background-manor-landscape-2x.jpg"
				}
				caption={{
					discriminant: false,
				}}
			>
				<h3>BIG HERO TEXT</h3>
				<p>lfg team. wohhh woooooh</p>
			</Hero>

			<h4>IFrame</h4>
			<IFrame src="https://www.williamusic.com" />

			<h3> Media </h3>
			<h4>ImageBlock</h4>
			<ImageBlock
				alt="landscape chubby kirby"
				imageSrc="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_801/b_white/f_auto/q_auto/ncom/software/switch/70010000056620/3c95ab269b656931b9f8218ce6e48bec3d1f84d4b92f6c9ff9616b0f129c2a95"
			/>
			<ImageBlock
				alt="portrait pikmin"
				imageSrc="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_500/ncom/software/switch/70070000018036/desc/Pikmin1-2_char"
			/>
			<ImageBlock alt="square placeholer" imageSrc="/assets/placeholder.png" />

			<h4>ImageGallery</h4>
			<p> todo: Coming soon to a browser near you...</p>
		</>
	)
}

function Content() {
	return (
		<>
			<h2> content not inside a section tag </h2>
			<p>
				this content is not inside a section tag Lorem ipsum dolor sit amet
				consectetur adipisicing elit. Fuga provident maiores molestiae
				repellendus, facilis quam doloremque pariatur porro molestias. Possimus
				aut dolorem consectetur nisi distinctio exercitationem deserunt quasi
				labore repellendus.
			</p>
			<section>
				<BlockLayout layout={"1"}>
					<h2> Typography </h2>

					<h1> Headings 1 </h1>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
						tempore iste quam harum assumenda mollitia sunt. Odit eaque
						molestias aperiam aliquid, animi, voluptatibus laborum porro, vitae
						blanditiis consequatur facere non.
					</p>
					<pre>
						{`
.page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, var(--w-sitemax)) minmax(
    0,
    1fr
  );

  > * {
    grid-column: 2/2;
  }
}
            `}
					</pre>
					<Card>
						<p>here is some content inside a card element</p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							Voluptas, eligendi? Tenetur, natus, odit quidem vel similique sint
							eius culpa earum dolore aspernatur iste pariatur quibusdam fugiat
							maxime omnis officiis quam?
						</p>
					</Card>
					<Card>
						<h5> card w pop out</h5>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							Voluptas, eligendi? Tenetur, natus, odit quidem vel similique sint
							eius culpa earum dolore aspernatur iste pariatur quibusdam fugiat
							maxime omnis officiis quam?
						</p>
					</Card>
					<h4> Plain group of cards</h4>
					<p>
						{" "}
						These cards are in a plain <code>{"<div>"}</code> tag. Notice how it
						scoots the containing children slightly in from the parent
					</p>
					<div>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
					</div>
					<h4>
						{" "}
						3 col cards with <code>{`<Grid />`}</code>
					</h4>
					<p>
						{" "}
						These cards are in a plain <code>{"<div>"}</code> tag. Notice how it
						scoots the containing children slightly in from the parent
					</p>
					<Grid layout={"1_1_1"}>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
					</Grid>
					<h2> Headings 2 with a laaaaaaaaaaaaaaaaarge word </h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
						ab eligendi quod aliquid deleniti quia, explicabo at recusandae sit
						adipisci incidunt ad cum itaque? Excepturi sint dignissimos cumque
						provident asperiores?
					</p>
					<h3> Headings 3 </h3>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Repudiandae in officia, voluptas culpa amet, quam enim similique
						natus explicabo omnis repellendus delectus, cupiditate ratione fuga
						aperiam saepe est corporis reiciendis?
					</p>
					<pre>
						{`
> :not(.site-grid, .grid, .grid-item, .flex, .flex-item) {
  //todo causes overflow, but could be a really smart thing to get various amounts of content to line up
  // width: clamp(1rem, var(--w-contentmax), var(--w-sitemax));
  margin-inline: auto;
  // width: clamp(1rem, var(--w-contentmax), var(--w-sitemax));
  width: clamp(1rem, 90vw, var(--w-contentmax));
}
            `}
					</pre>
					<pre>
						<code>
							{`
> :not(.site-grid, .grid, .grid-item, .flex, .flex-item) {
  //todo causes overflow, but could be a really smart thing to get various amounts of content to line up
  // width: clamp(1rem, var(--w-contentmax), var(--w-sitemax));
  margin-inline: auto;
  // width: clamp(1rem, var(--w-contentmax), var(--w-sitemax));
  width: clamp(1rem, 90vw, var(--w-contentmax));
}
            `}
						</code>
					</pre>
					<h4> Headings 4 </h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ipsam,
						amet corrupti, perspiciatis ratione aut sunt rem maiores animi nemo,
						libero similique quis odio. Tempora magni similique dicta
						necessitatibus. Asperiores?
					</p>
					<h5> Headings 5 </h5>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
						eaque, tempore omnis molestiae quo, unde tenetur culpa quidem
						placeat quod quae minus? Earum temporibus illo repellat rerum animi
						aliquam vitae?
					</p>
					<h6> Headings 6 </h6>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
						in nam ratione incidunt laudantium earum quo aut quam, maxime
						mollitia aperiam? Aspernatur odio velit sequi ab delectus eveniet
						totam minus.
					</p>

					<h2> Paragaphs: </h2>
					<p>
						{" "}
						Lorem ipsum dolor sit amet <strong> bold text </strong> adipisicing
						elit. Debitis veritatis similique deleniti perferendis rerum
						eligendi cum enim itaque voluptatem, inventore ducimus tempore
						dolorum reprehenderit voluptas voluptatibus error cupiditate numquam
						recusandae.
					</p>
					<p>
						{" "}
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
						possimus <em> EMPHASIZE INLINE </em> id, ipsa voluptates culpa fugit
						ducimus odio at, rem laudantium explicabo laboriosam consequatur
						quod saepe quaerat eius mollitia eos. Lorem ipsum dolor sit amet,
						consectetur adipisicing elit. Cum neque doloribus culpa dicta ipsa
						necessitatibus optio? Accusantium voluptates suscipit temporibus
						eius explicabo! Delectus quaerat ad sint, ratione natus vel
						laboriosam. Lorem ipsum
					</p>
					<ul>
						<li>
							{" "}
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
							aut.
						</li>
						<li>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
							blanditiis ducimus accusantium pariatur vero? Expedita nesciunt
							ducimus tempora saepe temporibus!
						</li>
						<li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
					</ul>
					<p>
						Lorem ipsum dolor sit <a href="/"> Inline Link </a> amet consectetur
						adipisicing elit. Reprehenderit doloremque beatae est perspiciatis.
						Recusandae veritatis numquam, quae voluptatem reprehenderit qui
						itaque, libero, corporis deserunt consectetur modi. Tenetur iusto
						impedit incidunt!
					</p>
					<h2> Lists: </h2>
					<ul>
						<li> bannana </li>
						<li> apple </li>
						<li> lemon </li>
					</ul>
					<ul>
						<li> bannana </li>
						<li>
							apple
							<ul>
								<li> granny smith </li>
								<li>
									honey crisp
									<ul>
										<li> red </li>
										<li> yellow </li>
									</ul>
								</li>
								<li> gross green </li>
							</ul>
						</li>
						<li> lemon </li>
					</ul>

					<ol>
						<li> one </li>
						<li> two </li>
						<li> three </li>
					</ol>
				</BlockLayout>
			</section>

			<hr />

			<section>
				<h2> Block Layouts </h2>

				<h3> 3 column layout</h3>
				<BlockLayout layout={"1_1_1"}>
					<div>
						<h4> What up? </h4>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Architecto et harum impedit facilis reprehenderit quo, possimus
							adipisci natus alias odio!
						</p>
					</div>
					<div>
						<h4> Hey </h4>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Architecto et harum impedit facilis reprehenderit quo, possimus
							adipisci natus alias odio!
						</p>
					</div>
					<div>
						<h4> Yo </h4>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Architecto et harum impedit facilis reprehenderit quo, possimus
							adipisci natus alias odio!
						</p>
					</div>
				</BlockLayout>
			</section>

			<section>
				<h2> Spacing </h2>
				<BlockLayout layout={"1_1"} gap="m">
					<Card>
						<h4> Widths </h4>
						<div className="grid gap-s">
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>xxl</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-xxl)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>xl</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-xl)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>l</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-l)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>ml</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-ml)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>m</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-m)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>ms</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-ms)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>s</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-s)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>xs</span>
								<div
									style={{
										width: "var(--space)",
										height: "var(--space)",
										background: "var(--c-primary)",
									}}
								>
									{" "}
								</div>
								<div
									style={{
										width: "var(--space-xs)",
										height: "var(--space)",
										// background: "var(--c-secondary)",
										outline: "1.7px dotted var(--c-secondary)",
									}}
								>
									{" "}
								</div>
							</div>
						</div>
					</Card>
					<Card>
						<div className="grid gap-ml">
							<h4> Heights </h4>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>xxl</span>
								<div
									style={{
										height: "var(--space-xl)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>xl</span>
								<div
									style={{
										height: "var(--space-xl)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>l</span>
								<div
									style={{
										height: "var(--space-l)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>ml</span>
								<div
									style={{
										height: "var(--space-ml)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>m</span>
								<div
									style={{
										height: "var(--space-m)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>ms</span>
								<div
									style={{
										height: "var(--space-ms)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>s</span>
								<div
									style={{
										height: "var(--space-s)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
							<div className="flex">
								<span style={{ width: "var(--space-ml)" }}>xs</span>
								<div
									style={{
										height: "var(--space-xs)",
										border: "1.7px dotted var(--c-secondary)",
										display: "grid",
										alignItems: "center",
										flex: "1",
									}}
								>
									{" "}
								</div>
							</div>
						</div>
					</Card>
				</BlockLayout>
			</section>

			<hr />

			<h2> Interactive: </h2>
			<p>
				{" "}
				button that is <button>inline</button> with other text Lorem ipsum dolor
				sit amet consectetur adipisicing elit. Nisi, sunt modi mollitia porro
				tempora possimus eos, repellat repudiandae saepe odio deserunt itaque
				maiores aspernatur. Perspiciatis repellendus eaque molestias consequatur
				minima!
			</p>

			<h5> button in grid</h5>
			<p>
				{" "}
				I do not have to use a component. Here I am using plain html elements
				with css utilitie helpers. The same helpers I use for the components. I
				do have to wrap any <code>.grid</code> or <code>.flex</code> element in
				a plane <code>{"<div>"}</code> so it falls inline with narrow{" "}
				{'"non layout"'} content
			</p>
			<div>
				<div
					// style={{display: 'grid', gap: '1rem', marginBlock: '1rem'}}
					className="grid gap-m"
				>
					<button> regular </button>
					<button className="medium button"> medium </button>
					<button className="large button"> large </button>
				</div>
			</div>

			<h5> buttons in flex</h5>
			<div>
				<div
					className="flex gap-m"
					// style={{display: 'flex', gap: '1rem', marginBlock: '1rem'}}
				>
					<button> regular </button>
					<button className="medium button"> medium </button>
					<button className="large button"> large </button>
				</div>
			</div>

			<a href="/"> anchor tag </a>
			<a href="/" className="button">
				{" "}
				anchor tag button{" "}
			</a>

			<h4> Form: </h4>
			<form>
				<fieldset>
					<legend> various inputs </legend>
					<label htmlFor="name">
						<span> name </span>
						<input type="text" name="name" />
					</label>
					<label htmlFor="password">
						<span> password </span>
						<input type="password" name="password" />
					</label>
					<label htmlFor="email">
						<span> email </span>
						<input type="email" name="email" />
					</label>
					<label htmlFor="yesno">
						<input
							type="checkbox"
							name="yesno"
							id="yesno"
							defaultChecked={true}
						/>
						<span> yes or no </span>
					</label>
					<label htmlFor="color">
						<span> fav color </span>

						<select name="color">
							<option value=""> red </option>
							<option value=""> blue </option>
							<option value=""> green </option>
						</select>
					</label>

					<label htmlFor="notes">
						<span> notes </span>
						<textarea name="notes" />
					</label>
				</fieldset>
				<fieldset>
					<legend>Select a maintenance drone:</legend>

					<label htmlFor="huey">
						<input
							type="radio"
							id="huey"
							name="drone"
							value="huey"
							defaultChecked={true}
						/>
						<span>Huey</span>
					</label>

					<label htmlFor="dewey">
						<input type="radio" id="dewey" name="drone" value="dewey" />
						<span>Dewey</span>
					</label>

					<label htmlFor="louie">
						<input type="radio" id="louie" name="drone" value="louie" />
						<span>Louie</span>
					</label>
				</fieldset>
			</form>
			<hr />
			<h2> Tabels </h2>
			<table>
				<thead>
					<tr>
						<th>Header 1</th>
						<th>Header 2</th>
						<th>Header 3</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Data 1</td>
						<td>Data 2</td>
						<td>Data 3</td>
					</tr>
					<tr>
						<td>Data 4</td>
						<td>Data 5</td>
						<td>Data 6</td>
					</tr>
				</tbody>
			</table>
			<hr />
			<h2> Media: </h2>
			<ImageDynamic photoIn={""} />
			<p>audio</p>

			<hr />
			<h2> Layouts </h2>
			<h3> 1 Columns</h3>
			<BlockLayout layout={"1"}>
				<p>
					one: Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Repudiandae rem minima unde eos. Ab iure veritatis iste minus eos
					eveniet nostrum unde dolores, accusamus, fuga, porro quasi impedit
					tempora corrupti?
				</p>
				{/* <p>two</p> */}
				{/* <p>three</p> */}
				{/* <p>four</p> */}
			</BlockLayout>

			<section style={{ border: "3px dashed hsl(38.82deg 100% 50% / 21%)" }}>
				<h2> 2 columns BlockLayout </h2>
				<h3>
					Layout <code>1_1</code>{" "}
				</h3>
				<p>
					{" "}
					here are 2 columns with independant background colors that extend to
					the edges
				</p>
				<BlockLayout
					layout={"1_1"}
					col_bg_colors={[
						"hsl(38.82deg 100% 50% / 21%)",
						"hsl(18.82deg 100% 50% / 21%)",
					]}
				>
					<div>
						<h4> First Column</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Second Column </h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
				</BlockLayout>

				<h3>
					Layout <code>1_2</code>{" "}
				</h3>
				<p> Right is x2 larger than left</p>
				<BlockLayout
					layout={"1_2"}
					col_bg_colors={[
						"hsl(38.82deg 100% 50% / 21%)",
						"hsl(18.82deg 100% 50% / 21%)",
					]}
				>
					<div>
						<h4> First Column</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
						<p>
							{" "}
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
							dolorem maxime amet fuga facilis nobis culpa! Hic consectetur, non
							optio ab impedit mollitia error cum aliquid rerum, porro sunt in!
						</p>
					</div>
					<div>
						<h4> Second Column </h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
				</BlockLayout>

				<h3>
					Layout <code>1_4</code>{" "}
				</h3>
				<p> Right is x4 larger than left</p>
				<BlockLayout
					layout={"1_4"}
					col_bg_colors={[
						"hsl(38.82deg 100% 50% / 21%)",
						"hsl(18.82deg 100% 50% / 21%)",
					]}
				>
					<div>
						<h4> First Column</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Second Column </h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
				</BlockLayout>

				<h3>
					Layout <code>2_1</code>{" "}
				</h3>
				<p> Left is x2 larger than right</p>
				<BlockLayout
					layout={"2_1"}
					col_bg_colors={[
						"hsl(38.82deg 100% 50% / 21%)",
						"hsl(18.82deg 100% 50% / 21%)",
					]}
				>
					<div>
						<h4> First Column</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
							eaque consequatur sint natus, inventore corporis accusamus ullam
							sed, est velit alias, in aut fugit eligendi enim labore laborum
							doloribus. Ipsum!
						</p>
					</div>
					<div>
						<h4> Second Column </h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
				</BlockLayout>
			</section>

			<section>
				<h2> 3 Columns</h2>
				<h3>
					{" "}
					Layout <code>1_1_1</code>
				</h3>
				<BlockLayout
					layout={"1_1_1"}
					col_bg_colors={[
						"rgb(255 0 0 / 10%)",
						"rgb(0 255 0 / 10%)",
						"rgb(0 0 255 / 10%)",
					]}
					verticalAlign={"center"}
				>
					<div>
						<h4> Column One</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusa
						</p>
					</div>
					<div>
						<h4> Column Two</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat ignissimos minus suscipit dolorum, ullam dolor iste
							autem facilis, a expedita, accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Column Three</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro inventore praesentium odio natus dignissimos minus suscipit
							dolorum, ullam dolor iste autem facilis, a expedita, accusamus at
							culpa tenetur!
						</p>
					</div>
				</BlockLayout>

				<h3>
					{" "}
					Layout <code>1_2_1</code>
				</h3>
				<BlockLayout
					layout={"1_2_1"}
					col_bg_colors={[
						"rgb(255 0 0 / 10%)",
						"rgb(0 255 0 / 10%)",
						"rgb(0 0 255 / 10%)",
					]}
					verticalAlign={"center"}
				>
					<div>
						<h4> Column One</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusa
						</p>
					</div>
					<div>
						<h4> Column Two</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat ignissimos minus suscipit dolorum, ullam dolor iste
							autem facilis, a expedita, accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Column Three</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro inventore praesentium odio natus dignissimos minus suscipit
							dolorum, ullam dolor iste autem facilis, a expedita, accusamus at
							culpa tenetur!
						</p>
					</div>
				</BlockLayout>
			</section>
			<section>
				<h2> 4 Columns</h2>
				<h3>
					{" "}
					Layout <code>1_1_1_1</code>
				</h3>
				<p>
					{" "}
					the 4 column layout like all other grid layouts starts off as a single
					stack and has 2 graduating forms
				</p>
				<ul>
					<li>650px - verticle stack</li>
					<li>800px - 4 square checker</li>
					<li>1200px - horizontal row</li>
				</ul>
				<BlockLayout
					layout={"1_1_1_1"}
					col_bg_colors={[
						"rgb(250, 0, 0, 20%",
						"rgb(0, 250, 0, 20%",
						"rgb(0, 0, 250, 20%",
						"rgb(250, 100, 150, 20%",
					]}
				>
					<div>
						<h4> Column One</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Column Two</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Column Three</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
					<div>
						<h4> Column Four</h4>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
							porro quaerat inventore praesentium odio natus dignissimos minus
							suscipit dolorum, ullam dolor iste autem facilis, a expedita,
							accusamus at culpa tenetur!
						</p>
					</div>
				</BlockLayout>
			</section>
			<section style={{ border: "dashed yellow 2px" }}>
				<BlockLayout layout={"1"}>
					<h4>
						{" "}
						Nested 3 col cards with <code>{`<Grid />`}</code>
					</h4>
					<p>
						{" "}
						These cards are in a plain <code>{"<div>"}</code> tag. Notice how it
						scoots the containing children slightly in from the parent
					</p>
					<Grid layout={"1_1_1"}>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
						<Card>
							<p>here is some content inside a card element</p>
						</Card>
					</Grid>
				</BlockLayout>
			</section>

			<h2> outside of the layout</h2>
			<p>
				{" "}
				we can use the <code>{`<Grid />`}</code> outside of{" "}
				<code>{`<BlockLayout />`}</code> for more freedom of design
			</p>
			<Grid layout={"1_1_1"} gap={"xl"} style={{ opacity: "10%" }}>
				<Card style={cardStyle}>
					<IoMdContact style={iconStyle} />
				</Card>
				<Card style={cardStyle}>
					<IoIosAirplane style={iconStyle} />
				</Card>
				<Card style={cardStyle}>
					<IoMdAperture style={iconStyle} />
				</Card>
			</Grid>
			<p>making for custom banners or background graphics</p>
			<section className={layout_full}></section>
			<h2> Blocks </h2>
			<p>
				custom react components that can also be used in the rich text editor
				within Keystone document editor
			</p>
			<Blockquote>
				{" "}
				<p> this is a quote n stuffun</p>
			</Blockquote>
		</>
	)
}

const iconStyle = {
	fontSize: "100%",
} as CSSProperties
const cardStyle = {
	fontSize: "100%",
} as CSSProperties
