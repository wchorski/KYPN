import React from 'react';
// import { Box, } from '@keystone-ui/core';
import { component, fields, NotEditable, } from '@keystone-6/fields-document/component-blocks';


export const infocardlist = component({
  label: 'Info Card List',
  schema: {
    items: fields.array(
      fields.object({
        content: fields.child({
          kind: 'block',
          placeholder: 'content...',
          formatting: { inlineMarks: 'inherit', softBreaks: 'inherit', alignment: 'inherit' },
          links: 'inherit',
        }),
        header: fields.text({
          label: 'Header Title',
        }),
        buttonLink: fields.text({
          label: 'Button Link',
        }),
        buttonLabel: fields.text({
          label: 'Button Label',
        }),
        imageSrc: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
        color: fields.text({
          label: 'Fallback background color',
          defaultValue: 'paleblue'
        }),
      })
    ),
  },
  preview: function Preview(props) {
    
    
    return (
      // <NotEditable>
        <div
          style={{
            overflowY: 'scroll',
            display: 'flex',
            scrollSnapType: 'y mandatory',
          }}
        >
          {props.fields.items.elements.map(item => {
            return (
              // <Box
              <div
                key={item.key}
                // margin="xsmall"
                style={{
                  minWidth: '61.8%',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always',
                  margin: 4,
                  padding: 4,
                  boxSizing: 'border-box',
                  borderRadius: 6,
                  background: '#eff3f6',
                }}
              >

                <article style={{
                  padding: '1em',
                  backgroundColor: item.fields.color.value,
                  backgroundImage: item.fields.imageSrc.value,
                }}>

                  <NotEditable>
                    <h4>{item.fields.header.value}</h4>
                  </NotEditable>

                  <div>{item.fields.content.element}</div>

                <NotEditable>
                  <button> {item.fields.buttonLabel.value} </button>
                </NotEditable>
                  
                </article>

              </div>
            );
          })}
        </div>
      // </NotEditable>
    );
  },
});