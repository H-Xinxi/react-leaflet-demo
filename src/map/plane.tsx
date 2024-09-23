import { Marker, Popup } from "react-leaflet"
import iconUrl from '@/assets/react.svg'
import leaflet from 'leaflet'
import {  usePlaneWs } from "@/ws/planeWs"
const icon = leaflet.icon({
    iconUrl: iconUrl
  })

type Props = {
    position: [number, number]
}
export const Plane = ({position}: Props) => {
  const planes = usePlaneWs()
    return   <Marker position={position} icon={icon}  eventHandlers={{
        click(e) {
            console.log(e)
        }
    }}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
}