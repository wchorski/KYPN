'use client'
import { LoadingAnim } from '@components/elements/LoadingAnim'
import { CSSProperties, Suspense, useEffect, useRef, useState } from 'react'
import styles from '@styles/blocs/video.module.scss'
import stylesSlider from '@styles/elements/rangeslider.module.scss'
import { AiFillPauseCircle, AiFillPlayCircle, AiOutlineDownload, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { RiVolumeDownFill } from 'react-icons/ri'
import { fileExtensionRegEx } from '@lib/regexPatterns'

type Props = {
  url:string,
  autoplay?:boolean,
  controls?:boolean,
  preload?:'none'|'metadata',
  isDownloadable?: boolean,
  ariaLabel?:string,
}

 
export function Video({ 
  url, 
  autoplay = true,
  controls = true,
  isDownloadable = false,
  preload = 'metadata',
  ariaLabel = 'Video player'
}:Props) {

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fileExtension, setFileExtension] = useState(url.match(fileExtensionRegEx))

  function handleDownload(){
    console.log('download video');
  }

  function handleFullScreen(){
    console.log('video fullscreen');
    if(!videoRef.current) return
    videoRef.current.requestFullscreen()
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    if(!videoRef.current) return
    const currentVolume = parseFloat(e.target.value);
    videoRef.current.volume = currentVolume
  }

  function fastForward() {
    if(!videoRef.current) return
    videoRef.current.currentTime += 5;
  };

  function revert() {
    if(!videoRef.current) return
    videoRef.current.currentTime -= 5;
  };

  // function onSeek(){
  //   if(!videoRef.current) return
  //   videoRef.current.currentTime = currentTime
  // }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if(!videoRef.current) return
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // useEffect(() => {
  //   if(!videoRef.current) return
  //   const video = videoRef.current;

  //   const updateTime = () => {
  //     setCurrentTime(video.currentTime);
  //   };

  //   const updateDuration = () => {
  //     setDuration(video.duration);
  //     console.log('duration', video.duration);
      
  //   };

  //   video.addEventListener('timeupdate', updateTime);
  //   video.addEventListener('loadedmetadata', updateDuration);

  //   return () => {
  //     video.removeEventListener('timeupdate', updateTime);
  //     video.removeEventListener('loadedmetadata', updateDuration);
  //   };

  
  //   // return () => 
  // }, [])

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration)
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime)
  }
  

  useEffect(() => {
    if(!fileExtension) return
    console.log(fileExtension[0]);
    
    if(!videoRef.current) return

    isPlaying 
      ? videoRef.current.play()
      : videoRef.current.pause()
    
    // return () => 
  }, [isPlaying])
  
 
  return (
   
    <Suspense fallback={<VideoSkeleton />}>

      <figure className={styles.video_wrap} >
        <video 
          ref={videoRef}
          className={styles.video} 
          controls={controls} 
          preload={preload} 
          aria-label={ariaLabel} 
          autoPlay={autoplay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={url} type={`video/${String(fileExtension ? String(fileExtension[0]) : 'mp4')}`} />
          Your browser does not support the video tag.
        </video>
        {!controls && (
          
          <div className={styles.controls}>
            <div className={styles.progress_wrap}>
              {/* <progress max={duration} value={currentTime}></progress> */}
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                step="any"
                onChange={handleSeek}
                className={stylesSlider.slider}
                style={{
                  "--max": duration,
                  '--min': 0,
                  '--value': currentTime,
                } as CSSProperties}
              />
            </div>
            <div className={styles.transport}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                type={'button'}
              >
                {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle /> }
              </button>

              <code>
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
              </code>

              <label htmlFor="volume">
                <RiVolumeDownFill />
                <input 
                  type={'range'}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleVolume}
                  // className={stylesSlider.slider}
                  // style={{
                  //   "--max": duration,
                  //   '--min': 0,
                  //   '--value': currentTime,
                  // } as CSSProperties}
                />
              </label>

              <button 
                onClick={handleFullScreen} 
                type={'button'} 
                style={{marginLeft: 'auto'}}
              >
                {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen /> }
              </button>
              {isDownloadable && (
                <button 
                  onClick={handleDownload} 
                  type={'button'}
                >
                  <AiOutlineDownload />
                </button>
              )}
            </div>
          </div>
        )}
      </figure>
    </Suspense>

  )
}

// type ProgressProps = {
//   duration:number,
//   currentTime:number,
// }

// function ProgressBar({currentTime, duration}:ProgressProps) {
//   return<>
//     <input
//       type="range"
//       step="any"
//       max={duration.toFixed(4)}
//       value={currentTime}
//       // onMouseDown={this._handleMouseDown}
//       // onMouseUp={this._handleMouseUp}
//       onChange={seek}
//       // className={className}
//       // style={{
//       //   backgroundSize: currentTime * 100 / duration + '% 100%',
//       //   ...style,
//       // }}
//     />
//     {/* <progress
//       max={100}
//       value={currentTime * 100}
//     /> */}
//   </>
  
// }

function VideoSkeleton() {

  return (
    <div>
      <p> 
        Loading Video...
        <LoadingAnim />
      </p>
    </div>
  )
}