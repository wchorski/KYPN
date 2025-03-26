import { component, fields } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

export const iframe = component({
  label: 'iframe Embed',
  schema: {

    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'transparent'
    }),
    src: fields.text({
      label: 'Embed Source Link',
      defaultValue: ''
    }),
    height: fields.text({
      label: 'Viewport Height',
      defaultValue: '800px'
    }),
  },
  preview: function Preview(props) {
    return (
      <iframe 
        title="Embedded Content" 
        name="htmlComp-iframe" 
        width="100%" height={props.fields.height.value}  
        data-src="" 
        src={props.fields.src.value}
        style={{backgroundColor: props.fields.color.value}}
      >

      </iframe>
    );
  },
});