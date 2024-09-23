import React, { useEffect, useRef, useState } from 'react'
import MapContainer, { CircleLayer, Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'    
import type { FeatureCollection } from 'geojson';
// import { Map as MapGl  } from 'maplibre-gl';
import { MapRef } from 'react-map-gl/maplibre';
import planeIcon from '@/assets/plane.png'
import PlanesLayer from './PlanesLayer';
type Props = {}
const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'MultiPoint', coordinates: [[104, 30.5],[105, 30.5]]},properties:{}}
  ]
};
// const layerStyle: CircleLayer = {
//   id: 'point',
//   type: 'circle',
//   paint: {
//     'circle-radius': 10,
//     'circle-color': '#007cbf'
//   }
// };
const MapGlProvider = (props: Props) => {
  const mapRef = useRef<MapRef>(null)
  const [loadedImage, setLoadedImage] = useState(false)
  // const handleLoad = () => {
  //   const map = mapRef.current
  //   if(!map) return
  //   map.loadImage(planeIcon).then(image => {
  //     console.log(image.data)
  //     const map = mapRef.current
  //     if(!map) return
  //     // if (map.hasImage('plane')) map.updateImage('plane', image.data as any);
  //     // else 
      
  //     mapRef.current.addImage('plane',image.data as any)
  //     setLoadedImage(true)
  //   })

  //   map.on("click",'planeLayer',(e) => {
  //     // console.log('e',e)
  //     const features = map.queryRenderedFeatures(e.point);
  //     console.log(features)
  //   })
  // }
  // useEffect(() => {
  //   const map = mapRef.current
  //   console.log(map)
  //   if(!map) return
  //   console.log('load')
  //   if(!mapRef.current) return
  //   mapRef.current.loadImage(planeIcon).then(image => {
  //     console.log(image.data)
  //     const map = mapRef.current
  //     if(!map) return
  //     // if (map.hasImage('plane')) map.updateImage('plane', image.data as any);
  //     // else 
      
  //     mapRef.current.addImage('plane',image.data as any)
  //     setLoadedImage(true)
  //   })

  //   map.on("click",'planeLayer',(e) => {
  //     const features = map.queryRenderedFeatures(e.point);
  //     console.log(features)
  //   })
  // }, [])
  return (
    <>
    <MapContainer
    ref={mapRef}
    initialViewState={{
      longitude: 104,
      latitude: 30.5,
      zoom: 10
    }}

    style={{width: '100vw', height: '100vh'}}
    mapStyle="http://localhost:8080/styles/basic-preview/style.json"
    scrollZoom
    dragPan
    // onLoad={handleLoad}
    // onClick={(e) => {
    //   console.log('me',e)
    // }}
>
    <PlanesLayer/>
    {/* {loadedImage &&      <Source id='my-data' type='geojson' data={geojson} >
        <Layer id='planeLayer' type='symbol' layout={{"icon-image":'plane',}} ></Layer>
        </Source>
    
    } */}
    

        </MapContainer>
    </>
  )
}

export default MapGlProvider