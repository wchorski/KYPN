
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const infocard = component({
  label: 'Info Card',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'content...',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit', alignment: 'inherit' },
      links: 'inherit',
    }),
    header: fields.text({
      label: 'Header Title',
    }),
    buttonLink: fields.text({
      label: 'Button Link',
    }),
    buttonText: fields.text({
      label: 'Button Label',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'gray'
    }),
  },
  preview: function Quote(props) {
    return (

        <article style={{
          padding: '1em',
          backgroundColor: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
        }}>

          <h4>{props.fields.header.value}</h4>

          <div>{props.fields.content.element}</div>

          <button> {props.fields.buttonText.value} </button>
          
        </article>
    );
  },
});