import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React, { useState } from 'react'
import { addDays, format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DateRange } from 'react-day-picker'
// import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { infer, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CalendarIcon } from 'lucide-react'
type Props = {}

const FormSchema = z.object({
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    {
      required_error: '请输入日期',
    }
  ),
})
type FormData = z.infer<typeof FormSchema>
const TsDataTableForm = (props: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const handleSubmit = (data: FormData) => {
    console.log(data)
  }
  const handleReset = () => {
    form.reset()
  }
  return (
    <Form {...form} >
      <form  onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className='flex items-center gap-2 space-y-0'>
              <FormLabel>日期:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[250px] px-3 text-left font-normal text-xs gap-4',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <div className="flex justify-between flex-1">
                        <span className='flex-1'>{field.value?.from ? format(field.value.from, 'yyyy-MM-dd') : '请选择一个日期'}</span>
                        <span className='px-2'>
                        {'-'}

                        </span>
                        <span className='flex-1'>{field.value?.to ? format(field.value.to, 'yyyy-MM-dd') : '请选择一个日期'}</span>
                      </div>

                      <CalendarIcon className="w-4 h-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                    numberOfMonths={2}
                  ></Calendar>
                </PopoverContent>
              </Popover>
              {/* <FormMessage></FormMessage> */}
            </FormItem>
          )}
        ></FormField>

        <Button type='submit'>查询</Button>
        <Button onClick={handleReset}>重置</Button>

      </form>
    </Form>
  )
}

export default TsDataTableForm
