import { Graphics, Sprite } from '@pixi/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Graphics as PixiGraphics } from 'pixi.js-legacy'
import { usePixiOverlayUtils, useProject, useScale } from '@/pixi/hooks'
import L from 'leaflet'
import { addHours } from 'date-fns'
import planeIconUrl from '@/assets/plane.png'
import Plane from '@/components/Plane'
import anime, { AnimeInstance } from 'animejs'
import MapUI from '@/pixi/MapUI'
import { Slider } from '@/components/ui/slider'
import { time } from 'console'
type Props = {}
const now = Date.now()
const LeafletPlanePlayback = (props: Props) => {
  const { latLngToLayerPoint } = usePixiOverlayUtils()
  const [x, y] = useProject(L.latLng(50, 0))
  const scale = useScale()
  const paths = [
    {
      lat: 0,
      lng: 50,
      time: now,
    },
    {
      lat: 10,
      lng: 50,
      time: addHours(now, 1).valueOf(),
    },
    {
      lat: 11,
      lng: 55,
      time: addHours(now, 1.5).valueOf(),
    },
  ]
  const draw = useCallback(
    (graphics: PixiGraphics) => {
      graphics.clear()
      graphics.lineStyle(10 / scale, 'red', 1)
      let first = true
      for (let point of paths) {
        const { x, y } = latLngToLayerPoint([point.lat, point.lng])
        console.log(x, y)
        if (first) {
          graphics.moveTo(x, y)
          first = false
        } else {
          graphics.lineTo(x, y)
        }
      }

      //   g.beginFill(props.color);
      //   g.drawRect(props.x, props.y, props.width, props.height);
      //   g.endFill();
    },
    [props, scale]
  )

  const [planeCurrent, setPlaneCurrent] = useState({lat: 0,lng:0,time:0})
  const animeHandleRef = useRef<AnimeInstance | null>(null)
  const playSpeed = 3600

  useEffect(() => {
    const current = {
      lat:0,
      lng:0,
      time:0
    }
    const animeHandle = anime({
      targets: current,
      keyframes: paths.map((item, index, arr) => ({
        ...item,
        duration:
          index === 0 ? 0 : (item.time - arr[index - 1].time) / playSpeed,
      })),
      easing: 'linear',
      update(e) {
        setPlaneCurrent({ ...current })
      },
    })
    animeHandleRef.current = animeHandle
    return () => {
      animeHandle.pause()
      animeHandleRef.current = null
    }
  }, [])
  return (
    <>
      <Graphics draw={draw} />
      <Plane lat={planeCurrent.lat}  lng={planeCurrent.lng} scale={1/scale} onClick={() => {
        animeHandleRef.current?.restart()
      }}></Plane>
      <MapUI>
        <Slider value={[planeCurrent.time]} className='fixed top-0 left-0' max={paths.at(-1)?.time} min={paths[0].time} onValueChange={([v])=>{
          const animation = animeHandleRef.current
          if(!animation) return
          const start = paths[0].time
          const end = paths.at(-1)!.time
          animation.seek(animation.duration * (v-start)/(end-start))
          console.log(v)}}></Slider>
      </MapUI>
    </>
  )
}

export default LeafletPlanePlayback
