
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const contactform = component({
  label: 'Contact Form',
  schema: {

    header: fields.text({
      label: 'Header Title',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'var(--c-desaturated)'
    }),

    buttonLabel: fields.text({
      label: 'Button Label',
      defaultValue: 'Submit'
    }),
    isName: fields.checkbox({ label: 'Name Field', defaultValue: true }),
    isPhone: fields.checkbox({ label: 'Phone Number Field', defaultValue: true }),
    isDate: fields.checkbox({ label: 'Calendar Date Field', defaultValue: true }),
    isNotes: fields.checkbox({ label: 'General Notes Field', defaultValue: true }),
  },
  preview: function Quote(props) {
    return (

        <article style={{
          backgroundColor: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
        }}>

          <h2>{props.fields.header.value}</h2>

          
        </article>
    );
  },
});