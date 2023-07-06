import React from 'react';
import styles from './YouTubeVideo.module.css';
import styled from 'styled-components';

type YouTubeVideoProps = {
  url: string;
  altText: string;
};

export function VideoLocal({ url = '', altText = 'Embedded YouTube video' }: YouTubeVideoProps) {
  const embedId = getYouTubeEmbedId(url);

  return (
    <StyledVideo className={`youtubeVideo`}>
      <div className={`iframePosition`}>
        <video width="320" height="240" controls>
          <source src={url} type="video/mp4" />
          {/* <source src="movie.ogg" type="video/ogg" /> */}
          Your browser does not support the video tag.
        </video>
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
    background-color: #131313;
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

  .iframePosition video {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`