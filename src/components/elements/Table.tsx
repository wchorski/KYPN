// cred - chatgpt lol
import {table} from "@styles/elements/table.module.css"
import Link from "next/link"
import React from "react"

import { NoData } from "./NoData"

interface TableProps {
	caption: string
	cells: object[]
	rows?: object[]
	headers?: string[]
	route?: string
}

export function Table({ caption, cells, headers, route }: TableProps) {
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

	// ? if u want to automatically grab keys from object
	// const [keys, setKeys] = useState<any>(Object.keys(cells[0]))
	// // Extract the keys from the first item in the data array
	// useState(() => {
	//   if (cells.length > 0) {
	//     setKeys(Object.keys(cells[0]))
	//   }
	// }, [cells]);
  

	return (
		<div role="region" aria-labelledby="Cap" tabIndex={0}>
			<table className={table} role="table">
				<caption role="caption"> {caption} </caption>

				<thead role="rowgroup">
					<tr role="row">
						{keys.map((key: string) => (
							<th key={key} role="columnheader">
								{key}
							</th>
						))}
					</tr>
				</thead>

				<tbody role="rowgroup">
					{cells.length > 0 ? (
						cells.map((item: any, i: number) => (
							<tr key={i} role="row">
								{keys.map((key: string) => (
									<td key={key} data-cell={key} role="cell">
										{route && linkterms.includes(key) ? (
											<Link href={`${route}/${item[key]}`}> {key} </Link>
										) : (
											item[key]
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

function AddTableARIA() {
	try {
		var allTables = document.querySelectorAll("table")
		for (var i = 0; i < allTables.length; i++) {
			allTables[i].setAttribute("role", "table")
		}
		var allCaptions = document.querySelectorAll("caption")
		for (var i = 0; i < allCaptions.length; i++) {
			allCaptions[i].setAttribute("role", "caption")
		}
		var allRowGroups = document.querySelectorAll("thead, tbody, tfoot")
		for (var i = 0; i < allRowGroups.length; i++) {
			allRowGroups[i].setAttribute("role", "rowgroup")
		}
		var allRows = document.querySelectorAll("tr")
		for (var i = 0; i < allRows.length; i++) {
			allRows[i].setAttribute("role", "row")
		}
		var allCells = document.querySelectorAll("td")
		for (var i = 0; i < allCells.length; i++) {
			allCells[i].setAttribute("role", "cell")
		}
		var allHeaders = document.querySelectorAll("th")
		for (var i = 0; i < allHeaders.length; i++) {
			allHeaders[i].setAttribute("role", "columnheader")
		}
		// this accounts for scoped row headers
		var allRowHeaders = document.querySelectorAll("th[scope=row]")
		for (var i = 0; i < allRowHeaders.length; i++) {
			allRowHeaders[i].setAttribute("role", "rowheader")
		}
	} catch (e) {
		console.log("AddTableARIA(): " + e)
	}
}
// todo add back later ERROR
// client.js:1  Warning: Extra attributes from the server: role
//     at caption
// AddTableARIA();
