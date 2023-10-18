
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import {Fragment} from 'react';

export const eventsupcoming = component({
  label: 'Upcoming Events List',
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
      defaultValue: 'gray'
    }),
  },
  
  preview: function Preview(props) {
    return (
 
      <NotEditable style={{
        backgroundColor: props.fields.color.value,
        backgroundImage: props.fields.imageSrc.value,
        }}>
        <h2>{props.fields.header.value}</h2>
        [[ List of Events ]]
      </NotEditable>
    
    );
  },
});