import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import React from 'react';

export const tweet = component({
  label: 'Tweet',
  schema: {
    url: fields.url({
      label: 'Tweet URL',
      defaultValue:
        'https://twitter.com/KeystoneJS/status/1558944015953068032?s=20&t=32A2Avz9kPlefEOcXIqOXQ',
    }),
  },
  preview: function Preview(props) {
    // const wrapper = useRef<HTMLQuoteElement>(null);
    
    // useEffect(() => {
      //   const script = document.createElement('script');
      //   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      //   wrapper.current!.appendChild(script);
      // }, []);

    // const wrapper = null;
    // const script = document.createElement('script');
    // script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    // wrapper.current!.appendChild(script);

    return (
      <NotEditable>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <blockquote className="twitter-tweet" data-conversation="none">
            <a href={props.fields.url.value}>{`[BROKEN client side only?] Loading tweet...`}</a>
          </blockquote>
        </div>
      </NotEditable>
    );
  },
});