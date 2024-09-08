import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
type Props = {
  className?: string
  children: React.ReactNode
}

const Rnd2 = (props: Props) => {
  const [size, setSize] = useState({
    width: '100%' as string | number,
    height: '100%' as string | number,
  })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  return (
    <div className={cn('pointer-events-none', props.className)}>
      <Rnd
        className="pointer-events-auto"
        position={position}
        size={size}
        onDragStop={(a, draggableData) => {
          setPosition(draggableData)
        }}
        onResizeStop={(a, b, element, d, p) => {
          const resizeHandleElm = element.lastElementChild as HTMLElement
          // if(!resizeHandleElm) return
          resizeHandleElm.style.display = 'none'
          // resizeHandleElm.
          // console.dir(element.lastChild)
          let { scrollWidth: width, scrollHeight: height,offsetHeight,offsetWidth } = element
          resizeHandleElm.style.display = ''
          const bottom = p.y + offsetHeight
          const right = p.x + offsetWidth

          let { x, y } = position
          if (element.offsetHeight < element.scrollHeight) {
            y = bottom - height
          }
          if (element.offsetWidth < element.scrollWidth) {
            x = right - width
          }
          setSize({ width, height })
          setPosition({ x, y })
        }}
      >
        {props.children}
      </Rnd>
    </div>
  )
}

export default Rnd2
