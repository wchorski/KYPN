import React from 'react';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const infocard = component({
  label: 'Info Card',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'content...',
      formatting: { 
        headingLevels: [2,3,4,5,6],
        inlineMarks: 'inherit', 
        softBreaks: 'inherit', 
        alignment: 'inherit', 
      },
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
      defaultValue: 'Gainsboro'
    }),
    padding: fields.integer({
      label: 'Padding',
      defaultValue: 1
    }),
    fontSize: fields.text({
      label: 'Font Size',
      defaultValue: '1'
    }),
    width: fields.select({
      label: 'Verticle Alignment',
      options: [
        { label: 'full width', value: 'initial' },
        { label: 'fit content', value: 'fit-content' },
      ],
      defaultValue: 'initial'
    }),
    verticleAlign: fields.select({
      label: 'Verticle Alignment',
      options: [
        { label: 'start', value: 'start' },
        { label: 'center', value: 'center' },
        { label: 'end', value: 'end' },
      ],
      defaultValue: 'start'
    })
  },
  preview: function Quote(props) {
    return (

      <article style={{
        padding: props.fields.padding.value + 'rem',
        fontSize: props.fields.fontSize.value + 'rem',
        border: 'solid 3px ' + props.fields.color.value,
        backgroundColor: props.fields.color.value,
        backgroundImage: props.fields.imageSrc.value,
        borderRadius: '5px',
      }}>

        <h4>{props.fields.header.value}</h4>

        <div>{props.fields.content.element}</div>

        <button> {props.fields.buttonText.value || 'button n/a'} </button>
        
      </article>
    );
  },
});