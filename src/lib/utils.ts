export function plainObj(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}

export function pluralizeString(word: string) {
	if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
		return word.slice(0, -1) + "ies"
	}

	return word + "s"
}

export const hasOnlyOneValue = (
	obj: Record<string, any>,
	keysToCheck: string[]
): boolean => {
	const nonNullKeys = keysToCheck.filter(
		(key) => obj[key] !== null && obj[key] !== undefined
	)
	return nonNullKeys.length === 1
}

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
