
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const eventsupcoming = component({
  label: 'Upcoming Events',
  schema: {
    header: fields.text({
      label: 'header title...',
    }),
  },
  preview: function Preview(props) {
    return (
      <div>
        <h2>{props.fields.header.value}</h2>
        <NotEditable>
          [[ List of Events ]]
        </NotEditable>
      </div>
    );
  },
});