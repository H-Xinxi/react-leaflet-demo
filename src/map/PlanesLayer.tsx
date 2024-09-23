import { FeatureCollection } from 'geojson'
import React, { useEffect, useId, useState } from 'react'
import MapContainer, {
  CircleLayer,
  Layer,
  MapMouseEvent,
  Popup,
  Source,
  useMap,
} from 'react-map-gl/maplibre'
import planeIcon from '@/assets/plane.png'
import { Plane } from '@/ws/planeWs'
type Props = {}
const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [104, 30.5],
      },
      properties: {
        lng: 104,
        lat: 30.5,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [105, 30.5],
      },
      properties: {
        lng: 105,
        lat: 30.5,
      },
    },
  ],
}

const PlanesLayer = (props: Props) => {
  const planeIconImageId = useId()
  const sourceId = useId()
  const layerId = useId()
  const { current: mapRef } = useMap()

  const [selectedPlane, setSelectedPlane] = useState<Plane | null>(null)

  // 加载图像
  useEffect(() => {
    if (!mapRef) return
    const map = mapRef.getMap()
    if (!map.hasImage(planeIconImageId))
      map.loadImage(planeIcon).then((res) => {
        if (!map.hasImage(planeIconImageId))
          map.addImage(planeIconImageId, res.data, { sdf: true })
      })
  }, [mapRef])

  // 图层点击事件
  useEffect(() => {
    if (!mapRef) return
    const map = mapRef.getMap()
    const handleLayerClick = (e: MapMouseEvent) => {
      const featrue = e.features[0]
      console.log(e.features)
      // queueMicrotask(() => {
      console.log('click')
      setSelectedPlane(featrue.properties)
      // })
      // setTimeout(() => {
      //     console.log('click')
      //     setSelectedPlane(featrue.properties)

      // },0)
      //   console.log(e, e.features)
    }
    mapRef.on('click', layerId, handleLayerClick)
    return () => {
      mapRef.off('click', layerId, handleLayerClick)
    }
  }, [mapRef])

  return (
    <>
      <Source id={sourceId} type="geojson" data={geojson}>
        <Layer
          id={layerId}
          type="symbol"
          layout={{ 'icon-image': planeIconImageId }}
        ></Layer>
      </Source>
      {selectedPlane && (
        <Popup
          latitude={selectedPlane.lat}
          longitude={selectedPlane.lng}
          anchor="bottom"
          onClose={() => {
            console.log('close')
            setSelectedPlane(null)
          }}
        >
          123
        </Popup>
      )}
    </>
  )
}

export default PlanesLayer
