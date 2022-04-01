import { mainStyle } from './styles'
import { IMeeting } from '../../lib/api/types'
import useInput from '../../hooks/useInput'
import RequestSection from '../RequestForm/RequestSection'
import DatePickerInput from '../DatePickerInput'
import TimePickerInput from '../DatePickerInput/TimePickerInput'
import Input from '../Input/Input'
import LocationInput from '../LocationMap/LocationInput'
import { Button, Typography } from '@mui/material'
import React, { useCallback } from 'react'

export type BookingRepalnMainProps = {
  meeting: IMeeting
}

function BookingRepalnMain({ meeting }: BookingRepalnMainProps) {
  const [location, onChangeLocation] = useInput(meeting.location)
  const [date, onChangeDate, setDate] = useInput(new Date(meeting.date))
  const [time, onChangeTime, setTime] = useInput(new Date(meeting.time))
  const [comment, onChangeComment] = useInput('')

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log(location, date, time, comment)
  }, [location, date, time, comment])

  return <div css={mainStyle}>
    <Typography component='h6' variant='h3'> Change the meeting schedule for propose </Typography>
    <form onSubmit={onSubmit}>
      <RequestSection title={'Meeting Date'}>
        <DatePickerInput value={date} onChange={(value: Date) => {
          setDate(value)
        }} />
      </RequestSection>
      <RequestSection title={'Meeting Time'}>
        <TimePickerInput onChange={(value: Date) => {
          setTime(value)
        }} value={time} />
      </RequestSection>
      <RequestSection title={'Location'}>
        <LocationInput />
      </RequestSection>
      <RequestSection title={'Comment'}>
        <Input
          placeholder='Leave a comment'
          name='comment'
          value={comment}
          onChange={onChangeComment}
        />
      </RequestSection>
      <Button variant={'contained'} type={'submit'}>Submit </Button>
    </form>
  </div>
}

export default BookingRepalnMain
