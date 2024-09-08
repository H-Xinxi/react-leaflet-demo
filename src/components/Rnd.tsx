import { cn } from '@/lib/utils'
import { Resizable, ResizeCallback } from 're-resizable'
import React, {
  ElementRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import Draggable from 'react-draggable'

type Props = {
  className?: string
  children: React.ReactNode
}

const Rnd = (props: Props) => {
  const [size, setSize] = useState({
    width: '100%' as number | string,
    height: '100%' as number | string,
  })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const bottomYRef = useRef(0)
  const leftXRef = useRef(0)

  const dragglableRef = useRef<HTMLElement | null>(null)


  const resizeHandleId = useId()

  const resizeHandleRef = useRef<ElementRef<'div'> | null>(null)
  useEffect(() => {
    resizeHandleRef.current = document.querySelector(`.${CSS.escape(resizeHandleId)}`)
  }, [resizeHandleId])


  const getOffsetPosition = useCallback((...args: Parameters<ResizeCallback>) => {
    if (!resizeHandleRef.current) throw new Error('无法获取调整大小的句柄引用')
    const [, direction, element] = args

    resizeHandleRef.current.style.display = 'none'
    const { scrollWidth: width, scrollHeight: height } = element
    resizeHandleRef.current.style.display = ''

    const dx = direction.toLowerCase().endsWith('left') ? leftXRef.current - position.x - width : 0
    const dy = direction.startsWith('top') ? bottomYRef.current - position.y - height : 0

    return [dx, dy, width, height] as const
  }, [position.x, position.y])

  return (
    <div className={cn('pointer-events-none', props.className)}>
      <Draggable
        handle="[data-draggle-handle]"
        position={position}
        nodeRef={dragglableRef}
        // onStart={(e) => {
        //   const elm = e.currentTarget as HTMLElement
        //   elm.style.willChange = 'transform'
        // }}

        onStop={(a, data) => {
          setPosition({ x: data.x, y: data.y })
        }}
        
      >
        <Resizable
          ref={useCallback(
            (node: ElementRef<typeof Resizable> | null) =>
              (dragglableRef.current = node?.resizable ?? null),
            []
          )}
          
          handleWrapperClass={resizeHandleId}
          size={size}
          className="pointer-events-auto min-w-fit"
          onResizeStart={(a, direction, e) => {
            // e.style.willChange = "transform"
            if (direction.startsWith('top')) {
              bottomYRef.current = position.y + e.clientHeight
            }
            if (direction.toLowerCase().endsWith('left')) {
              leftXRef.current = position.x + e.clientWidth
            }
          }}
          onResize={(...args) => {
            const [dx, dy] = getOffsetPosition(...args)
            args[2].style.transform = `translate(${position.x}px, ${position.y}px) translate(${dx}px, ${dy}px)`
          }}
          onResizeStop={(...args) => {
            // args[2].style.willChange = ''
            const [dx, dy, width, height] = getOffsetPosition(...args)
            setPosition((state) => ({ x: state.x + dx, y: state.y + dy }))
            setSize({ width, height })
          }}
        
        >
          {props.children}
        </Resizable>
      </Draggable>
    </div>
  )
}

export default Rnd
