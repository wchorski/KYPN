export function plainObj(obj:any){
  return JSON.parse(JSON.stringify(obj))
}

export function pluralizeString(word: string) {
	if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
		return word.slice(0, -1) + "ies"
	}

	return word + "s"
}