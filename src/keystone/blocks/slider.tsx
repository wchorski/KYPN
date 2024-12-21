import React from 'react';

// import { Box } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const slider = component({
  label: 'Slider',
  preview: function Preview(props) {
    return (
      <NotEditable>
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
                  padding: 8,
                  boxSizing: 'border-box',
                  borderRadius: 6,
                  background: '#eff3f6',
                }}
              >
                <img
                  role="presentation"
                  src={item.fields.imageSrc.value}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    height: 240,
                    width: '100%',
                    borderRadius: 4,
                  }}
                />
                <h3
                  style={{
                 
                      fontSize: '1.25rem',
                      lineHeight: 'unset',
                      marginTop: 8,
                  
                  }}
                >
                  {item.fields.title.value}
                </h3>
              </div>
            );
          })}
        </div>
      </NotEditable>
    );
  },
  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({ label: 'Title' }),
        excerpt: fields.text({ label: 'Sub Title' }),
        color: fields.text({ label: 'Background Color' }),
        buttonLink: fields.text({ label: 'Button Link' }),
        buttonText: fields.text({ label: 'Button Text' }),
        imageSrc: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
        template: fields.integer({ label: 'Template', defaultValue: 0}),
      })
    ),
  },
});