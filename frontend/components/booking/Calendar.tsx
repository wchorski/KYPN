// import type { Day } from '@prisma/client'
import { format, formatISO, isBefore, parse } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { type FC, useEffect, useState } from 'react'
import { getOpeningTimes, roundToNearestMinutes } from '../../lib/calendarUtil'

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false })

type DateTime = {
  justDate: Date | null
  dateTime: Date | null
}

type Day = {
  closeTime: string,
  justDate: Date,
  dayOfWeek: number,
}

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
}

const now = new Date() // Do not use this in mutated functions, e.g. setHours(0, 0, 0, 0)

const BUISNESS_HOURS_INTERVAL = Number(process.env.BUISNESS_HOURS_INTERVAL)

const CalendarComponent: FC<CalendarProps> = ({ days, closedDays }) => {
  const router = useRouter()

  // Determine if today is closed
  const today = days.find((d) => d.dayOfWeek === now.getDay())
  const rounded = roundToNearestMinutes(now, BUISNESS_HOURS_INTERVAL)
  const closing = parse(today!.closeTime, 'kk:mm', now)
  const tooLate = !isBefore(rounded, closing)
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  })

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem('selectedTime', date.dateTime.toISOString())
      router.push('/menu')
    }
  }, [date.dateTime, router])

  const times = date.justDate && getOpeningTimes(date.justDate, days)

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {date.justDate ? (
        <div className='flex max-w-lg flex-wrap gap-4'>
          {times?.map((time: typeof date, i: number) => (
            <div className='rounded-sm bg-gray-100 p-2' key={`time-${i}`}>
              <button onClick={() => setDate((prev: typeof date) => ({ ...prev, dateTime: time }))} type='button'>
                {format(time, 'kk:mm')}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <DynamicCalendar
          minDate={now}
          className='REACT-CALENDAR p-2'
          view='month'
          tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
          onClickDay={(date) => setDate((prev: typeof date) => ({ ...prev, justDate: date }))}
        />
      )}
    </div>
  )
}

export default CalendarComponent