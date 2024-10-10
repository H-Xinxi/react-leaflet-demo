import { useProject, useScale } from '@/pixi/hooks'
import { Sprite } from '@pixi/react'
import React, { useState } from 'react'
import PlaneIconUrl from '@/assets/plane.png'
import L from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'
import Plane from '@/components/Plane'
import { getDefaultStore, useSetAtom } from 'jotai'
import { popupPositionAtom } from './LeafletProvider'
import { createPortal } from 'react-dom'
import MapUI from '@/pixi/MapUI'
type Props = {}

const LeafletPlanesLayer = (props: Props) => {
    // const [popUpPosition, setPopUpPosition] = useState<[number,number] | null>(null)
    const setPopUpPosition = useSetAtom(popupPositionAtom)
  return (
    <>
    <Plane lat={50} lng={0} onClick={({lat,lng}) => {
        setPopUpPosition([lat,lng])
    }}></Plane>
    <MapUI>
        <div>123</div>
    </MapUI>
    {/* {
        createPortal(<div>123</div>,document.body)
    } */}
    {/* <Marker position={[40,0]} eventHandlers={{
        click: (e) => {
            console.log(e)
        }
    }}></Marker> */}
    {/* {[1,2].map(() => {

        return <Sprite rotation={45}  x={x} y={y} scale={1/scale} image={PlaneIconUrl}></Sprite>
    })} */}
    </>
  )
}

export default LeafletPlanesLayer