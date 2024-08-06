import { ImageDynamic } from "@components/elements/ImageDynamic"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
// import { AddToCalendarButton } from 'add-to-calendar-button-react'
type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function FruitPage({ params, searchParams }: Props) {
	return <PageTHeaderMain header={Header()} main={Main()} />
}

function Header() {
	return (
		<>
			<BlockLayout layout={"1"}>
				<div>
					<p>
						{" "}
						This is an example page to view and test typography, custom
						components, colors, etc.{" "}
					</p>
				</div>
			</BlockLayout>
		</>
	)
}

function Main() {
	return (
		<>
			<h2> Typography </h2>
			<section style={{ paddingInline: "1rem" }}>
				<BlockLayout layout={"1"}>
					<div>
						<h1> Headings 1 </h1>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
							tempore iste quam harum assumenda mollitia sunt. Odit eaque
							molestias aperiam aliquid, animi, voluptatibus laborum porro,
							vitae blanditiis consequatur facere non.
						</p>
						<h2> Headings 2 with a laaaaaaaaaaaaaaaaarge word </h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
							ab eligendi quod aliquid deleniti quia, explicabo at recusandae
							sit adipisci incidunt ad cum itaque? Excepturi sint dignissimos
							cumque provident asperiores?
						</p>
						<h3> Headings 3 </h3>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Repudiandae in officia, voluptas culpa amet, quam enim similique
							natus explicabo omnis repellendus delectus, cupiditate ratione
							fuga aperiam saepe est corporis reiciendis?
						</p>
						<h4> Headings 4 </h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
							ipsam, amet corrupti, perspiciatis ratione aut sunt rem maiores
							animi nemo, libero similique quis odio. Tempora magni similique
							dicta necessitatibus. Asperiores?
						</p>
						<h5> Headings 5 </h5>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Laboriosam eaque, tempore omnis molestiae quo, unde tenetur culpa
							quidem placeat quod quae minus? Earum temporibus illo repellat
							rerum animi aliquam vitae?
						</p>
						<h6> Headings 6 </h6>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Recusandae in nam ratione incidunt laudantium earum quo aut quam,
							maxime mollitia aperiam? Aspernatur odio velit sequi ab delectus
							eveniet totam minus.
						</p>

						<h2> Paragaphs: </h2>
						<p>
							{" "}
							Lorem ipsum dolor sit amet <strong> bold text </strong>{" "}
							adipisicing elit. Debitis veritatis similique deleniti perferendis
							rerum eligendi cum enim itaque voluptatem, inventore ducimus
							tempore dolorum reprehenderit voluptas voluptatibus error
							cupiditate numquam recusandae.
						</p>
						<p>
							{" "}
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
							possimus <em> EMPHASIZE INLINE </em> id, ipsa voluptates culpa
							fugit ducimus odio at, rem laudantium explicabo laboriosam
							consequatur quod saepe quaerat eius mollitia eos. Lorem ipsum
							dolor sit amet, consectetur adipisicing elit. Cum neque doloribus
							culpa dicta ipsa necessitatibus optio? Accusantium voluptates
							suscipit temporibus eius explicabo! Delectus quaerat ad sint,
							ratione natus vel laboriosam. Lorem ipsum
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
							Lorem ipsum dolor sit <a href="/"> Inline Link </a> amet
							consectetur adipisicing elit. Reprehenderit doloremque beatae est
							perspiciatis. Recusandae veritatis numquam, quae voluptatem
							reprehenderit qui itaque, libero, corporis deserunt consectetur
							modi. Tenetur iusto impedit incidunt!
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
					</div>
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
				<BlockLayout layout={"1_1"}>
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
			<div
				// style={{display: 'grid', gap: '1rem', marginBlock: '1rem'}}
				className="grid gap-m"
			>
				<button> regular </button>
				<button className="medium button"> medium </button>
				<button className="large button"> large </button>
			</div>

			<h5> buttons in flex</h5>
			<div
				className="flex gap-m"
				// style={{display: 'flex', gap: '1rem', marginBlock: '1rem'}}
			>
				<button> regular </button>
				<button className="medium button"> medium </button>
				<button className="large button"> large </button>
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
						<input type="checkbox" name="yesno" id="yesno" />
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
						<input type="radio" id="huey" name="drone" value="huey" checked />
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
		</>
	)
}
