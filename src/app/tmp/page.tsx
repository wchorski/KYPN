import { nextAuthOptions } from "@/session"
import { ActionForm } from "@components/ActionForm"
import { ContactForm } from "@components/blocks/ContactForm"
import { ActionRegsiterForm } from "@components/forms/ActionRegisterForm"
import { ReactForm } from "@components/forms/ReactForm"
import { FormState } from "@components/FormState"
import { DialogPopup } from "@components/menus/Dialog"
import DialogModalPopup from "@components/menus/DialogModalPopup"
import {
	layout_content,
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { getServerSession } from "next-auth"
import Link from "next/link"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function Page({ params, searchParams }: Props) {
	// const session = await getServerSession(nextAuthOptions)

	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	async function onClose() {
		"use server"
		console.log("modal closed")
	}

	async function onOk() {
		"use server"
		console.log("ok clicked closed")
	}

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_content}>
				<h1>Temporary Page</h1>
			</header>
			<div className={[page_content, layout_content].join(" ")}>
				{/* <ActionForm/>
        <ActionButtonId id={'wc_123'}/> */}
				{/* <ReactForm /> */}
				{/* <ActionRegsiterForm /> */}
				{/* <FormState /> */}
				{/* <ActionButtonTest id={'wc_123'}/> */}
				{/* <ContactForm header={'Contact'} /> */}

				<DialogPopup>
					<p>hey there</p>
				</DialogPopup>

        <p style={{display: 'none'}}>HIII DUDE</p>

				<Link
					href={`?${new URLSearchParams({ popup: "modal" })}`}
					className={"button large"}
					// onClick={() => setIsPopup(true)}
				>
					open popup
				</Link>

				{/* <DialogModalPopup
					open={open}
					onClose={onClose}
					aria-labelledby="todo-title"
					aria-describedby="todo-description"
					className="rounded mt-10 p-4"
				>
					<h3 id="todo-title" className="font-bold text-lg mb-2">
						Create TODO
					</h3>
					<p id="todo-description" className="mb-2">
						Enter the name of the TODO
					</p>
					<form method="dialog">
						<div className="mb-4">
							<label htmlFor="todo-name" className="sr-only">
								TODO
							</label>
							<input
								id="todo-name"
								className="border rounded p-1 w-full"
								value={"myValue"}
								autoFocus
								onChange={(e) => {
									// setValue(e.target.value)
									console.log(e.currentTarget.value)
								}}
							/>
						</div>
						<div className="flex gap-2">
							<button formMethod="dialog" className="flex-1 rounded border p-2">
								Cancel
							</button>
							<button
								value={value}
								disabled={!value}
								className="flex-1 rounded border p-2 bg-black text-white disabled:opacity-50"
							>
								Add
							</button>
						</div>
					</form>
				</DialogModalPopup> */}
			</div>
		</main>
	)
}
