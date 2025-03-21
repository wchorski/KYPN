import { component, fields } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

export const mediatext = component({
  label: 'Media & Text',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'text...',
      formatting: {  headingLevels: [3,4,5,6], inlineMarks: 'inherit', softBreaks: 'inherit', alignment: 'inherit' },
      links: 'inherit',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    imageAlt: fields.text({
      label: 'Image Alt Text',
      defaultValue: 'no alt text'
    }),
    rowReverse: fields.checkbox({ label: 'Swap Left Right Positions' }),
  },
  
  preview: function Quote(props) {
    return (
      <div
        style={{
          backgroundColor: '#f3f5f6',
          padding: '5px',
          position: 'relative',
          borderRadius: 6,
          display: 'flex',
          flexDirection: props.fields.rowReverse.value ? 'row-reverse' : 'row',
        }}
      >
        <div style={{ fontStyle: 'italic', color: '#4A5568', flex: '1', padding: '10px'}}>
          {props.fields.content.element}
        </div>
        <div 
          style={{ 
            fontWeight: 'bold', 
            color: '#47546b', 
            background: `url(${props.fields.imageSrc.value})`,
            height: '100%',
            minHeight: '250px',
            width: '50%',
            backgroundSize: 'contain',
            backgroundPosition: '50% 50%',
          }}
        >

          <img 
            style={{width: '1px', height: '1px', display: 'none'}}
            src={String(props.fields.imageSrc.value)} 
            alt={String(props.fields.imageAlt.value)}
          />
         
        </div>
      </div>
    );
  },
});