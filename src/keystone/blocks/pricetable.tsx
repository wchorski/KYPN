/** @jsxRuntime classic */
/** @jsx jsx */

import {
	component,
	fields,
	NotEditable,
} from "@keystone-6/fields-document/component-blocks"
import { Box, jsx } from "@keystone-ui/core"

import moneyFormatter from "../../lib/moneyFormatter"

export const pricetable = component({
	label: "Price Table",
	schema: {
		items: fields.array(
			fields.object({
				service: fields.relationship({
					label: "Service",
					listKey: "Service",
					selection: "id name price durationInHours image",
					many: false,
				}),
				imageSrc: fields.url({
					label: "Image Override",
					// defaultValue:
					// 	"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
				}),
				title: fields.text({
					label: "Title Override",
				}),
				buttonLink: fields.url({
					label: "Button Link Override",
				}),
				buttonLabel: fields.url({
					label: "Button Label Override",
				}),
				content: fields.child({
					kind: "block",
					placeholder: "description...",
					formatting: "inherit",
					links: "inherit",
					dividers: "inherit",
					relationships: "inherit",
				}),
			})
		),
	},
	preview: function Preview(props) {
		return (
			// <NotEditable>
			<div
				style={{
					overflowY: "scroll",
					display: "flex",
					scrollSnapType: "y mandatory",
				}}
			>
				{props.fields.items.elements.map((item, i) => {
					console.log(item.fields.service)
					if (!item.fields.service.value?.data)
						return <p key={i}>no item found for id: {item.fields.service.value?.id}</p>
					return (
						<Box
							key={i}
							margin="xsmall"
							style={{
								minWidth: "61.8%",
								scrollSnapAlign: "center",
								scrollSnapStop: "always",
								margin: 4,
								padding: 4,
								boxSizing: "border-box",
								borderRadius: 6,
								background: "#eff3f6",
							}}
						>
							<NotEditable>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									role="presentation"
									src={
										item.fields.imageSrc.value ||
										item.fields.service.value.data.image
									}
									style={{
										objectFit: "cover",
										objectPosition: "center center",
										height: 240,
										width: "100%",
										borderRadius: 4,
									}}
                  alt="service image"
								/>

								<h3
									style={{
										fontSize: "1.25rem",
										lineHeight: "unset",
										marginTop: 8,
									}}
								>
									{item.fields.title.value ||
										item.fields.service.value?.data.name}
								</h3>
							</NotEditable>

							<div style={{ color: "#99a4b6", lineHeight: "30px" }}>
								{item.fields.content.element}
							</div>

							<NotEditable>
                <hr />
								<div>
									<h6>
										{" "}
										{moneyFormatter(item.fields.service.value?.data.price)}{" "}
									</h6>{" "}
									<span>
										{item.fields.service.value?.data.durationInHours}{" "}
										<small>hours</small>
									</span>
								</div>
							</NotEditable>

							<NotEditable>
								<button>{item.fields.buttonLabel.value || "Book Now"}</button>
							</NotEditable>
						</Box>
					)
				})}
			</div>
			// </NotEditable>
		)
	},
})
