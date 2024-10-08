import { ElementRef, useEffect, useState } from 'react'
// import './App.css'
import 'leaflet/dist/leaflet.css'
import iconUrl from '@/assets/react.svg'
import leaflet from 'leaflet'
import { Plane } from './map/plane'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MapProvider } from './map/MapProvider'
import UI from './UI'
import { Rnd } from 'react-rnd'
import Video from './Video'
import TsDataTable from './TsDataTable'
import Monitor from './Monitor'
import MapGlProvider from './map/MapGlProvider'
import DeckGLProvider from './map/DeckGlProvider'
import DeckGlProvider2 from './map/DeckGlProvider2'
import { usePlaneWs } from './ws/planeWs'
import LeafletProvider from './map/LeafletProvider'
const icon = leaflet.icon({
  iconUrl: iconUrl,
})
const videoJsOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  fluid: true,
  liveui: true,
  sources: 'http://220.161.87.62:8800/hls/0/index.m3u8',
}
// Create a client
const queryClient = new QueryClient()
function App() {
  console.log('app')
  // usePlaneWs()

  return (
    <main  className="w-screen h-screen">
      <LeafletProvider></LeafletProvider>
      {/* <QueryClientProvider client={queryClient}> */}
        {/* <MapProvider>

            <Plane position={[30, 120]}></Plane>

            <UI containerEl={containerEl}>
              <div className='fixed flex flex-col left-4 bottom-4 '>
                <Monitor></Monitor>
                <TsDataTable></TsDataTable>
              </div>


            </UI>
        </MapProvider> */}
        {/* <MapGlProvider>

        </MapGlProvider> */}
        {/* <DeckGLProvider></DeckGLProvider> */}
        {/* <DeckGlProvider2 key={'map'}/> */}
      {/* </QueryClientProvider> */}
      {/* <MapContainer
        style={{ height: '100vh', width: '100vw' }}
        center={[30, 120]}
        zoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="/mapTile/{z}/{x}/{y}.png"
        />

        <Plane position={[37, 121]}></Plane>
        <Plane position={[30, 121]}></Plane>
      </MapContainer> */}
      {/* <VideoJS options={videoJsOptions}></VideoJS> */}
    </main>
  )
}

export default App
