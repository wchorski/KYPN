/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Box } from '@keystone-ui/core';
import { component, fields, NotEditable, } from '@keystone-6/fields-document/component-blocks';
import moneyFormatter from '../../lib/moneyFormatter';
import { envs } from '../../../envs';

const FRONTEND_URL = envs.FRONTEND_URL

export const pricetable = component({
  label: 'Price Table',
  schema: {
    items: fields.array(
      fields.object({
        imageSrc: fields.url({
          label: 'Image URL',
          // defaultValue: FRONTEND_URL + '/assets/placeholder.png',
        }),
        title: fields.text({
          label: 'Custom Title',
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
          style={{
            overflowY: 'scroll',
            display: 'flex',
            scrollSnapType: 'y mandatory',
          }}
        >
          {props.fields.items?.elements.map(item => (
              <Box
                key={item.key}
                margin="xsmall"
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
                
                <NotEditable>

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
                  {item?.fields.title.value || item?.fields.service.value?.data.name}
                </h3>

                <div >
                  <h6 > {moneyFormatter(item?.fields.service.value?.data?.price || 0)} </h6> <span>{item.fields.service.value?.data?.durationInHours} <small>hours</small></span>
                </div>
                </NotEditable>

                <div style={{ color: '#99a4b6', lineHeight: '30px' }}> {item.fields.content.element} </div>

                <NotEditable>
                  <button>{item.fields.buttonLabel.value}</button>
                </NotEditable>
              </Box>
            ))}
        </div>
      // </NotEditable>
    );
  },
});