import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import {MapViewState, PickingInfo} from '@deck.gl/core';
import {IconLayer, LineLayer} from '@deck.gl/layers';
import {Map, Marker, Popup} from 'react-map-gl/maplibre';
import { Plane, usePlaneWs } from '@/ws/planeWs';
import PlaneIcon from '@/assets/plane.png'
import 'maplibre-gl/dist/maplibre-gl.css'
const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
    bearing: 0,
    pitch: 30,
  } satisfies MapViewState
  
  const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

const icon = {
    url: PlaneIcon,
    height:25,
    width:25,
    
}
// const planes = {value: []}
export default function DeckGlProvider2() {
    const [popupPlane, setPopupPlane] = useState<Plane | null>(null)

    const [planes] = usePlaneWs()

  return (



    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      key="deck-gl"
      
    >


        <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} style={{"zIndex": 0,}} >
            {
            popupPlane && <Popup className='z-[100000]' longitude={popupPlane.lng} latitude={popupPlane.lat} closeOnClick={false} >
                1223
            </Popup>
        }
        </Map>
                {/* @ts-ignore */}
        <IconLayer 
        id='icon-layer' 
        data={planes} 
        getPosition={
            (d)=>
            [d.lng,d.lat]
        }
        getSize={25}
        getIcon={() => (icon)}
        pickable={true}
        getAngle= {(d,e) => -45}
        onClick= {(d: PickingInfo<Plane>) => {
            console.log(d)
            setPopupPlane(d.object ?? null)
            return true
          }}
        />

      {/* <LineLayer

        id="line-layer"
        data="/path/to/data.json"
        getSourcePosition={d => d.from}
        getTargetPosition={d => d.to} /> */}

    </DeckGL>

  );
}