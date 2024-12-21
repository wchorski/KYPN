import React from 'react';

// import { Box } from '@keystone-ui/core';
import { component, fields, NotEditable, } from '@keystone-6/fields-document/component-blocks';

export const imagelinklist = component({
  label: 'Image Link List',
  schema: {
    isLink: fields.checkbox({label: 'Display Link', defaultValue: true}),
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
        imageSize: fields.text({
          label: 'Image Size',
          defaultValue: '250px',
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
            maxWidth: '40rem',
          }}
        >
          {props.fields.items.elements.map(item => {
            return (
              // <Box
              <div
                key={item.key}
                // margin="xsmall"
                style={{
                  minWidth: '21.8%',
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
                }}>
                  <img src={item.fields.imageSrc.value} style={{width: '150px'}}/>

                  <NotEditable>
                    <h6>{item.fields.header.value}</h6>
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