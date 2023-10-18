
/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, jsx } from '@keystone-ui/core';
import { component, fields, NotEditable, } from '@keystone-6/fields-document/component-blocks';
import moneyFormatter from '../../lib/moneyFormatter';

export const pricetable = component({
  label: 'Price Table',
  schema: {
    items: fields.array(
      fields.object({
        imageSrc: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
        title: fields.text({
          label: 'Title',
        }),
        service: fields.relationship({
          label: 'Service',
          listKey: 'Service',
          selection: 'id name price durationInHours',
          many: false,
        }),
        buttonLink: fields.url({
          label: 'Button Link',
          defaultValue: '/pricing',
        }),
        buttonLabel: fields.url({
          label: 'Button Label',
          defaultValue: 'Book Now',
        }),
        content: fields.child({
          kind: 'block',
          placeholder: 'description...',
          formatting: 'inherit',
          links: 'inherit',
          dividers: 'inherit',
          relationships: 'inherit',
        }),
      })
    ),
  },
  preview: function Preview(props) {
    
    
    return (
      // <NotEditable>
        <div
          css={{
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
                css={{
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
                <NotEditable>

                <img
                  role="presentation"
                  src={item.fields.imageSrc.value}
                  css={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    height: 240,
                    width: '100%',
                    borderRadius: 4,
                  }}
                  />

                <h3
                  css={{
                    '&&': {
                      fontSize: '1.25rem',
                      lineHeight: 'unset',
                      marginTop: 8,
                    },
                  }}
                  >
                  {item.fields.title.value || item.fields.service.value?.data.name}
                </h3>

                <div >
                  <h6 > {moneyFormatter(item.fields.service.value?.data.price)} </h6> <span>{item.fields.service.value?.data.durationInHours} <small>hours</small></span>
                </div>
                </NotEditable>

                <div css={{ color: '#99a4b6', lineHeight: '30px' }}> {item.fields.content.element} </div>

                <NotEditable>
                  <button>{item.fields.buttonLabel.value}</button>
                </NotEditable>
              </Box>
            );
          })}
        </div>
      // </NotEditable>
    );
  },
});