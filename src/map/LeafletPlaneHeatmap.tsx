import React, { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet.heat'
import L, { HeatLayer } from 'leaflet'
type Props = {}

const LeafletPlaneHeatmap = (props: Props) => {
  const map = useMap()
  const heatMapRef = useRef<HeatLayer | null>(null)
  useEffect(() => {
    var heat = L.heatLayer(
      [
        [50.5, 30.5, 0.2], // lat, lng, intensity
        [50.6, 30.4, 1],
      ],
      { radius: 25, gradient:{0.4: 'blue', 0.65: 'lime', 1: 'red'} }
    ).addTo(map)
    heatMapRef.current = heat
    return () => {
      heat.removeFrom(map)
    }
  }, [])
//   useEffect(() => {
//     setInterval(() => {
//       heatMapRef.current?.setLatLngs(
//         Array.from({ length: 10000 }).map(() => {
//           return [Math.random() * 1, Math.random() * 1, 0.5]
//         })
//       )
//     }, 1000)
//   }, [])

  return null
}

export default LeafletPlaneHeatmap
