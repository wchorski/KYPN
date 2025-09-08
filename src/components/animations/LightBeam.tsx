type Props = {
	origin?: {
		x?: string
		y?: string
	}
	anim?: {
		delay?: string
	}
	brightness?: number
	diffuse?: number
}

import {
	light_beam,
	light_beam_cone,
	light_beam_core,
} from "@styles/eyecandy/lightbeam.module.css"
import type { CSSProperties } from "react"

export function LightBeam({ origin, anim, brightness = 1.0, diffuse }: Props) {
	return (
		<div
			className={light_beam}
			style={
				{
					"--x": origin?.x,
					"--y": origin?.y,
					"--anim-delay": anim?.delay,
					"--light-brightness": brightness,
					"--light-diffuse": diffuse,
				} as CSSProperties
			}
		>
			<div className={light_beam_cone}></div>
			<div className={light_beam_core}></div>
		</div>
	)
}
