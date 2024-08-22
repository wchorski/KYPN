
'use client'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const card = component({
  label: 'Card',
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
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    bgColor: fields.text({
      label: 'Fallback background color',
      defaultValue: ''
    }),
    padding: fields.integer({
      label: 'Padding',
      defaultValue: 1
    }),
    margin: fields.text({
      label: 'Margin',
      defaultValue: 'var(--space-m)',
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
  preview: function Preview(props) {
    return (

      <div style={{
        padding: props.fields.padding.value + 'rem',
        margin: props.fields.margin.value,
        fontSize: props.fields.fontSize.value + 'rem',
        border: 'solid 3px ' + props.fields.bgColor.value,
        backgroundColor: props.fields.bgColor.value,
        backgroundImage: props.fields.imageSrc.value,
        borderRadius: '5px',
        alignSelf: props.fields.verticleAlign.value,
      }}>
        {props.fields.content.element}
      </div>
    );
  },
});