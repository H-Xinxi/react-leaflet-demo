import React from 'react'
import { createPortal } from 'react-dom'

type Props = {
    containerEl: HTMLElement | null
    // containerId: string,
    // containerRef: React.MutableRefObject<React.JSX.Element | null>
    children: React.JSX.Element | React.JSX.Element[]
}

const UI = (props: Props) => {
  return (
    <>
        {
           props.containerEl &&  createPortal(props.children, props.containerEl)
        }
    </>
  )
}

export default UI