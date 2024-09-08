import { Map } from "leaflet";
import { createContext, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const mapContext = createContext<Map | null>(null)

export const useMap = () => {
    const map = useContext(mapContext)
    if(!map) {
        throw new Error("地图未初始化")
    }
    return map
}

type Props = {
    children: React.JSX.Element | React.JSX.Element[]
}
export const MapProvider = (props: Props) => {

    return      <>
         <MapContainer
        style={{ height: '100vh', width: '100vw' }}
        center={[30, 120]}
        zoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="/mapTile/{z}/{x}/{y}.png"
        />
        {props.children}
      </MapContainer>
    </>

}