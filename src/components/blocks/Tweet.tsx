import styles from '@styles/blocs/tweet.module.scss'
import React from 'react';

type TweetProps = {
  url: string;
};

export function Tweet({ url }: TweetProps) {
  const wrapper = React.useRef<HTMLQuoteElement>(null);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    wrapper.current!.appendChild(script);
  }, []);

  return (
    <article className={styles.tweet} >
      <blockquote ref={wrapper} className="twitter-tweet" data-conversation="none">
        <a href={url}>Loading tweet...</a>
      </blockquote>
    </article>
  );
}