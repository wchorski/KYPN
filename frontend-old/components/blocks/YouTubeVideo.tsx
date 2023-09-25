import React from 'react';
import styles from './YouTubeVideo.module.css';
import styled from 'styled-components';

type YouTubeVideoProps = {
  url: string;
  altText: string;
};

export function YouTubeVideo({ url = '', altText = 'Embedded YouTube video' }: YouTubeVideoProps) {
  const embedId = getYouTubeEmbedId(url);

  return (
    <StyledVideo className={`youtubeVideo video-cont`}>
      <div className={`iframePosition`}>
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={altText}
        />
      </div>
    </StyledVideo>
  );
}

function getYouTubeEmbedId(url: string) {
  let embedId = '';
  const parsedUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (parsedUrl[2] !== undefined) {
    const parsedId = parsedUrl[2].split(/[^0-9a-z_\-]/i);
    embedId = parsedId[0];
  } else {
    embedId = url;
  }
  return embedId;
}

const StyledVideo = styled.div`
  &.youtubeVideo {
    display: grid;
    grid-template-columns: minmax(auto, 960px);
    align-items: center;
    justify-content: center;
  }

  .iframePosition {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
  }

  .iframePosition iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`