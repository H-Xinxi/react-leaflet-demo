// import 'leaflet-pixi-overlay' // Must be called before the 'leaflet' import
import './LeafletPixiOverlay.js'
import L from 'leaflet'
import * as PIXI from 'pixi.js-legacy'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'
import { render, createRoot } from '@pixi/react'
import { PixiOverlayProvider, PixiOverlayUtilsProvider } from './hooks'
import {
  LeafletProvider,
  createLeafletContext,
  useLeafletContext,
} from '@react-leaflet/core'
import { atom, useAtom } from 'jotai'
import { createPortal } from 'react-dom'
const container = new PIXI.Container()

type Props = {
  children: React.ReactNode
}

export const uiElmListAtom = atom<React.ReactNode[]>([])
export function PixiRoot({ children }: Props): React.ReactNode {
  // 获取 map 实例，map 来自 react-leaflet 的 MapContainer
  //   const map = useMap()
  const leafletMapContext = useLeafletContext()
  const { map } = leafletMapContext
  const [scale, setScale] = useState(1)

  const [pixiOverlay] = useState(
    L.pixiOverlay((utils) => {
      const container = utils.getContainer()
      const renderer = utils.getRenderer()
      // 更新当前的 scale
      // console.log(utils.getScale())
      setScale(utils.getScale()!)
      // 本职工作：渲染画面
      renderer.render(container)
    }, container)
  )

  useEffect(() => {
    pixiOverlay.addTo(map)
  }, [map, pixiOverlay])

  // 判断是否需要重绘的 flag
  //   const [needsRenderUpdate, setNeedsRenderUpdate] = useState(false)
  const needsRenderUpdateRef = useRef(false)

  // 当触发 __REACT_PIXI_REQUEST_RENDER__ 事件时，不立即重绘，而是点亮 flag
  const requestUpdate = useCallback(() => {
    // setNeedsRenderUpdate(true)
    // console.log('update')
    // console.log('update')
    needsRenderUpdateRef.current = true
  }, [])

  // 在每次 tick 时判断 flag 来决定是否真正触发重绘
  const renderStage = useCallback(() => {
    if (needsRenderUpdateRef.current) {
      needsRenderUpdateRef.current = false
      pixiOverlay.redraw(container)
    }
    // if (needsRenderUpdate) {
    //     setNeedsRenderUpdate(false)
    //     pixiOverlay.redraw(container)
    //   }
    //   }, [needsRenderUpdate, pixiOverlay])
  }, [needsRenderUpdateRef, pixiOverlay])

  useEffect(() => {
    const ticker = PIXI.Ticker.shared
    ticker.autoStart = true
    ticker.add(renderStage)
    container.on('__REACT_PIXI_REQUEST_RENDER__', requestUpdate)

    return () => {
      ticker.remove(renderStage)
      container.off('__REACT_PIXI_REQUEST_RENDER__', requestUpdate)
    }
  }, [renderStage, requestUpdate])

  useEffect(() => {
    const project = pixiOverlay.utils.latLngToLayerPoint

    // const leaflet
    const provider = (
      <LeafletProvider value={leafletMapContext}>
        <PixiOverlayUtilsProvider value={pixiOverlay.utils}>
          <PixiOverlayProvider value={{ project, scale }}>
            {children}
          </PixiOverlayProvider>
        </PixiOverlayUtilsProvider>
      </LeafletProvider>
    )

    render(provider, container)
  }, [children, pixiOverlay, scale])

  const [uiElmList] = useAtom(uiElmListAtom)
  return createPortal(uiElmList, document.body)
}
