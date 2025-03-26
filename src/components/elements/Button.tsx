"use client"

import styles from "@styles/elements/button.module.css"
import type { ReactNode} from "react";

import { ButtonText } from "./ButtonText"

type Props = {
	size?: "small" | "medium" | "large"
	type?: HTMLButtonElement['type']
	children: ReactNode | ReactNode[]
	onClick?: (e: any) => any
	disabled?: boolean
}

export function Button({
	size = "medium",
	type = "button",
	children,
	onClick,
	disabled = false,
}: Props) {
	const styleIsPend = [styles.button]
	return (
		<button
			className={[styles.button, size, "button"].join(" ")}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			<ButtonText isAnim={disabled}> {children} </ButtonText>
		</button>
	)
}
