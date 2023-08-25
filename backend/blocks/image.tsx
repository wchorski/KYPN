
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
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'lightgray'
    }),
  },
  preview: function Quote(props) {
    return (

        <figure style={{
          padding: '0',
          margin: '0',
          backgroundColor: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
          width: '100%'
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