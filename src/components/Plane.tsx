import { useProject, useScale } from '@/pixi/hooks'
import { Sprite } from '@pixi/react'
import React from 'react'
import L from 'leaflet'
import PlaneIconUrl from '@/assets/plane.png'
import { Sprite as PixiSprite } from 'pixi.js'
type Props = React.ComponentPropsWithoutRef<typeof Sprite> & {
    lat: number,
    lng: number,
    onClick?: (props:{lat:number,lng:number}) => void
}
const Plane = (props: Props) => {
    const [x,y] = useProject(new L.LatLng( props.lat, props.lng))
    const scale = useScale()
  return (
    <>
        <Sprite eventMode='static' x={x} y={y} scale={1/scale} image={PlaneIconUrl}  {...props} onclick={() => {
            console.log('click')
            props.onClick({lat:props.lat,lng:props.lng})
        }}>

        </Sprite>
    </>
  )
}

export default Plane