"use client"
import { testAction } from "@lib/actions/testAction"
//TODO React 19 function not avail for KYPN stack
//? continue to use useFormState
// import { useActionState } from "react"

type Props = {
	prop?: string
}

export function ActionForm({ prop }: Props) {
	// const [state, action, isPending] = useActionState(testAction, null)
	return (
		<form
		// action={action}
		>
			<legend>Action Form</legend>
			<label>
				<span> text</span>
				<input type="text" name="text" placeholder="type here..." />
			</label>
			<button
				type={"submit"}
				// disabled={isPending}
			>
				submit
			</button>
			<p
			// className={isPending ? "pending" : ""}
			// aria-hidden={"true"}
			>
				{" "}
				submitting...{" "}
			</p>

			{/* <p
				className={error ? "error" : ""}
				aria-hidden={error ? "false" : "true"}
			>
				{" "}
				ERROR:{error}
			</p> */}
		</form>
	)
}

export function ActionButtonId({ id }: { id: string }) {
	// const [state, action, isPending] = useActionState(getTestId, null)

	return (
		<button
		// onClick={() => action(id)}
		>
			Print Id
		</button>
	)
}
