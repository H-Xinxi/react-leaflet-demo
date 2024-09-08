import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Rnd } from 'react-rnd'
import TsDataTableForm from './Form'
import { CircleXIcon } from 'lucide-react'

type Props = {
  onClose?(): void
}

const TsDataTableModal = (props: Props) => {
  const handleClose = () => {
    props.onClose?.()
  }
  return (
    <div className='fixed left-20 bottom-4 w-[calc(100vw_-_7rem)] h-[300px] pointer-events-none'>
        <Rnd default={{
          x:0,
          y:0,
          width: "100%",
          height: "100%",
        }} className='pointer-events-auto'>
          <Card className='h-full bg-sky-400'>
            <CardHeader className='flex flex-row justify-between space-y-0'>
              <CardTitle>
                TS 数据
              </CardTitle>
              <CircleXIcon className='m-0 cursor-pointer' size="12" onClick={handleClose}/>
            </CardHeader>
            <CardContent>
              <TsDataTableForm></TsDataTableForm>
            </CardContent>
          </Card>
        </Rnd>
    </div>
  )
}

export default TsDataTableModal