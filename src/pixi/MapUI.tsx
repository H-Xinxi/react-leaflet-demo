import { useAtom } from 'jotai'
import React, { createContext, useEffect } from 'react'
import { uiElmListAtom } from './PixiRoot'







const mapUiContext = createContext<React.ReactDOM[]>([])

export const mapUiProvider = mapUiContext.Provider

type Props = {
    children: React.ReactNode
}

const MapUI = (props: Props) => {
    console.log(props)
    const [uiElmList,setUiElmList] = useAtom(uiElmListAtom)
    useEffect(() => {
        setUiElmList(state => [...state,props.children])
        return () => {
            setUiElmList(state => state.filter(item => item !== props.children))
        }
    },[props.children])
  return (
    null
  )
}

export default MapUI