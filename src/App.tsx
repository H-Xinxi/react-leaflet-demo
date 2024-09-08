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
  const [containerEl, setContainerEl] = useState<ElementRef<'main'> | null>(
    null
  )
  const [texture, setTexture] = useState(null)
  useEffect(() => {
    // setTimeout(() => {
    //   const videoEl = document.querySelector("video")
    //   setTexture(Texture.from(videoEl!) as any)
    // },5000)

  },[])
  return (
    <main ref={setContainerEl} className="w-screen h-screen">
      <QueryClientProvider client={queryClient}>
        <MapProvider>
          {/* <Stage> */}
            <Plane position={[30, 120]}></Plane>

            <UI containerEl={containerEl}>
              <div className='fixed flex flex-col left-4 bottom-4 '>
                <Monitor></Monitor>
                <TsDataTable></TsDataTable>
              </div>
              {/* <div className='absolute left-0 top-0 w-[300px] h-[300px] bg-red-300 z-[500]'>
          
            </div> */}

            </UI>
          {/* </Stage> */}
        </MapProvider>
      </QueryClientProvider>
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
