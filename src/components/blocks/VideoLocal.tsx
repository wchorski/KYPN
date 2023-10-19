import React from 'react';
import styles from '@styles/blocs/video.module.scss'

type YouTubeVideoProps = {
  url: string;
  altText: string;
};

export function VideoLocal({ url = '', altText = 'Embedded YouTube video' }: YouTubeVideoProps) {
  const embedId = getYouTubeEmbedId(url);

  return (
    <div className={styles.youtubeVideo}>
      <div className={styles.iframePosition}>
        <video width="320" height="240" controls>
          <source src={url} type="video/mp4" />
          {/* <source src="movie.ogg" type="video/ogg" /> */}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
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
