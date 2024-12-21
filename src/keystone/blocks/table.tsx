import React from 'react';

// todo - is there anyway to make the ui more user friendly instead of nesting hell?
import {
	component,
	fields,
	NotEditable,
} from "@keystone-6/fields-document/component-blocks"

export const table = component({
	label: "Table",

	schema: {
		caption: fields.text({
			label: "Caption",
			defaultValue: "",
		}),
		headers: fields.array(
			fields.object({
				text: fields.text({
					label: "Table Header",
					defaultValue: "",
				}),
			})
		),
		rows: fields.array(
			fields.object({
				cells: fields.array(
					fields.object({
						text: fields.text({
							label: "Cell Item",
							defaultValue: "",
						}),
					})
				),
			})
		),
	},
	preview: function Table(props) {
		return (
			<NotEditable>
				<table>
					{props.fields.caption.value && (
						<caption>{props.fields.caption.value}</caption>
					)}
					<thead>
						<tr>
							{props.fields.headers.elements.length > 0 &&
								props.fields.headers.elements.map((head) => (
									<th key={head.key}> {head.fields.text.value}</th>
								))}
						</tr>
					</thead>
					<tbody>
						{/* {JSON.stringify(props.fields.cells, null, 2)} */}
						{props.fields.rows.elements.map((row) => (
							<tr key={row.key}>
								{row.fields.cells.elements.map((cell) => (
									<td key={cell.key}> {cell.fields.text.value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</NotEditable>
		)
	},
})
