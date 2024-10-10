import { createContext, useContext, useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js-legacy'
import { pixiOverlay } from 'leaflet'
import L from 'leaflet'

const pixiOverlayUtilsContext = createContext<L.PixiOverlayUtils | null>(null)
export const PixiOverlayUtilsProvider = pixiOverlayUtilsContext.Provider

export const usePixiOverlayUtils = () => {
  const utils = useContext(pixiOverlayUtilsContext)
  if (!utils) throw new Error('你必须提供 value')
  return utils
}

const Context = createContext<{
  project: ReturnType<typeof L.pixiOverlay>['utils']['latLngToLayerPoint']
  scale: number
}>({} as any) // { project, scale }

export const PixiOverlayProvider = Context.Provider
export const PixiOverlayConsumer = Context.Consumer

// export const use

export function useProjectFn() {
  const { project } = useContext(Context)
}

export function useProject(latlng: L.LatLng, parentPosition = [0, 0]) {
  const { project } = useContext(Context)

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
    const tick = (delta: number) =>
      savedRef.current?.apply(ticker, [delta, ticker])
    ticker.add(tick)

    return () => {
      ticker.remove(tick)
    }
  }, [])
}
