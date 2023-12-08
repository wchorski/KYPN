/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const imagegallery = component({
  label: 'Gallery',
  schema: {
    layout: fields.select({
      label: 'layout',
      options: [
        {label: 'grid', value: 'grid'},
        {label: 'masonry', value: 'masonry'},
      ],
      defaultValue: 'grid'
    }),
    columns: fields.integer({ label: 'Columns', defaultValue: 3}),
    gap: fields.integer({label: 'Grid Gap', defaultValue: 1}),
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
          }}
        >
          {props.fields.items.elements.map(item => {
            return (
              <Box
                key={item.key}
                margin="xsmall"
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
                    objectFit: 'contain',
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
              </Box>
            );
          })}
        </div>
      </NotEditable>
    );
  },
});