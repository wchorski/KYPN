// import { Box } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

export const carousel = component({
  label: 'Carousel',
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
                <h1
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: 'unset',
                    marginTop: 8,    
                  }}
                >
                  {item.fields.title.value}
                </h1>
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
        imageSrc: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
      })
    ),
  },
});