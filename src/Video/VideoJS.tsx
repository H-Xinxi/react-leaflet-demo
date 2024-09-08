import React, { ElementRef, useCallback, useEffect, useRef } from 'react'
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import "video.js/dist/video-js.min.css"
// import "videojs-canvas-plugin"
type Props = {
    options: Record<string, any>,
    onReady?: (player: Player) => void,

}

export const VideoJS = (props:Props) => {
    const videoRef = React.useRef<ElementRef<'div'> | null>(null);
    const playerRef = React.useRef<Player | null>(null);
    const videoElRef = useRef<ElementRef<'video'> | null>(null)
    const {options, onReady} = props;
  
    const canvasRef = useRef<ElementRef<'canvas'> | null>(null)
    
    React.useEffect(() => {
  
      // Make sure Video.js player is only initialized once
      if (!playerRef.current) {
        // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
        const videoElement = document.createElement("video-js");
        
        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current!.appendChild(videoElement);
  
        const player = playerRef.current = videojs(videoElement, options, () => {
          videojs.log('player is ready');
          onReady && onReady(player);
          // const videoElm = document.querySelector('video')!
          // const videoJSElm = document.querySelector('video-js')! as HTMLElement
          // videoJSElm.style.background = "transparent"
          // videoElm.style.pointerEvents = "none"
          // videoElm.style.display = "none";
          // videoRef.current!.onclick = () => {
          //   videoElm.click()
          // }
          // videoRef.current!.style.background='transparent'
        });
        // (player as any).VideoCanvasPlugin()
      // You could update an existing player in the `else` block here
      // on prop change, for example:
      } else {
        const player = playerRef.current;
  
        player.autoplay(options.autoplay);
        player.src(options.sources);
      }
    }, [options, videoRef]);
  
    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
      const player = playerRef.current;
  
      return () => {
        if (player && !player.isDisposed()) {
          player.dispose();
          playerRef.current = null;
        }
      };
    }, [playerRef]);
  

    // const handleVideoFrame = useCallback((a,b) => {
    //     const canvasElm = document.querySelector('canvas')!
    //     const canvas = canvasElm.getContext('2d')
    //     canvasRef.current!.width = videoRef.current!.offsetWidth
    //     canvasRef.current!.height = videoRef.current!.offsetHeight
    //     canvas?.drawImage(videoElRef.current!, 0, 0,videoRef.current!.offsetWidth,videoRef.current!.offsetHeight)
    //     canvas?.moveTo(50,50)
    //     canvas?.lineTo(10,10)
    //     canvas?.stroke()
    //     // console.log(a,b)
    //     videoElRef.current?.requestVideoFrameCallback(handleVideoFrame)
    // },[])
    // useEffect(() => {
    //     if(!videoRef.current) return
    //     videoElRef.current = videoRef.current.querySelector('video')!
    //     videoElRef.current.requestVideoFrameCallback(handleVideoFrame)

    // }, [])
    return (
      <div data-vjs-player className='relative'>
        {/* <canvas ref={canvasRef} className='absolute inset-0'></canvas> */}
        <div ref={videoRef}/>
      </div>
    );
  }
  
  export default VideoJS;