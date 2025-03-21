import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

export const hero = component({
  label: 'Hero',
  schema: {
    imageSrc: fields.text({
      label: 'Image URL',
      defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    }),
    color: fields.text({
      label: 'Text Color',
    }),
    caption: fields.conditional(fields.checkbox({ label: 'Has caption' }), {
      false: fields.empty(),
      true: fields.child({
        kind: 'block',
        placeholder: 'Write a caption...',
        formatting: 'inherit',
        links: 'inherit',
      }),
    }),
  },
  preview: function Hero(props) {
    return (
      <div>
        <NotEditable>
          <div
            style={{
              backgroundImage: `url(${props.fields.imageSrc.value})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              minHeight: 200,
              width: '100%',
              ...(props.fields.color ? {color: props.fields.color.value } : {})
            }}
          />
        </NotEditable>
        {props.fields.caption.discriminant ? (
          <div style={{ textAlign: 'center' }}>{props.fields.caption.value.element}</div>
        ) : null}
      </div>
    );
  },
});