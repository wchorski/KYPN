import { Button, Html, Text } from "@react-email/components"
import * as React from "react"

type Props = {
	url: string
}

export default function StarterEmail(props: Props) {
	const { url } = props

	return (
		<Html lang="en">
			<Button href={url}>Click me</Button>
			<Text> hey there starter </Text>
		</Html>
	)
}
