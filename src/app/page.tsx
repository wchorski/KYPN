import { envs } from "@/envs"
import Link from "next/link"
import React from "react"

export default async function HomePage() {
	return (
		<section>
			<h1>{envs.SITE_TITLE}</h1>
			<Link href={`/home`}> Users </Link>
		</section>
	)
}
