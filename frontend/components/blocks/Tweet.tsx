import React from 'react';
import styled from 'styled-components';

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
    <StyledTweet className='tweet'>
      <blockquote ref={wrapper} className="twitter-tweet" data-conversation="none">
        <a href={url}>Loading tweet...</a>
      </blockquote>
    </StyledTweet>
  );
}

const StyledTweet = styled.div`
  &.tweet {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`