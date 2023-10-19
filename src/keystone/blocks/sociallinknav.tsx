'use client'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const sociallinknav = component({
  label: 'Social Link Nav',
  schema: {
    // content: fields.child({
    //   kind: 'block',
    //   placeholder: 'content...',
    //   formatting: { inlineMarks: 'inherit', softBreaks: 'inherit', alignment: 'inherit' },
    //   links: 'inherit',
    // }),
    color: fields.text({
      label: 'Fallback background color',
      defaultValue: 'gray'
    }),
    facebook: fields.text({
      label: 'Facebook',
      defaultValue: 'https://www.facebook.com'
    }),
    instagram: fields.text({
      label: 'instagram',
      defaultValue: 'https://www.instagram.com'
    }),
    bandcamp: fields.text({
      label: 'bandcamp',
      defaultValue: 'https://www.bandcamp.com'
    }),
    twitch: fields.text({
      label: 'twitch',
      defaultValue: 'https://www.twitch.com'
    }),
    twitter: fields.text({
      label: 'twitter',
      defaultValue: 'https://www.twitter.com'
    }),
    youtube: fields.text({
      label: 'youtube',
      defaultValue: 'https://www.youtube.com'
    }),
    github: fields.text({
      label: 'github',
      defaultValue: 'https://www.github.com'
    }),
    linkedin: fields.text({
      label: 'linkedin',
      defaultValue: 'https://www.linkedin.com'
    }),
    custom1: fields.text({
      label: 'custom1',
      defaultValue: 'https://www.custom1.com'
    }),
  },
  preview: function Preview(props) {
    return (
      <NotEditable>
        <nav style={{
          padding: '1em',
        }}>

          <h4> Social Nav Links</h4>

          
          
        </nav>
      </NotEditable>

    );
  },
});