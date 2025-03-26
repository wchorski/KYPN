import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

const FRONTEND_MOVIE = process.env.FRONTEND_URL + 'movie.mp4'

export const videoLocal = component({
  label: 'Local Video',
  schema: {
    url: fields.url({
      label: 'Video URL',
      defaultValue: FRONTEND_MOVIE,
    }),
    altText: fields.text({
      label: 'Alt text',
      defaultValue: 'Embedded video',
    }),
    autoPlay: fields.checkbox({
      label: 'Autoplay Video',
      defaultValue: false,
    }),
  },
  // todo remove this youtube formating
  preview: function YouTubeVideo(props) {
    const url = props.fields.url.value;
    let embedId = '';
    const parsedUrl = (url || '')
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (parsedUrl[2] !== undefined) {
      const parsedId = parsedUrl[2].split(/[^0-9a-z_\-]/i);
      embedId = parsedId[0];
    } else {
      embedId = url;
    }

    return (
      <NotEditable>
        <div
          style={{
            overflow: 'hidden',
            paddingBottom: '56.25%',
            position: 'relative',
            height: 0,
            // ' iframe': { left: 0, top: 0, height: '100%', width: '100%', position: 'absolute' },
          }}
        >
          <video width="320" height="240" controls>
            <source src={props.fields.url.value} type="video/mp4" />
            {/* <source src="movie.ogg" type="video/ogg" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
      </NotEditable>
    );
  },
});