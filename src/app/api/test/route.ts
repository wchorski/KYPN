import { keystoneContext } from "@ks/context"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const request = await req.json()
	const { formData } = request

	try {
		console.log("### Test formData: ", formData)

		const data = (await { message: "Hello There", status: "ok" })

		return NextResponse.json({ ...data }, { status: 222 })

	} catch (error) {
		console.log("!!! /api/test ERROR: ", error)
		return NextResponse.json({ error }, { status: 555 })
	}
}
