'use client'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const section = component({
  label: 'Section Background',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'content...',
      formatting: 'inherit',
      links: 'inherit',
      dividers: 'inherit',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'transparent'
    }),
  },
  preview: function Preview(props) {
    return (
      <section
        style={{
          backgroundColor: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >

        {props.fields.content.element}

      </section>
    );
  },
});