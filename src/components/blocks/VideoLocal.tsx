import React from 'react';

import { Video } from './Video';

type YouTubeVideoProps = {
  url: string;
  altText: string;
  autoPlay?: boolean;
};

export function VideoLocal({ url = '', altText = 'Embedded YouTube video', autoPlay = false }: YouTubeVideoProps) {

  return (
    <Video 
      url={url}
      ariaLabel={altText}
      autoplay={autoPlay}
    />
  );
}
