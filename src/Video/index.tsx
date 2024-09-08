// import VideoJS from '@/VideoJS
import React from 'react'
import VideoJS from './VideoJS';

type Props = {}
const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: "/video/xgplayer-demo.m3u8"
  };
const Video = (props: Props) => {
  return (
    <VideoJS options={videoJsOptions}>

    </VideoJS>
  )
}

export default Video