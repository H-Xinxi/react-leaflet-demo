import React, { useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-pixi-overlay'
import { Map } from 'leaflet'
import L from 'leaflet'
import {Assets,Sprite,Container} from 'pixi.js'
import PlaneIconUrl from '@/assets/plane.png'
import { PixiRoot } from '@/pixi/PixiRoot'
import LeafletPlanesLayer from './LeafletPlanesLayer'
import { atom, useAtom } from 'jotai'
import LeafletPlanePlayback from './LeafletPlanePlayback'
import LeafletPlaneHeatmap from './LeafletPlaneHeatmap'
type Props = {}

export const popupPositionAtom = atom<[number,number] | null>(null)
const LeafletProvider = (props: Props) => {
 const [popupPosition] = useAtom(popupPositionAtom)
  return (
    <MapContainer
      className="h-screen"
      center={[51.505, -0.09]}
      zoom={13}
    //   scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletPlaneHeatmap></LeafletPlaneHeatmap>
      <PixiRoot>
        <LeafletPlanesLayer></LeafletPlanesLayer>
        <LeafletPlanePlayback></LeafletPlanePlayback>
      </PixiRoot>
      
      {/* <Marker position={[51.505, -0.09]}> */}
      {popupPosition && 
        <Popup position={popupPosition} closeOnClick={false} autoClose={false}>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        }
      {/* </Marker> */}
    </MapContainer>
  )
}

export default LeafletProvider
