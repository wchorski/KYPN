import { NoData } from "@components/elements/NoData"
import {table} from "@styles/elements/table.module.css"
import { layout_wide } from "@styles/layout.module.css"
import Link from "next/link"
import React from "react"

interface TableProps {
	caption: string
	rows: {cells: {text:string}[]}[]
	headers?: {text:string}[]
	route?: string
}

export function Table({ caption, rows, headers, route }: TableProps) {
	const keys = headers || []
	const linkterms = [
		"link",
		"url",
		"uri",
		"a",
		"anchor",
		"account",
		"details",
		"info",
	]

	return (
		<div role="region" aria-labelledby="Cap" tabIndex={0} className={layout_wide}>
			<table className={table} role="table">
				<caption role="caption"> {caption} </caption>

				<thead role="rowgroup">
					<tr role="row">
						{headers && headers.map((header, i) => (
							<th key={i} role="columnheader">
								{header.text}
							</th>
						))}
					</tr>
				</thead>

				<tbody role="rowgroup">
					{rows.length > 0 ? (
						rows.map((row, i) => (
							<tr key={i} role="row">
                {/* {JSON.stringify(row, null, 2)} */}
                
								{row.cells.length > 0 && row.cells.map((cell, i) => (
									<td key={i} data-cell={cell.text} role="cell">
										{route && linkterms.includes(cell.text) ? (
											<Link href={`${route}/${cell.text}`}> {cell.text} </Link>
										) : (
											cell.text
										)}
									</td>
								))}
							</tr>
						))
					) : (
						<NoData />
					)}
				</tbody>
			</table>
		</div>
	)
}

// example component
{
	/* <Table
      caption='Pokemon'
      route='/pokemon'
      headers={[
        'name',
        'type',
        'height',
        'weight',
        'baseExp',
        'link'
      ]}
      cells={[
        {
          name: 'pikachu',
          type: 'electric',
          height: '0.4',
          weight: '6.0',
          baseExp: '112',
        },
        {
          name: 'Charmander',
          type: 'Fire',
          height: '0.6',
          weight: '8.5',
          baseExp: '62',
        },
      ]}
    /> */
}