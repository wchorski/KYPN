// import { Box } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import type { CSSProperties } from 'react';
import React from 'react';

export const imagegallery = component({
  label: 'Image Gallery',
  schema: {
    layout: fields.select({
      label: 'layout',
      options: [
        {label: 'grid', value: 'grid'},
        {label: 'masonry', value: 'masonry'},
      ],
      defaultValue: 'grid'
    }),
    objectFit: fields.select({
      label: 'Image Frame Crop',
      options: [
        {label: 'contain', value: 'contain'},
        {label: 'cover', value: 'cover'},
      ],
      defaultValue: 'contain'
    }),
    columns: fields.integer({ label: 'Columns', defaultValue: 3}),
    gap: fields.integer({label: 'Grid Gap', defaultValue: 3}),
    items: fields.array(
      fields.object({
        caption: fields.text({ label: 'caption' }),
        alt: fields.text({ label: 'alternative text' }),
        src: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
      })
    ),
  },
  preview: function Preview(props) {
    return (
      <NotEditable>
        <div
          style={{
            overflowY: 'scroll',
            display: 'flex',
            scrollSnapType: 'y mandatory',
            width: '17rem',
          }}
        >
          {props.fields.items.elements.map(item => {
            return (
              // <Box
              <div
                key={item.key}
                // margin="xsmall"
                style={{
                  minWidth: '31.8%',
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
                  src={item.fields.src.value}
                  style={{
                    objectFit: props.fields.objectFit.value as CSSProperties['objectFit']|| 'contain',
                    objectPosition: 'center center',
                    height: 240,
                    width: '100%',
                    borderRadius: 4,
                  }}
                />
                <p
                  style={{

                    fontSize: '1.25rem',
                    lineHeight: 'unset',
                    marginTop: 8,

                  }}
                >
                  <strong>{item.fields.alt.value}</strong>
                  
                </p>
                <p
                  style={{

                    fontSize: '1.25rem',
                    lineHeight: 'unset',
          
                  }}
                >
                  {item.fields.caption.value}
                </p>
              </div>
            );
          })}
        </div>
      </NotEditable>
    );
  },
});