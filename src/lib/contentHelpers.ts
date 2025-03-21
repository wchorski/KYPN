import type {  KSHeading, TOCLink  } from "@ks/types"

import { slugFormat } from "./slugFormat"

export function isEmptyDocument(document: any) {
	if (!document) return true
	if (
		document.length === 1 &&
		document[0].type === "paragraph" &&
		document[0].children[0].text === ""
	) {
		return true
	}

	return false
}

export function findAllHeadings(arr: any) {
	return arr.reduce((acc: TOCLink[], item: KSHeading) => {
		if (item.type === "heading") {
			const newItem = {
				type: item.type,
				level: item.level,
				slug: slugFormat(item.children[0].text),
				text: item.children.map((item) => item.text).join(" "),
			}
			acc.push(newItem)
		}

		for (let key in item) {
			const typedKey = key as keyof KSHeading

			if (Array.isArray(item[typedKey])) {
				acc = acc.concat(findAllHeadings(item[typedKey]))
			} else if (
				typeof item[typedKey] === "object" &&
				item[typedKey] !== null
			) {
				acc = acc.concat(findAllHeadings([item[typedKey]]))
			}
		}

		return acc
	}, [])
}

export function plainObj(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}
