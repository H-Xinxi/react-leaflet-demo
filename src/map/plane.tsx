import { Marker, Popup } from "react-leaflet"
import iconUrl from '@/assets/react.svg'
import leaflet from 'leaflet'
const icon = leaflet.icon({
    iconUrl: iconUrl
  })

type Props = {
    position: [number, number]
}
export const Plane = ({position}: Props) => {
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