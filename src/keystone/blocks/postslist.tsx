import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

export const postslist = component({
  label: 'Posts List',
  schema: {
    header: fields.text({
      label: 'Header Title',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    colorOverlay: fields.text({
      label: 'Overlay Color',
      defaultValue: 'rgba(56, 56, 56, 0.63)'
    }),
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'gray'
    }),
 
    categories: fields.relationship({
      label: 'Categories',
      listKey: 'Category',
      selection: 'name',
      many: true,
    })
   
  },
  preview: function Preview(props) {
    return (
      <NotEditable style={{
          backgroundColor: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
        }}
      >

        <h2>{props.fields.header.value}</h2>

        [[ List of Posts ]]

      </NotEditable>
    );
  },
});