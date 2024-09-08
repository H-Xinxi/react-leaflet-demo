import { Toggle } from '@/components/ui/toggle'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import MonitorModal from './Modal'
type Props = {}

const Monitor = (props: Props) => {
    const [show, setShow] = useState(false)
  return (
    <>
        <Toggle variant="outline" size='sm' pressed={show} onPressedChange={setShow}> 监控</Toggle>
        {show && createPortal(<MonitorModal onClose={() => setShow(false)}></MonitorModal>, document.body)}
    </>
  )
}

export default Monitor