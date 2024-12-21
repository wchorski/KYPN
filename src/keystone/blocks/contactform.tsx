import React from 'react';
import {
	component,
	fields,
	NotEditable,
} from "@keystone-6/fields-document/component-blocks"

export const contactform = component({
	label: "Contact Form",
	schema: {
		header: fields.text({
			label: "Header Title",
		}),
		imageSrc: fields.url({
			label: "Image URL",
			defaultValue: "",
		}),
		color: fields.text({
			label: "Fallback background color",
			defaultValue: "",
		}),

		buttonLabel: fields.text({
			label: "Button Label",
			defaultValue: "Submit",
		}),
		isName: fields.checkbox({ label: "Name Field", defaultValue: true }),
		isPhone: fields.checkbox({
			label: "Phone Number Field",
			defaultValue: true,
		}),
		isDate: fields.checkbox({
			label: "Calendar Date Field",
			defaultValue: true,
		}),
		isNotes: fields.checkbox({
			label: "General Notes Field",
			defaultValue: true,
		}),
	},
	preview: function Quote(props) {

    const { isName, isPhone, isDate, isNotes, header} = props.fields
		return (
			<article
				style={{
					backgroundColor: props.fields.color.value,
					backgroundImage: props.fields.imageSrc.value,
				}}
			>
				<h2>{header.value}</h2>
        <ul>
          {isName && <li> name: ___ </li>}
          {isPhone && <li> phone:___  </li>}
          {isDate && <li> date:___  </li>}
          {isNotes && <li> notes:___  </li>}
        </ul>
			</article>
		)
	},
})
