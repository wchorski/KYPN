'use client'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const image = component({
  label: 'Image',
  schema: {

    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    alt: fields.url({
      label: 'Image Alt Text',
      defaultValue: '',
    }),
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'lightgray'
    }),
    padding: fields.integer({
      label: 'Frame Padding',
      defaultValue: 1
    }),
    border: fields.integer({
      label: 'Frame Border',
      defaultValue: 0
    }),
    width: fields.integer({
      label: 'Frame Width',
      defaultValue: 0
    }),
  },
  preview: function Quote(props) {

    const currWidth = (props.fields.width.value > 0) 
      ? props.fields.width.value
      : '100%'

    return (

        <figure style={{
          padding: props.fields.padding.value + 'px',
          border: `solid lightgrey ${props.fields.border.value}px`,
          margin: '0',
          backgroundColor: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
          width: currWidth,
          // width: props.fields.width.value + 'px',
          marginInline: 'auto',
        }}>
          <img 
            src={props.fields.imageSrc.value} 
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
          
        </figure>
    );
  },
});