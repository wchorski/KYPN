import React from 'react';
import styles from '@styles/blocs/video.module.scss'
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
