/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

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
        css={{
          backgroundColor: '#f3f5f6',
          padding: '5px',
          position: 'relative',
          borderRadius: 6,
          display: 'flex',
          flexDirection: props.fields.rowReverse ? 'row-reverse' : 'row',
        }}
      >
        <div css={{ fontStyle: 'italic', color: '#4A5568', flex: '1',}}>
          {props.fields.content.element}
        </div>
        <div 
          css={{ 
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
            css={{width: '1px', height: '1px', display: 'none'}}
            src={String(props.fields.imageSrc.value)} 
            alt={String(props.fields.imageAlt.value)}
          />
         
        </div>
      </div>
    );
  },
});