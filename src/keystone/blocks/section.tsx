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
    backgroundColor: fields.text({
      label: 'Background Color',
      defaultValue: 'transparent'
    }),
    color: fields.text({
      label: 'Text Color',
    }),
    paddingBlock: fields.text({
      label: 'Verticle Padding',
      defaultValue: '10vh'
    }),
  },
  preview: function Preview(props) {
    return (
      <section
        style={{
          backgroundColor: props.fields.backgroundColor.value,
          backgroundImage: props.fields.imageSrc.value,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          color: props.fields.color.value,
          paddingInline: '1rem',
          ...( props.fields.paddingBlock ? {paddingBlock: props.fields.paddingBlock.value} : {})
        }}
      >

        {props.fields.content.element}

      </section>
    );
  },
});