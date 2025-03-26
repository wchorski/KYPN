import { component, fields } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

import { colorThemeOptions, getColorTheme } from '../../lib/styleHelpers';

export const section = component({
  label: 'Section Background',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'content...',
      formatting: 'inherit',
      links: 'inherit',
      dividers: 'inherit',
    }),
    imageSrc: fields.url({
      label: 'Image URL',
    }),
    // backgroundColor: fields.text({
    //   label: 'Background Color',
    //   defaultValue: 'transparent'
    // }),
    // color: fields.text({
    //   label: 'Text Color',
    // }),
    colorTheme: fields.select({
      label: 'Color Theme',
      options: colorThemeOptions,
      defaultValue: 'bg_c_plain'
    }),
    paddingBlock: fields.text({
      label: 'Verticle Padding',
      defaultValue: '10vh'
    }),
  },
  preview: function Preview(props) {
    const clrTheme = getColorTheme(props.fields.colorTheme.value)
    
    return (
      <section
        style={{
          // backgroundColor: props.fields.backgroundColor.value,
          // color: props.fields.color.value,
          backgroundImage: props.fields.imageSrc.value,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          paddingInline: '1rem',
          ...( props.fields.paddingBlock ? {paddingBlock: props.fields.paddingBlock.value} : {})
        }}
        className={clrTheme} 
      >

        {props.fields.content.element}

      </section>
    );
  },
});