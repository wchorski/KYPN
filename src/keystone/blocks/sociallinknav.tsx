import React from 'react';
import {
	component,
	fields,
	NotEditable,
} from "@keystone-6/fields-document/component-blocks"
import { useIcons } from "../../lib/useIcons"

export const sociallinknav = component({
	label: "Social Link Nav",
	schema: {
		// content: fields.child({
		//   kind: 'block',
		//   placeholder: 'content...',
		//   formatting: { inlineMarks: 'inherit', softBreaks: 'inherit', alignment: 'inherit' },
		//   links: 'inherit',
		// }),
		color: fields.text({
			label: "Fallback background color",
			defaultValue: "gray",
		}),
		facebook: fields.text({
			label: "Facebook Page Link",
			defaultValue: "https://www.facebook.com",
		}),
		instagram: fields.text({
			label: "Instagram Page Link",
			defaultValue: "https://www.instagram.com",
		}),
		bandcamp: fields.text({
			label: "Bandcamp Page Link",
			defaultValue: "https://www.bandcamp.com",
		}),
		twitch: fields.text({
			label: "Twitch Page Link",
			defaultValue: "https://www.twitch.com",
		}),
		twitter: fields.text({
			label: "Twitter Page Link",
			defaultValue: "https://www.twitter.com",
		}),
		youtube: fields.text({
			label: "Youtube Page Link",
			defaultValue: "https://www.youtube.com",
		}),
		github: fields.text({
			label: "github Page Link",
			defaultValue: "https://www.github.com",
		}),
		linkedin: fields.text({
			label: "Linkedin Page Link",
			defaultValue: "https://www.linkedin.com",
		}),
		custom1: fields.text({
			label: "Custom Page Link",
			defaultValue: "https://www.custom1.com",
		}),
	},
	preview: function Preview(props) {
		return (
			<NotEditable>
				<nav
					style={{
						padding: "1em",
						fontSize: "22px",
						display: "flex",
						gap: "5px",
						color: "var(--c-primary)",
					}}
				>
					{useIcons(props.fields.facebook.value)}
					{useIcons(props.fields.instagram.value)}
					{useIcons(props.fields.bandcamp.value)}
					{/* {useIcons(props.fields.bandlab.value)} */}
					{useIcons(props.fields.twitch.value)}
					{useIcons(props.fields.twitter.value)}
					{useIcons(props.fields.youtube.value)}
					{useIcons(props.fields.github.value)}
					{useIcons(props.fields.linkedin.value)}
					{useIcons(props.fields.custom1.value)}
				</nav>
			</NotEditable>
		)
	},
})
