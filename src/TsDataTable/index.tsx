import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import TsDataTableModal from './Modal'
import { Toggle } from '@/components/ui/toggle'

type Props = {}

const TsDataTable = (props: Props) => {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow((state) => !state)
  }
  const handleToggle = (pressed: boolean) => {
    setShow(pressed)
  }
  return (
    <>
      <Toggle pressed={show} variant="outline" size='sm' onPressedChange={handleToggle}>数据</Toggle>
      {show &&
        createPortal(<TsDataTableModal onClose={() => setShow(false)}></TsDataTableModal>, document.body)}
    </>
  )
}

export default TsDataTable
