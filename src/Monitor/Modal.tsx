import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Video from '@/Video'
import { CircleXIcon } from 'lucide-react'
import React, { ElementRef, useRef, useState } from 'react'
// import { Rnd } from 'react-rnd'
import { Resizable } from 'react-resizable'
import Rnd from '@/components/Rnd'
import Rnd2 from '@/components/Rnd2'
type Props = {
  onClose?(): void
}

const MonitorModal = (props: Props) => {
  const [size, setSize] = useState({ width: 100, height: 100 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [minHeight, setMinHeight] = useState(0)
  const containerRef = useRef<ElementRef<'div'> | null>(null)
  const [enableResizing, setEnableResizing] = useState(true)
  // const [minHeight, setMinHeight] = useState(0)
  const handleClose = () => {
    props.onClose?.()
  }
  return (
    <Rnd className="absolute right-2 top-2 w-[300px] h-[300px]">
      <Tabs
        ref={containerRef}
        defaultValue="live"
        className="flex flex-col h-auto min-h-full bg-sky-400 "
      >
        <TabsList data-draggle-handle className='cursor-move' onMouseDown={(e) => {
          if(e.currentTarget !== e.target) {
            e.stopPropagation()
          }
        }}>
          <TabsTrigger value="live">实时</TabsTrigger>
          <TabsTrigger value="playback" className='mr-2'>回放</TabsTrigger>

          {/* <div className='ml-auto'> */}
          <CircleXIcon
            className="ml-auto cursor-pointer"
            size="12"
            onClick={handleClose}
            
          />
          {/* </div> */}

        </TabsList>

        <TabsContent className="flex flex-1 " value="live">
          <div className="flex-[2] flex flex-col">
            <Video></Video>
            <div className="flex-1 bg-orange-300">123f</div>
          </div>
          <div className="flex-1"></div>
        </TabsContent>
        <TabsContent className="flex-1" value="playback">
          playback
        </TabsContent>
      </Tabs>
    </Rnd>
    // </section>
  )
}

export default MonitorModal
