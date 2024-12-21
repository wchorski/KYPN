import React from 'react';
import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

//TODO make this a list of buttonss

export const buttonlink = component({
  label: 'Button',
  schema: {
    color: fields.text({
      label: 'Color',
      defaultValue: 'var(--c-accent)',
    }),
    label: fields.text({
      label: 'Label',
      defaultValue: 'buttontext...',
    }),
    link: fields.text({
      label: 'Link',
      defaultValue: '/',
    }),

  },
  preview: function ButtonLink(props) {
    return (
      <NotEditable>
        <button>{props.fields.label.value}</button>
      </NotEditable>
    );
  },
});