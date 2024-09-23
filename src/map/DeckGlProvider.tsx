import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Map,
  NavigationControl,
  Popup,
  useControl,
} from 'react-map-gl/maplibre'
import {
  GeoJsonLayer,
  ArcLayer,
  DeckProps,
  IconLayer,
  PickingInfo,
  HeatmapLayer,
  TripsLayer,
  PathLayer,
} from 'deck.gl'
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Plane, usePlaneWs } from '@/ws/planeWs'
import PlaneIcon from '@/assets/plane.png'
import anime from 'animejs'
// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson'

const INITIAL_VIEW_STATE = {
  latitude: 30,
  longitude: 104,
  zoom: 10,
  bearing: 0,
  pitch: 30,
}

const MAP_STYLE = 'http://localhost:8080/styles/basic-preview/style.json'
// 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl(() => new DeckOverlay(props))
  overlay.setProps(props)
  return null
}

function PlanesLayer() {
  const [popupPlane, setPopupPlane] = useState<Plane | null>(null)
  const [planes] = usePlaneWs()
  const [playbackPosition, setPlaybackPosition] = useState({ lon: 0, lat: 0 })
  const animeController = useRef<anime.AnimeInstance | null>(null)


  useEffect(() => {
    if(animeController.current) return
    const targets = {
      lon: 0,
      lat: 0
    }
    animeController.current = anime({
      targets,
      keyframes: [
        {lon: 104,lat: 30},
        {lon:104.5,lat: 30.5, duration: 2000},
        {lon:104.8,lat: 30.2, duration: 2000},
      ],
      // lon: [
      //   { value: 104,  },
      //   { value: 104.5, duration: 2000 },
      //   { value: 105, duration: 2000 },
      // ],
      // lat: [
      //   { value: 30,  },
      //   { value: 30.5, duration: 2000 },
      //   { value: 30.2, duration: 2000 },
      // ],
      easing: 'linear',
      update(a) {
        setPlaybackPosition({...targets})
        // console.log('targets',a,targets.lat, targets.lon)
      },
    })
  }, [])

  //   const layers = useMemo(() =>
  //     planes.map(
  //       (item) =>
  //         new IconLayer<Plane>({
  //           id: `plane-${item.id}`,
  //           data: [item],
  //           getPosition: (d) => [d.lng, d.lat],
  //           getSize: 25,
  //           getIcon: () => ({
  //             url: PlaneIcon,
  //             height: 25,
  //             width: 25,
  //             mask: true,
  //           }),
  //           getColor: [255, 0, 255],

  //           pickable: true,
  //           getAngle: (d, e) => -45,
  //           onClick: (d: PickingInfo<Plane>) => {
  //             setPopupPlane(d.object ?? null)
  //             return true
  //           },
  //         })
  //     ),[planes]
  //   )
  const layers = useMemo(
    () => [
      new HeatmapLayer<Plane>({
        id: 'HeatmapLayer',
        data: planes,

        aggregation: 'SUM',
        getPosition: (d) => [d.lng, d.lat],
        // getWeight: (d: BikeRack) => d.SPACES,
        // radiusPixels: 25
      }),
      new IconLayer<Plane>(
        {
          id: 'IconLayer',
          data: planes,
          getPosition: (d) => [d.lng, d.lat],
          getSize: 25,
          getIcon: () => ({
            url: PlaneIcon,
            height: 25,
            width: 25,
            mask: true,
          }),
          getColor: [255, 0, 255],

          pickable: true,
          getAngle: (d, e) => -45,
          onClick: (d: PickingInfo<Plane>) => {
            setPopupPlane(d.object ?? null)
            return true
          },
        },

      ),

      new TripsLayer({
        id: 'TripsLayer',
        data: [
          [
            { lon: 104, lat: 30, time: 100 },
            { lon: 104.5, lat: 30.5, time: 200 },
          ],
        ],

        getPath: (d: any) => d.map((p: any) => [p.lon, p.lat]),
        // Timestamp is stored as float32, do not return a long int as it will cause precision loss
        getTimestamps: (d: any) => d.map((p: any) => p.time),

        getColor: [253, 128, 93],
        currentTime: 120,
        trailLength: 600,
        capRounded: true,
        jointRounded: true,
        widthMinPixels: 8,
      }),
      new IconLayer<{lon: number, lat: number}>({
        id: 'playbackLayer',
        data: [playbackPosition],
        getPosition: (d) => [d.lon, d.lat],
        getSize: 25,
        getIcon: () => ({
          url: PlaneIcon,
          height: 25,
          width: 25,
          mask: true,
        }),
        getColor: [255, 0, 255],

        pickable: true,
        getAngle: (d, e) => -45,
        onClick: (d: PickingInfo<Plane>) => {
          // setPopupPlane(d.object ?? null)
          animeController.current?.restart()
          return true
        },
      }),
      new PathLayer({
        id: 'PathLayer',
        data: [[        {lon: 104,lat: 30},
          {lon:104.5,lat: 30.5, duration: 2000},
          {lon:104.8,lat: 30.2, duration: 2000},]],
    
        // getColor: (d:any) => {
          
        //   // convert to RGB
        //   return d.map((item:any) => [item.lon, item.lat])
        // },
        getPath: (d: any) =>  d.map((item:any) => [item.lon, item.lat]),
        getWidth: 100,
        pickable: true
      })
    ],
    [planes,playbackPosition]
  )
  return (
    <>
      <DeckGLOverlay
        layers={layers}
        onClick={(d) => {
          setPopupPlane(null)
        }} /* interleaved*/
      />
      {popupPlane && (
        <Popup
          anchor="bottom"
          closeOnClick={false}
          style={{ zIndex: 10 }}
          longitude={popupPlane.lng}
          latitude={popupPlane.lat}
        >
          <div>
            {popupPlane.lat} {popupPlane.lng}
          </div>
        </Popup>
      )}
    </>
  )
}

export default function DeckGLProvider() {
  const [selected, setSelected] = useState(null)

  const layers = [
    new IconLayer<Plane>({
      id: 'IconLayer',
      data: [{ lat: 0, lng: 0 }],
      getPosition: (d) => [d.lng, d.lat],
      getSize: 20,
      getAngle: (d, e) => 100,
      getIcon: (d) => ({ url: PlaneIcon, height: 20, width: 20 }),
      pickable: true,
    }),
  ]

  return (
    <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
      {/* {selected && (
        <Popup
          key={selected.properties.name}
          anchor="bottom"
          style={{zIndex: 10}} 
          longitude={selected.geometry.coordinates[0]}
          latitude={selected.geometry.coordinates[1]}
        >
          {selected.properties.name} ({selected.properties.abbrev})
        </Popup>
      )} */}
      {/* <DeckGLOverlay layers={layers}  /> */}
      <PlanesLayer></PlanesLayer>
      {/* <NavigationControl position="top-left" /> */}
    </Map>
  )
}
