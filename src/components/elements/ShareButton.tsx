"use client"
import { btn_msg, btn_msg_reveal, btn_share } from "@styles/elements/button.module.css"
import { useState } from "react"
import { BsShare } from "react-icons/bs"

type Props = {
	textToCopy: string
}

export function ShareButton({ textToCopy }: Props) {
	const [isCopied, setIsCopied] = useState(false)

	function onClick() {
		navigator.clipboard.writeText(textToCopy)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000) //
	}

	const hiddenStyle = {}

	return (
		<div className={btn_share}  style={{ display: "flex", gap: "var(--space-s)" }}>
			<button
				className={["sub-text", "sub-text"].join(" ")}
				title="copy share link"
				onClick={onClick}
				style={{
					border: "none",
					padding: "var(--space-s)",
					display: "flex",
					alignItems: "center",
					gap: "var(--space-s)",
          zIndex: '3'
				}}
			>
				<BsShare />
				<span> Share</span>
			</button>

			<span
				className={[
					"sub-text",
					"sub-text",
					btn_msg,
					isCopied ? btn_msg_reveal : "",
				].join(" ")}
			>
				{" "}
				link copied{" "}
			</span>
		</div>
	)
}
