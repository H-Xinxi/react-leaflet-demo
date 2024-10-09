import {createContext, useContext, useEffect, useRef} from 'react'
import * as PIXI from 'pixi.js'
import { pixiOverlay } from 'leaflet'
import L from 'leaflet'
const Context = createContext<{
    project:  ReturnType<typeof L.pixiOverlay>['utils']['latLngToLayerPoint'],
    scale: number
} >({} as any) // { project, scale }

export const PixiOverlayProvider = Context.Provider
export const PixiOverlayConsumer = Context.Consumer

// export const use

export function useProject(latlng:L.LatLng, parentPosition = [0, 0]) {
 
    const {project} = useContext(Context)

  const myPosition = project(latlng)
  // 返回值就是应该被填入 PixiJS 元素的 xy 值
  return [myPosition.x - parentPosition[0], myPosition.y - parentPosition[1]]
}

export function useScale() {
  const { scale } = useContext(Context)
  return scale
}

export function useTick(callback: Function) {
  const savedRef = useRef<Function | null>(null)

  useEffect(() => {
    savedRef.current = callback
  }, [callback])

  useEffect(() => {
    const ticker = PIXI.Ticker.shared
    const tick = (delta:number) => savedRef.current?.apply(ticker, [delta, ticker])
    ticker.add(tick)

    return () => {
      ticker.remove(tick)
    }
  }, [])
}